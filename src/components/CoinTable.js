import {
    CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { curr, symb } = CryptoState();

  const CoinTableData = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(curr));

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    CoinTableData();
  }, [curr]);

  const onSearch = () => {
    return data.filter(it => it.id.includes(search.toLowerCase()) || it.symbol.includes(search.toLowerCase()))
  }

  console.log(onSearch())

  return (
    <Container>
      <Typography
        align="center"
        variant="h4"
        sx={{ margin: "18px", fontFamily: "Lato" }}
      >
        Cryptocurrency Rating List
      </Typography>
      <Container align="center">
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          label="Search cryptocurrency"
          variant="outlined"
          focused
          sx={{ width: "90%", margin: "30px" }}
        />
      </Container>

      <Container align='center'>
        <TableContainer
          sx={{

          }}
        >{loading ? <CircularProgress sx={{marginBottom: '50px'}}/> : (
            <Table sx={{width: "90%", 
                        maxWidth: "90%",
                        backgroundColor: "gold",
                        borderRadius: "10px" }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'sx={{fontWeight: '700', fontSize: '20px'}}>Coin</TableCell>
                <TableCell align="center" sx={{fontWeight: '700', fontSize: '20px'}}>Price</TableCell>
                <TableCell align="center" sx={{fontWeight: '700', fontSize: '20px'}}>24h Change</TableCell>
                <TableCell align="center" sx={{fontWeight: '700', fontSize: '20px'}}>Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
                {onSearch().map((row, i) => (
                   <TableRow key={row.id}>
                        <TableCell sx={{width: '100px'}}>
                            <Box sx={{fontSize: '25px'}}>{i + 1}</Box>
                            <Box>
                                <Container align='center'>
                                    <img 
                                        src={row.image}
                                        alt='hello'
                                        height="50"
                                    />
                                </Container>
                                <Typography align='center' sx={{marginBottom: '10px', fontSize: "12px"}}>{row.symbol}</Typography>
                                <Typography align='center' sx={{fontWeight: '600'}}>{row.id}</Typography>
                            </Box>
                        </TableCell>
                        <TableCell align="center" sx={{width: '100px', fontWeight: '600'}}>{row.current_price}</TableCell>
                        <TableCell align="center" sx={{width: '100px', fontWeight: '600', color: Math.floor((row.price_change_24h) * 1000) / 1000 > 0 ? 'green' : 'red'}}>{(Math.floor((row.price_change_24h) * 1000) / 1000) > 0 ? `+${Math.floor((row.price_change_24h) * 1000) / 1000}` : Math.floor((row.price_change_24h) * 1000) / 1000}</TableCell>
                        <TableCell align="center" sx={{width: '100px', fontWeight: '600'}}>{row.market_cap}</TableCell>
                   </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
          
        </TableContainer>
      </Container>
    </Container>
  );
};

export default CoinTable;
