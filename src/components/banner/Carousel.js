import { Box, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";
import { useState } from "react";
import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { curr, symb } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(curr));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [curr]);

  const items = trending.map((coin) => {
    return (
      <Box display="flex" justifyContent='center'>
        <Link to={`/CryptoScan/coins/${coin.id}`}>
          <Box
            component="img"
            src={coin.image}
            alt={coin.id}
            sx={{
              height: "80px",
              marginTop: '20px'
            }}
          />
          <span>
            <Typography align="center" sx={{ color: "black", marginTop: '20px', fontSize: "15px", fontWeight: '700' }}>
              {coin.current_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")} {symb} 
            </Typography>
            <Typography 
              align="center"
              sx={{
                color: coin.market_cap_change_percentage_24h > 0 ? 'green' : 'red',
                fontSize: "12px",
                fontWeight: '900' }}>
              {coin.market_cap_change_percentage_24h > 0 ? `+${coin.market_cap_change_percentage_24h.toFixed(2)}%` : `${coin.market_cap_change_percentage_24h.toFixed(2)}%`}
            </Typography>
          </span>
        </Link>
      </Box>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default Carousel;
