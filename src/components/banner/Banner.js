import { Box, Container, styled } from "@mui/system";
import { Typography } from '@mui/material';

import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  const BannerContent = styled(Container) ({
    height: '400px',
    display: 'flex',
    flexDirection: "column",
    paddingTop: '25px'
  })

  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url(./banner.jpg)'
        }}
      >
        <BannerContent>
          <Typography
            variant='h2'
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              fontFamily: "Lato",
              color: 'black',
              textAlign: 'center'
            }} 
          >
            CryptoRadar
          </Typography>
          <Typography
            variant='subtitle2'
            sx={{
              color: 'black',
              textAlign: 'center'
            }} 
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque nihil eligendi sint, iusto minus rem tenetur et qui ducimus illum amet quam dolorum aperiam magni incidunt at sequi quae commodi.
            Eum eaque velit vel error facere repellendus, quam delectus totam rem recusandae! Quia, adipisci. Aspernatur enim molestias ab fugiat eligendi delectus consectetur laudantium dicta, doloribus placeat expedita quas praesentium voluptate?
          </Typography>
          <Carousel />
        </BannerContent>
      </Box>
    </>
  );
};

export default Banner;
