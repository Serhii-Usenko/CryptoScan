import {
    CircularProgress,
  Container,
  Pagination,
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
  const [page, setPage] = useState(1);
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

  console.log(data)

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
          sx={{ width: "81%", margin: "30px" }}
        />
      </Container>

      <Container align='center'>
        <TableContainer
          sx={{
            width: 'max-content',
            padding: '5px'
          }}
        >{loading ? <CircularProgress sx={{marginBottom: '50px'}}/> : (
            <Table sx={{width: "90%", 
                        maxWidth: "90%",
                        backgroundColor: "gold",
                        borderRadius: "10px" }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'sx={{fontWeight: '700', fontSize: '20px', width: '250px'}}>Coin</TableCell>
                <TableCell align="center" sx={{fontWeight: '700', fontSize: '20px', width: '250px'}}>Price</TableCell>
                <TableCell align="center" sx={{fontWeight: '700', fontSize: '20px', width: '250px'}}>24h Change</TableCell>
                <TableCell align="center" sx={{fontWeight: '700', fontSize: '20px', width: '250px'}}>Market Cap</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {onSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row, i) => (
                   <TableRow sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'lightyellow'
                    }
                   }} key={row.id}>
                        <TableCell component="th" scope="row" sx={{padding: '2px'}}>

                            <Box>
                                <Container align='center'>
                                    <img 
                                        src={row.image}
                                        alt='hello'
                                        height="30px"
                                    />
                                </Container>
                                <Typography align='center' sx={{fontSize: "12px"}}>{row.symbol}</Typography>
                                <Typography align='center' sx={{fontWeight: '600'}}>{row.id}</Typography>
                            </Box>
                        </TableCell>
                        <TableCell align="center" sx={{fontWeight: '600', padding: '2px'}}>{`${(Math.floor(row.current_price * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $`}</TableCell>
                        <TableCell align="center" sx={{fontWeight: '600', padding: '2px', color: Math.floor(row.market_cap_change_percentage_24h * 100) / 100 > 0 ? 'green' : 'red'}}>{`${(Math.floor((row.market_cap_change_percentage_24h) * 1000) / 1000)} %`}</TableCell>
                        <TableCell align="center" sx={{fontWeight: '600', padding: '2px'}}>{`${row.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $`}</TableCell>
                   </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
          
        </TableContainer>
        <Pagination
          count={(onSearch().length / 10).toFixed(0)}
          color="primary"
          sx={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}
          onChange={(e, value) => {
            setPage(value)
            window.scroll(0, 660)
          }} 
        />
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  );
};

export default CoinTable;
