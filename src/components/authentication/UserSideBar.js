import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Box, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebaseApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const {user, setAlert, watchlist, data} = CryptoState();

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

  const deleteFromSideBar = async(coin) => {
    const coinRef = doc(db, 'watchlist', user.uid)

    try {
      await setDoc(coinRef,
        {coins: watchlist.filter((watch) => watch !== coin?.id)},
        {merge: 'true'}
      );
      
      setAlert({
        open: true,
        message: `${coin.name} Removed to the watchlist`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

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
                    overflowY: 'scroll'
                  }}
                >
                  <Typography variant="h5">
                    WatchList
                  </Typography>
                  {data.map(coin => {
                    if(watchlist.includes(coin.id))
                    return (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          width: '100%',
                          margin: '5px',
                          backgroundColor: 'lightblue',
                          border: '1px solid black'
                        }}
                      >
                        <Link to={`/coins/${coin.id}`}>
                          <Typography sx={{color: 'black'}}>{coin.name}</Typography>
                        </Link>
                        <span>{`${coin.current_price}$`}</span>
                        <Button
                          onClick={() => deleteFromSideBar(coin)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                      
                    )
                  })}
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
