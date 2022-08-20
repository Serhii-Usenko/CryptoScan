import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [curr, setCurr] = useState('USD');
    const [symb, setSymb] = useState('$');
    
    useEffect(() => {
        if (curr === 'USD') {
            return setSymb('$')
        }
        else if (curr === 'EUR') {
            return setSymb('Euro')
        }
        else if (curr === 'UAH') {
            return setSymb('₴')
        }
    }, [curr]);

  return (
    <Crypto.Provider value={{curr, symb, setCurr}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
}