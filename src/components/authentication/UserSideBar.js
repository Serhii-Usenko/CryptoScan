import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Box, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseApp';

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const {user, setAlert} = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: 'success',
      message: 'Logout Successfull!'
    })
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
                height: '25px',
                width: '25px',
                marginLeft: '25px',
                cursor: 'pointer',
                backgroundColor: 'black' 
            }}
                src={user.photoURL}
                alt={user.disdplayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box sx={{
                width: '350px',
                padding: '25px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: 'Lato'
            }}>
                <Avatar
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                    sx={{
                        color: 'black',
                        width: '100px',
                        height: '100px',
                        objectFit: 'contain'
                    }}
                />
                <span>{user.displayName || user.email}</span>
                <Box
                  sx={{
                    width: '100%',
                    height: '90%',
                    backgroundColor: '#ffd',
                    borderRadius: '15px',
                    padding: '15px',
                    paddingTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    overflowY: 'scroll'
                  }}
                >
                  <Typography variant="h5">
                    WatchList
                  </Typography>
                </Box>
            </Box>

            <Button
              variant='contained'
              onClick={logOut}
            >
              LogOut
            </Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
