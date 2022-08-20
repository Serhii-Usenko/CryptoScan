import axios from "axios";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/system";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { CryptoState } from "../CryptoContext";
import { useState } from "react";

const Header = () => {
  const {curr, setCurr} = CryptoState();
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
          <Typography sx={{ color: "black", fontWeight: 900}}>CryptoRadar</Typography>
          <Typography sx={{ color: "black", fontWeight: 400, marginLeft: '10%', fontSize: '13px'}}>
            {res}
          </Typography>
          <FormControl variant='standard' sx={{marginLeft: 'auto'}}>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={curr}
              onChange={e => setCurr(e.target.value)}
              sx={{
                width: '120px'
              }}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
              <MenuItem value={'UAH'}>UAH</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
