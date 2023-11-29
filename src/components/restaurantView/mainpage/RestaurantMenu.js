import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import DishCard from '../../card/DishCard';
import EmptyDish from '../../card/EmptyDish';
import axios from 'axios';

const RestaurantMenu = ({ currentUser }) => {
  const [menu, setMenu] = useState(undefined);

  const getAllDishes = () => {
    axios
      .get('/api/restaurant/menu/' + currentUser.id)
      .then((response) => {
        setMenu(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllDishes();
  }, []);

  return currentUser ? (
    <Grid container spacing={3} justify="space-evenly">
      {menu ? (
        menu.map((dish, index) => (
          <Grid item xs={3} key={index}>
            <DishCard dish={dish} getAllDishes={getAllDishes} currentUser={currentUser} />
          </Grid>
        ))
      ) : null}
      <Grid item xs={3}>
        <EmptyDish getAllDishes={getAllDishes} currentUser={currentUser} />
      </Grid>
    </Grid>
  ) : (
    <div>The restaurant is not available</div>
  );
};

export default RestaurantMenu;
