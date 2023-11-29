import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import OrderCard from "../../card/OrderCard";
import axios from 'axios';

const ShopCart = ({ currentUser }) => {
  const [orders, setOrders] = useState(undefined);

  const getCartOrders = () => {
    axios.get("/api/customer/myCart/" + currentUser.id)
      .then(response => {
        setOrders(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCartOrders();
  }, []); // Fetch orders on component mount

  const checkout = () => {
    axios.post("/api/order/checkoutAll", { orders })
      .then(response => {
        getCartOrders();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Grid container justify="space-evenly" spacing={3}>
        {orders && orders.length > 0 ? (
          orders.map(order => (
            <Grid item key={order.id} xs={5}>
              <OrderCard order={order} userType={currentUser.type} getOrders={getCartOrders} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5"><i>Your Shopping Cart is Empty...</i></Typography>
        )}
        {orders && orders.length > 0 && (
          <Grid item xs={12}>
            <div className="checkoutBox">
              <Grid container justify="flex-end">
                <Grid item>
                  <Button variant="outlined" color="secondary" size="medium" onClick={checkout}>
                    Check out all orders
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ShopCart;
