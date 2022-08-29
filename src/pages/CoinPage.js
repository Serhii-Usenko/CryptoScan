import { Box, Button, Container, Link, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import parse from 'html-react-parser';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseApp';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const {curr, symb, user, watchlist, setAlert} = CryptoState();

  const fetchCoin = async() => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data);
  }
  console.log(coin)

  useEffect(() => {
    fetchCoin();
  }, []);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchList = async() => {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(coinRef,
        {coins: watchlist ? [...watchlist, coin?.id] : [coin?.id]}
      );
      
      setAlert({
        open: true,
        message: `${coin.name} added to the watchlist`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  const removeFromWatchlist = async() => {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(coinRef,
        {coins: watchlist.filter((watch) => watch !== coin?.id)},
        {merge: 'true'}
      );
      
      setAlert({
        open: true,
        message: `${coin.name} Removed to the watchlist`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  return (
    <Container align="center" sx={{width: '80%'}}>
      <Box sx={{margin: '20px'}}>
        <img src={coin?.image.large} alt='hello'/>
        <Typography variant="h3">
          {coin?.name}
        </Typography>
        <Typography sx={{marginBottom: '25px', fontWeight: '700', color: 'green'}}>
          {`Price: ${coin?.market_data.current_price.usd}$`}
        </Typography>
        <Typography sx={{marginBottom: '20px'}}>
          <Link href={coin?.links.homepage[0]}>{coin?.links.homepage[0]}</Link>
        </Typography>
        <Typography sx={{marginBottom: '20px', textAlign: 'left'}}>
          <a>{coin?.description.en.split('. ').slice([0], [5])}</a>
        </Typography>
        {user && (
          <Button
            variant="outlined"
            sx={{
              width: '150px',
              backgroundColor: inWatchlist ? "#FA8072" : 'gold',
              height: 'maxContent'
            }}
            onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
          >
            {inWatchlist ? 'Remove from Watchlist' : 'Add to watchlist'}
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default CoinPage