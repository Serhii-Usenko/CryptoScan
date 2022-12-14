import axios from "axios";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/system";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { CryptoState } from "../CryptoContext";
import { useState } from "react";
import AuthModal from "./authentication/AuthModal";
import UserSideBar from "./authentication/UserSideBar";
import { Link } from "react-router-dom";

const Header = () => {
  const {curr, setCurr, user} = CryptoState();
  const [rate, setRate] = useState([]);

  const fetchCoins = async () => {
    //const { data } = await axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");

    //setRate(data);
  };
  
  fetchCoins();

  const res = rate.filter(it => it.ccy === "USD").map((el, i) =>{
    return <span key={i}>{`1$ = ${Math.floor((el.sale) * 100) / 100} грн.`}</span>
  })

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "gold",
        height: '70px'
      }}
    >
      <Container>
        <Toolbar>
          <Link to={'/'}>
            <Typography sx={{ color: "black", fontWeight: 900}}>CryptoRadar</Typography>
          </Link>
          <Typography sx={{ color: "black", fontWeight: 400, marginLeft: '10%', fontSize: '13px'}}>
            {res}
          </Typography>
          <FormControl variant='standard' sx={{marginLeft: 'auto'}}>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={curr}
                onChange={e => setCurr(e.target.value)}
                sx={{
                  width: '120px',
                  height: '40px'
                }}
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'EUR'}>EUR</MenuItem>
                <MenuItem value={'UAH'}>UAH</MenuItem>
              </Select>
              <Box  sx={{paddingLeft: '20px'}}>
                {user ? <UserSideBar /> : <AuthModal/>}
              </Box>
            </Box>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
