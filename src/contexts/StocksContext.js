import {createContext, useEffect, useState} from 'react';
import { toast } from "react-toastify";
import protobuf from "protobufjs";
import proto from "../assets/YPricingData.proto";
const { Buffer } = require("buffer/");
const StocksContext =  createContext();

const StocksProvider = (props)=>{
    const [stocks, setStocks] = useState([]);
    const symbols = {"goog":"Google", "btc-usd":"Bitcoin", "msft":"Microsoft", "amzn":"Amazon", "reliance.ns":"Reliance", "eth-usd": "Ethereum","xrp-usd": "Ripple"}
    const symbolsArray = [
        { value: "goog", label: "Google" },
        { value: "msft", label: "Microsoft" },
        { value: "amzn", label: "Amazon" },
        { value: "reliance.ns", label: "Reliance" },
        { value: "btc-usd", label: "Bitcoin" },
        { value: "eth-usd", label: "Ethereum" },
        { value: "xrp-usd", label: "Ripple" },
      ];
    useEffect(()=>{
        const fetchData = ()=>{
            const ws = new WebSocket("wss://streamer.finance.yahoo.com");
            protobuf.load(proto, (error, root) => {
            if (error) {
                console.log(error);
                toast.error("Unable to connect at the moment!");
                return false;
            }
            const yaticker = root.lookupType("yaticker");
            ws.onopen = function () {
                console.log("connected");
                ws.send(
                JSON.stringify({
                    subscribe: symbolsArray.map((symbol)=>{
                        return symbol.value.toUpperCase();
                    }),
                })
                );
            };

            ws.onclose = function () {
                console.log("diconnected!");
            };

            ws.onmessage = function (message) {
                const next = yaticker.decode(new Buffer(message.data, "base64"));
                setStocks((oldStocks) => {
                if (next) {
                    let oldStock = oldStocks.find((stock) => stock.id === next.id);
                    if (oldStock) {
                        return oldStocks.map((stock) => {
                            if (stock.id === next.id) {
                              return {
                                ...next,
                                dir:
                                    oldStock.price < next.price
                                        ? 1
                                        : oldStock.price > next.price
                                        ? -1
                                        : oldStock.dir
                              };
                            }
                            return stock;
                          });


                    } else {
                    return [
                        ...oldStocks,
                        { ...next, dir: 0 },
                      ];
                    }
                }
                });
            };
            });
        }
        fetchData();
    },[])

    return(
        <StocksContext.Provider value={{stocks, symbols, symbolsArray}}>
            {props.children}
        </StocksContext.Provider>
    )
}

export {StocksContext, StocksProvider}