import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { StocksContext } from "../contexts/StocksContext";

function Home() {
  const [symbol, setSymbol] = useState("");
  const { symbolsArray } = useContext(StocksContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSymbol(e.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol === "") return false;
    navigate(`stock/${symbol}`);
  };
  return (
    <div id="home-page" className="page">
      <div>
        <h1 style={{ textAlign: "center" }}>StockBook</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Select
            onChange={(e) => handleChange(e)}
            options={symbolsArray}
            placeholder="Select Stock"
            name="symbol"
            value={symbolsArray.filter(function (option) {
              return option.value === symbol;
            })}
          />
          <button className="btn btn-success">SEARCH STOCK</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
