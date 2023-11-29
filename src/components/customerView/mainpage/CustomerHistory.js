import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import OrderCard from '../../card/OrderCard';
import axios from 'axios';

const CustomerHistory = ({ currentUser }) => {
  const [orders, setOrders] = useState(null);

  const getPastOrders = () => {
    axios.get(`/api/customer/myOrderHistory/${currentUser.id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (currentUser) {
      getPastOrders();
    }
  }, [currentUser]);

  return currentUser && orders ? (
    <div>
      <Grid container justify="space-evenly" spacing={3}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={currentUser.type} getOrders={getPastOrders} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5">
            <i>You don't have any orders in the past...</i>
          </Typography>
        )}
      </Grid>
    </div>
  ) : <div />;
};

export default CustomerHistory;
