import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = () => {
    if(password !== confirmPass) {
        setAlert({
            open: true,
            message: 'Passwords dont match',
            type: 'error'
        })
        return;
    }
  };

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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
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
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
