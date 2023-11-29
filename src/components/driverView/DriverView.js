import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import DriverBar from './sidebar/DriverBar';
import DriverOrder from './mainpage/DriverOrder';
import DriverHome from './mainpage/DriverHome';
import DriverHistory from './mainpage/DriverHistory';

const DriverView = (props) => {
  React.useEffect(() => {
    props.changeView('Driver');
  }, [props]);

  return props.currentUser ? (
    <Router>
      <Grid container justify="flex-start">
        <Grid item sm={3}>
          <DriverBar />
        </Grid>
        <Grid item sm={9}>
          <div className="grid-item">
            <Routes>
              <Route
                path="/driver/home"
                render={(props) => <DriverHome {...props} currentUser={props.currentUser} />}
              />
              <Route
                path="/driver/order"
                render={(props) => <DriverOrder {...props} currentUser={props.currentUser} />}
              />
              <Route
                path="/driver/history"
                render={(props) => <DriverHistory {...props} currentUser={props.currentUser} />}
              />
              {/* <Navigate path="/driver" to="/driver/home" /> */}
            </Routes>
          </div>
        </Grid>
      </Grid>
    </Router>
  ) : <div />;
};

export default DriverView;
