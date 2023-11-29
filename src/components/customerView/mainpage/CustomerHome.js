import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Typography } from '@mui/material';
import RestaurantCard from '../../card/RestaurantCard';
import './Customer.css';
import axios from 'axios';

const CustomerHome = ({ currentUser }) => {
  const [searchText, setSearchText] = useState('');
  const [restaurants, setRestaurants] = useState(null);

  const findRestaurants = (query) => {
    if (query && query !== '') {
      axios.get(`/api/restaurant/search/${query}`)
        .then((response) => {
          setRestaurants(response.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios.get('/api/restaurant/all')
        .then((response) => {
          const temp = response.data.filter((restaurant) => restaurant.information !== null && restaurant.menu !== null);
          setSearchText('');
          setRestaurants(temp);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    findRestaurants(searchText);
  };

  useEffect(() => {
    findRestaurants(searchText);
  }, [searchText]);

  return currentUser ? (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Paper component="form" onSubmit={handleSearch} style={{ width: 400, padding: '2px 4px', display: 'spac' }}>
            <InputBase
              style={{ marginLeft: '10px', width: 325 }}
              placeholder="Search Restaurant or Food"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <div className="cardbody">
            <Grid container justify="space-evenly" spacing={2}>
              {restaurants && restaurants.length !== 0 ? (
                restaurants.map((restaurant) => (
                  <Grid item xs={5} key={restaurant.id}>
                    <RestaurantCard userId={currentUser.id} restaurantId={restaurant.id} restaurantInfo={restaurant.information} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h5">
                  <i>No result matches your search, please try again...</i>
                </Typography>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  ) : <div />;
};

export default CustomerHome;
