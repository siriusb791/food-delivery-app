import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import { Link } from "react-router-dom";
import "./Customer.css";
import DishCard from "../../card/DishCard";
import axios from 'axios';

const DisplayRestaurant = ({ match, currentUser }) => {
  const [restaurantId] = useState(match.params.restaurantId);
  const [restaurant, setRestaurant] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shopcart, setShopcart] = useState([]);

  useEffect(() => {
    getRestaurant();
  }, []);

  const getRestaurant = () => {
    axios.get(`/api/restaurant/${restaurantId}`)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(err => console.log(err));
  };

  const addDish = (action, dish) => {
    if (action === "add") {
      setSubtotal(subtotal + dish.price);
      setShopcart([...shopcart, dish]);
    } else if (action === "minus") {
      const tempArray = shopcart.filter(preDish => preDish.dishName !== dish.dishName);
      setSubtotal(subtotal - dish.price);
      setShopcart(tempArray);
    }
  };

  const addToCart = () => {
    axios.post("/api/order/addToCart", {
      customerId: currentUser.id,
      restaurantId,
      shopcart
    })
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  };

  return currentUser && restaurant ? (
    <div>
      <Typography variant="h4">
        <img className="littleImage" src={restaurant.information.imageUrl} alt={restaurant.information.restaurantName} />
        <i><b>Welcome to {restaurant.information.restaurantName}</b></i>
      </Typography>
      {!restaurant.information.open ? (
        <Typography variant="body1" color="error">Closed, will go back soon...</Typography>
      ) : null}
      <br />
      <Typography variant="body1" color="textSecondary" component="p">
        <i>{restaurant.information.description}</i>
      </Typography>
      <br />
      <br />
      <br />
      <Grid container spacing={3} justify="space-evenly">
        {restaurant.menu.map((dish, index) => (
          <Grid item xs={3} key={index}>
            <DishCard dish={dish} addDish={addDish} currentUser={currentUser} />
          </Grid>
        ))}
      </Grid>
      <div className="checkoutBox">
        <Grid container justify="flex-end">
          <Grid item>
            <Typography variant="h5"><i>Subtotal : $ {subtotal}</i></Typography>
          </Grid>
        </Grid>
        <br />
        <Grid container justify="flex-end">
          <Grid item>
            <Link to={"/customer/home"} style={{textDecoration: "none"}}>
              <Button variant="outlined" color="primary" size="large" disabled={!restaurant.information.open || subtotal === 0} onClick={addToCart}>
                Add to Cart
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  ) : <div>This restaurant is not available</div>;
};

export default DisplayRestaurant;
