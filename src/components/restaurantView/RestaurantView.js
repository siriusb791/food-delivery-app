import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import RestaurantBar from './sidebar/RestaurantBar';
import RestaurantOrder from './mainpage/RestaurantOrder';
import RestaurantHome from './mainpage/RestaurantHome';
import RestaurantHistory from './mainpage/RestaurantHistory';
import RestaurantInfo from './mainpage/RestaurantInfo';
import RestaurantMenu from './mainpage/RestaurantMenu';

const RestaurantView = ({ currentUser, changeView }) => {
  useEffect(() => {
    changeView('Restaurant');
  }, [changeView]);

  return (
    <Router>
      <Grid container justify="flex-start">
        <Grid item sm={3}>
          <RestaurantBar />
        </Grid>
        <Grid item sm={9}>
          <div className="grid-item">
            <Routes>
              <Route path="/restaurant/home" render={(props) => <RestaurantHome {...props} currentUser={currentUser} />} />
              <Route
                path="/restaurant/information"
                render={(props) => <RestaurantInfo {...props} currentUser={currentUser} />}
              />
              <Route path="/restaurant/menu" render={(props) => <RestaurantMenu {...props} currentUser={currentUser} />} />
              <Route
                path="/restaurant/order"
                render={(props) => <RestaurantOrder {...props} currentUser={currentUser} />}
              />
              <Route
                path="/restaurant/history"
                render={(props) => <RestaurantHistory {...props} currentUser={currentUser} />}
              />
              <Navigate path="/restaurant" to="/restaurant/home" />
            </Routes>
          </div>
        </Grid>
      </Grid>
    </Router>
  );
};

export default RestaurantView;
