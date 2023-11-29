import React, { useState, useEffect } from 'react';
import { Typography, Divider } from '@mui/material';
import axios from 'axios';

const RestaurantHome = ({ currentUser }) => {
  const [restaurant, setRestaurant] = useState(undefined);

  const getRestaurant = () => {
    let restaurantId = currentUser.id;
    axios
      .get('/api/restaurant/' + restaurantId)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  return restaurant ? (
    <div>
      <Typography paragraph variant="h5">
        Welcome to the <i><b>NEUEat</b></i>!
      </Typography>
      <Typography paragraph>
        If you are a new user, please provide your restaurant information and menu using the links in the sidebar.
      </Typography>
      <Typography paragraph>
        Once you finish them, your restaurant will be visible to the customers.
      </Typography>
      <Typography paragraph>
        To be noticed, you can always update them.
      </Typography>
      <Typography paragraph>Enjoy!!!</Typography>
      <Divider />
      <br />
      <div>
        Restaurant Information status :{' '}
        {restaurant.information !== null ? (
          <Typography color="primary">verified</Typography>
        ) : (
          <Typography color="error">empty</Typography>
        )}
      </div>
      <br />
      <div>
        Menu status :{' '}
        {restaurant.menu && restaurant.menu.length !== 0 ? (
          <Typography color="primary">verified</Typography>
        ) : (
          <Typography color="error">empty</Typography>
        )}
      </div>
    </div>
  ) : (
    <div />
  );
};

export default RestaurantHome;
