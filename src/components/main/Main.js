import React, { useState, useEffect } from 'react';
import TopBar from '../topbar/Topbar';
import Login from '../login/Login';
import Register from '../register/Register';
import CustomerView from '../customerView/CustomerView';
import DriverView from '../driverView/DriverView';
import RestaurantView from '../restaurantView/RestaurantView';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import './Main.css';
import axios from 'axios';

const Main = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [userType, setUserType] = useState(sessionStorage.getItem('userType'));
  const [currentUser, setCurrentUser] = useState(undefined);
  const [view, setView] = useState('Home');

  const getCurrentUser = () => {
    if (userId && userType) {
      axios.get(`/api/${userType}/${userId}`).then(
        (response) => {
          setCurrentUser(response.data);
        }
      ).catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const changeUser = (newUser, action) => {
    setCurrentUser(newUser);
    if (action === 'login') {
      setUserId(newUser.id);
      setUserType(newUser.type);
      sessionStorage.setItem('userId', newUser.id);
      sessionStorage.setItem('userType', newUser.type);
    } else if (action === 'logout') {
      sessionStorage.clear();
      setUserId(undefined);
      setUserType(undefined);
    }
  };

  const changeView = (type) => {
    setView(`${type}'s View`);
  };

  return (
    <Router>
      <Grid container justify="flex-start">
        <Grid item xs={12}>
          <TopBar changeUser={changeUser} view={view} currentUser={currentUser} />
        </Grid>
        <Grid item xs={12}>
          <div className="grid-main">
            <Routes>
              {userType && userType === 'customer' ? (
                <Route path="/customer" render={props => <CustomerView {...props} currentUser={currentUser} changeView={changeView} />} />
              ) : (
                <Navigate path="/customer" to="/login" />
              )}
              {userType && userType === 'driver' ? (
                <Route path="/driver" render={props => <DriverView {...props} currentUser={currentUser} changeView={changeView} />} />
              ) : (
                <Navigate path="/driver" to="/login" />
              )}
              {userType && userType === 'restaurant' ? (
                <Route path="/restaurant" render={props => <RestaurantView {...props} currentUser={currentUser} changeView={changeView} />} />
              ) : (
                <Navigate path="/restaurant" to="/login" />
              )}
              {!userType ? (
                <Route path="/login" render={props => <Login {...props} changeUser={changeUser} />} />
              ) : (
                <Navigate path="/login" to={`/${userType}`} />
              )}
              {!userType ? (
                <Route path="/register" render={props => <Register {...props} changeUser={changeUser} />} />
              ) : (
                <Navigate path="/register" to={`/${userType}`} />
              )}
              <Route path="/" to="/login" />
            </Routes>
          </div>
        </Grid>
      </Grid>
    </Router>
  );
};

export default Main;
