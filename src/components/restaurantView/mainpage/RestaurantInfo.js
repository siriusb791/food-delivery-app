import React, { useState, useEffect } from 'react';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {Button, TextField, Grid,Typography,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio} from '@mui/material';
import axios from 'axios';

const RestaurantInfo = ({ currentUser }) => {
  const [information, setInformation] = useState(undefined);
  const [status, setStatus] = useState('close');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tag1, setTag1] = useState('');
  const [tag2, setTag2] = useState('');
  const [tag3, setTag3] = useState('');
  const [alert, setAlert] = useState('');

  const getInformation = () => {
    let restaurantId = currentUser.id;
    axios
      .get('/api/restaurant/information/' + restaurantId)
      .then((response) => {
        const { open, restaurantName, description, imageUrl, tag1, tag2, tag3 } = response.data;
        setInformation(response.data);
        setStatus(open ? 'open' : 'close');
        setName(restaurantName ? restaurantName : '');
        setDescription(description ? description : '');
        setImageUrl(imageUrl ? imageUrl : '');
        setTag1(tag1 ? tag1 : '');
        setTag2(tag2 ? tag2 : '');
        setTag3(tag3 ? tag3 : '');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInformation();
  }, []);

  const updateInformation = (event) => {
    event.preventDefault();
    axios
      .post('/api/restaurant/information/', {
        restaurantId: currentUser.id,
        status: status === 'open' ? true : false,
        name,
        description,
        imageUrl,
        tag1,
        tag2,
        tag3,
      })
      .then((response) => {
        setAlert('The restaurant information has been updated');
      })
      .catch((err) => console.log(err));
  };

  return information ? (
    <Grid container justify="center">
      <Grid item xs={5}>
        <div className="container">
          <FastfoodIcon className="icon" />
          <Typography component="h1" variant="h5">
            Provide Your Restaurant Detail
          </Typography>
          <Typography variant="body1" color="error">
            {alert}
          </Typography>
          <form onSubmit={this.updateInformation}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Restaurant Name"
                type="text"
                value={this.state.name}
                autoFocus
                onChange={event => this.handleChange({name: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Description"
                type="text"
                value={this.state.description}
                onChange={event => this.handleChange({description: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Image URL"
                type="text"
                value={this.state.imageUrl}
                onChange={event => this.handleChange({imageUrl: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="tag1"
                type="text"
                value={this.state.tag1}
                onChange={event => this.handleChange({tag1: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="tag2"
                type="text"
                value={this.state.tag2}
                onChange={event => this.handleChange({tag2: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="tag3"
                type="text"
                value={this.state.tag3}
                onChange={event => this.handleChange({tag3: event.target.value})}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose Restaurant Status </FormLabel>
                <RadioGroup row aria-label="status" name="status" value={this.state.status} onChange={event => this.handleChange({status: event.target.value})}>
                  <FormControlLabel value="open" control={<Radio />} label="Open" />
                  <FormControlLabel value="close" control={<Radio />} label="Close" />
                </RadioGroup>
              </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Update
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  ) : (
    <div />
  );
};

export default RestaurantInfo;
