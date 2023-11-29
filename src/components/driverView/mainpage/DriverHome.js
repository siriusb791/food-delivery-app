import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import OrderCard from '../../card/OrderCard';
import axios from 'axios';

const DriverHome = ({ currentUser }) => {
  const [orders, setOrders] = useState([]);

  const getPendingOrders = () => {
    axios.get(`/api/driver/pendingOrders/${currentUser.id}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (currentUser) {
      getPendingOrders();
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser && orders.length > 0 ? (
        <Grid container justify="space-evenly" spacing={3}>
          {orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={currentUser.type} getOrders={getPendingOrders} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5">
          {currentUser ? <i>There is no available order...</i> : <i>You already have an active order in delivery...</i>}
        </Typography>
      )}
    </div>
  );
};

export default DriverHome;
