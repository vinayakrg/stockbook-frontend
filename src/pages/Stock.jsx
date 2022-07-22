import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { StocksContext } from "../contexts/StocksContext";
import { UserContext } from "../contexts";

function Stock() {
  const [stock, setStock] = useState();
  const params = useParams();
  const [message, setMessage] = useState(1);
  const { stocks, symbols } = useContext(StocksContext);
  const { user, getNotes, updateNotes } = useContext(UserContext);
  const [notes, setNotes] = useState();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  useEffect(() => {
    if (!symbols[params.symbol.toLowerCase()]) {
      toast.error("This stock is not currently supported");
      navigate("/");
    }
    setTimeout(() => {
      if (!stock) {
        setMessage(0);
      }
    }, 5000);
    for (let s of stocks) {
      if (s.id.toLowerCase() === params.symbol.toLowerCase()) {
        setStock(s);
      }
    }
  }, [params.symbol, stocks]);

  useEffect(() => {
    setNotes(null);
    const fetchData = async () => {
      try {
        const fetchedNotes = await getNotes(params.symbol);
        console.log(fetchedNotes);
        setNotes(fetchedNotes.note);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user, params.symbol]);

  const handleChange = (e) => {
    let newNotes = { ...notes };
    newNotes.notes = e.target.value;
    setNotes(newNotes);
  };

  const handleUpdateNotes = () => {
    const fetchData = async () => {
      try {
        const fetchedNotes = await updateNotes(notes);
        console.log(fetchedNotes);
        setNotes(fetchedNotes.note);
        toast.success("Updated successfully!");
      } catch (error) {
        console.log(error);
      }
    };
    setButtonsDisabled(true);
    fetchData();
    setButtonsDisabled(false);
  };

  return (
    <div className="page">
      <div id="stock-page">
        <div style={{ textAlign: "center" }}>
          <h1>{symbols[params.symbol]}</h1>
          {stock ? (
            <h1
              style={{
                color: stock.dir
                  ? stock.dir === 1
                    ? "green"
                    : stock.dir === -1
                    ? "red"
                    : ""
                  : "",
              }}
            >
              {formatPrice(stock.price)}
              {stock.dir === 1 ? (
                <i className="ri-arrow-up-line"></i>
              ) : stock.dir === -1 ? (
                <i className="ri-arrow-down-line"></i>
              ) : (
                ""
              )}
            </h1>
          ) : (
            <div>
              {message === 1 || params.symbol === "btc-usd" ? (
                <>
                  <Loading />
                  <p>
                    Loading price... In the meanwhile you can check <br /> your
                    notes for <b>{symbols[params.symbol]}</b> below
                  </p>
                </>
              ) : (
                <p>
                  Looks like market for {symbols[params.symbol]} is closed right
                  now! <br />
                  You can try <Link to={`/stock/btc-usd`}>BITCOIN</Link> for
                  demo!
                </p>
              )}
            </div>
          )}
        </div>
        <div className="mt-5">
          <h6>Your Notes for {symbols[params.symbol]}</h6>
          {user ? (
            notes ? (
              <>
                <textarea
                  maxLength="200"
                  className="form-control"
                  name="notes"
                  id=""
                  cols="30"
                  rows="10"
                  value={notes.notes}
                  onChange={(e) => handleChange(e)}
                  disabled={buttonsDisabled}
                ></textarea>
                <button
                  onClick={handleUpdateNotes}
                  className="btn btn-success"
                  disabled={buttonsDisabled}
                >
                  {buttonsDisabled ? "Please wait..." : "Update"}
                </button>
                <span>{error}</span>
              </>
            ) : (
              <p>Fetching notes...</p>
            )
          ) : (
            <>
              <Link to="/login">Login to take notes!</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stock;
