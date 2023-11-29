import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import OrderCard from '../../card/OrderCard';
import axios from 'axios';

const RestaurantHistory = ({ currentUser }) => {
  const [orders, setOrders] = useState(undefined);

  const getRestaurantHistory = () => {
    axios
      .get('/api/restaurant/myOrderHistory/' + currentUser.id)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRestaurantHistory();
  }, []);

  return currentUser && orders ? (
    <div>
      <Grid container justify="space-evenly" spacing={3}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={currentUser.type} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5">
            <i>You don't have any past orders...</i>
          </Typography>
        )}
      </Grid>
    </div>
  ) : (
    <div />
  );
};

export default RestaurantHistory;
