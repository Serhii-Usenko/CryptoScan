import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { CryptoState } from '../CryptoContext';

const ErrorPass = () => {
    const {alert, setAlert} = CryptoState();

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAlert({open: false});
    };

    return (
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
                {alert.message}
            </Alert>
        </Snackbar>
    )
}

export default ErrorPass;