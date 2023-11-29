import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import OrderCard from '../../card/OrderCard';
import axios from 'axios';

const DriverHistory = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);

  const getDriverHistory = () => {
    axios.get(`/api/driver/myOrderHistory/${currentUser.id}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (currentUser) {
      getDriverHistory();
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser && orders.length > 0 ? (
        <Grid container justify="space-evenly" spacing={3}>
          {orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={currentUser.type} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5">
          <i>You don't have any past orders...</i>
        </Typography>
      )}
    </div>
  );
};

export default DriverHistory;
