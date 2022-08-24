import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <div>
      <Button
        variant="contined"
        onClick={handleOpen}
        sx={{
          backgroundColor: "lightblue",
          color: "black",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              sx={{ backgroundColor: "transparent", color: "white"}}
            >
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                centered
              >
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
              {value === 0 && <Login handleClose={handleClose}/>}
              {value === 1 && <SignUp handleClose={handleClose}/>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
