import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { CoinList } from "./config/api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [curr, setCurr] = useState("USD");
  const [symb, setSymb] = useState("$");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "succes",
  });

  const CoinTableData = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(curr));

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (curr === "USD") {
      return setSymb("$");
    } else if (curr === "EUR") {
      return setSymb("Euro");
    } else if (curr === "UAH") {
      return setSymb("₴");
    }
  }, [curr]);

  return (
    <Crypto.Provider
      value={{
        curr,
        symb,
        setCurr,
        data,
        loading,
        CoinTableData,
        alert,
        setAlert
    }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
