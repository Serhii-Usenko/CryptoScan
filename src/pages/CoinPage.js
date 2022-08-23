import { Box, Container, Link, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import parse from 'html-react-parser';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const {curr, symb} = CryptoState();

  const fetchCoin = async() => {
    const { data } = await axios.get(SingleCoin(id))

    setCoin(data);
  }
  console.log(coin)

  useEffect(() => {
    fetchCoin();
  }, []);

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
      </Box>
    </Container>
  )
}

export default CoinPage