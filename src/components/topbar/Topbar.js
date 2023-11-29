import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Grid
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import './TopBar.css';
import UserMenu from './UserMenu';
import axios from 'axios';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#ef5350'
    }
  },
});

const Topbar = ({ view, currentUser, changeUser }) => {
  const [currentView, setCurrentView] = useState(view);

  useEffect(() => {
    if (currentView !== view) {
      setCurrentView(view);
    }
  }, [currentView, view]);

  const logoutUser = () => {
    let type = currentUser.type;
    changeUser(undefined, 'logout');
    axios.post(`/api/${type}/logout`, {})
      .then(() => {
        console.log('Successfully logged out');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar className="topbar" position="absolute" color="secondary">
        <Toolbar>
          {currentUser ? (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h5" color="inherit">
                  Hi {currentUser.userName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{currentView}</Typography>
              </Grid>
              <Grid item>
                <UserMenu currentUser={currentUser} logoutUser={logoutUser} />
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h4">
              <i><b>Please login</b></i>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Topbar;
