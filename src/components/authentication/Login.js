import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'

const Login = ({ handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {};

  return (
    <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contined"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "lightblue",
          color: "black",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login