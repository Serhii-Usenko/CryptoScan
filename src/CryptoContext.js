import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { CoinList } from "./config/api";
import {auth, db} from './firebaseApp';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [curr, setCurr] = useState("USD");
  const [symb, setSymb] = useState("$");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "hello",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user.uid);

      let unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log('no items om watchlist')
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) setUser(user);
      else setUser(null);
    })
  }, []);

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
        setAlert,
        user,
        watchlist
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
