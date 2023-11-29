import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardActions,
  Grid
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Card.css";
import axios from 'axios';

const DishCard = ({ dish, currentUser, addDish, getAllDishes }) => {
  const [number, setNumber] = useState(0);

  const handleAdd = () => {
    setNumber(number + 1);
    addDish("add", dish);
  };

  const handleMinus = () => {
    setNumber(number - 1);
    addDish("minus", dish);
  };

  const removeDish = () => {
    axios.post("/api/restaurant/removeDish", {
      restaurantId: currentUser.id,
      dish: dish
    }).then(
      response => {
        getAllDishes();
      }
    ).catch(err => console.log(err));
  };

  return dish && currentUser ? (
    <Card>
      <CardHeader
        style={{ backgroundColor: "#FAFAD2", height: "30px" }}
        titleTypographyProps={{ variant: 'body1' }}
        title={dish.dishName}
        subheader={"$ " + dish.price}
      />
      <img className="dishCardImage" src={dish.imageUrl} alt={dish.dishName} />
      <CardActions style={{ backgroundColor: "#e6f7ff" }}>
        {currentUser.type !== "restaurant" ? (
          <Grid container justify="center" alignItems="center">
            <IconButton disabled={number === 0} onClick={handleMinus}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5">{number}</Typography>
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Grid>
        ) : (
          <Grid container justify="center" alignItems="center">
            <IconButton onClick={removeDish}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </CardActions>
    </Card>
  ) : <div />;
};

export default DishCard;
