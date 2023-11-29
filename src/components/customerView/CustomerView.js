import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CustomerBar from './sidebar/CustomerBar';
import CustomerHome from './mainpage/CustomerHome';
import DisplayRestaurant from './mainpage/DisplayRestaurant';
import ShopCart from './mainpage/ShopCart';
import CustomerOrder from './mainpage/CustomerOrder';
import CustomerHistory from './mainpage/CustomerHistory';

const CustomerView = ({ changeView, currentUser }) => {
  useEffect(() => {
    changeView('Customer');
  }, [changeView]);

  return currentUser ? (
    <Router>
      <Grid container justify="flex-start">
        <Grid item sm={3}>
          <CustomerBar />
        </Grid>
        <Grid item sm={9}>
          <div className="grid-item">
            <Routes>
              <Route path="/customer/home" element={<CustomerHome currentUser={currentUser}/>}/>
                
              <Route path="/customer/cart" element={<ShopCart currentUser={currentUser} />}/>
                
              <Route path="/customer/orders" element={<CustomerOrder currentUser={currentUser} />}/>
                
              <Route path="/customer/history" element={<CustomerHistory currentUser={currentUser} />}/>
                
              <Route path="/customer/restaurant/:restaurantId" element={<DisplayRestaurant currentUser={currentUser} />}/>
                
              <Route path='/customer/*' element={<Navigate to="/customer/home" />}/>
                
            </Routes>
          </div>
        </Grid>
      </Grid>
    </Router>
  ) : <div />;
};

export default CustomerView;
