import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  TextField,
  Divider
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./Card.css";
import axios from 'axios';

const EmptyDish = ({ currentUser, getAllDishes }) => {
  const [dishDetails, setDishDetails] = useState({
    dishName: "",
    imageUrl: "",
    price: 0
  });

  const addToMenu = (event) => {
    event.preventDefault();
    axios.post("/api/restaurant/addToMenu", {
      restaurantId: currentUser.id,
      dishName: dishDetails.dishName,
      imageUrl: dishDetails.imageUrl,
      price: dishDetails.price
    }).then(
      response => {
        getAllDishes();
        setDishDetails({ dishName: "", imageUrl: "", price: 0 });
      }
    ).catch(err => console.log(err));
  };

  const handleChange = (key, value) => {
    setDishDetails({ ...dishDetails, [key]: value });
  };

  return currentUser ? (
    <Card>
      <CardHeader
        style={{ backgroundColor: "#FAFAD2", height: "auto" }}
        titleTypographyProps={{ variant: 'body1' }}
        title={<i>Please provide the dish detail</i>}
        subheader="Press {+} and you will see how your dish looks like"
      />
      <CardContent>
        <form onSubmit={addToMenu}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Dish Name"
            type="text"
            value={dishDetails.dishName}
            autoFocus
            onChange={event => handleChange('dishName', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Dish Image URL"
            type="text"
            value={dishDetails.imageUrl}
            onChange={event => handleChange('imageUrl', event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="$ Dish Price"
            type="number"
            value={dishDetails.price}
            onChange={event => handleChange('price', event.target.value)}
          />
          <Divider />
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
        </form>
      </CardContent>
    </Card>
  ) : <div />;
};

export default EmptyDish;
