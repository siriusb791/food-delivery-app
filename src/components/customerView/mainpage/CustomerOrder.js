import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import OrderCard from '../../card/OrderCard';
import axios from 'axios';

const CustomerOrder = ({ currentUser }) => {
  const [orders, setOrders] = useState(null);

  const getActiveOrders = () => {
    axios.get(`/api/customer/myActiveOrders/${currentUser.id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (currentUser) {
      getActiveOrders();
    }
  }, [currentUser]);

  return currentUser && orders ? (
    <div>
      <Grid container justify="space-evenly" spacing={3}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={currentUser.type} getOrders={getActiveOrders} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5">
            <i>You don't have any active orders...</i>
          </Typography>
        )}
      </Grid>
    </div>
  ) : <div />;
};

export default CustomerOrder;
