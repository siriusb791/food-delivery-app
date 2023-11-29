import React, { useState } from 'react';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {Button,
  TextField,
  Box,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ changeUser }) => {
  const [registrationInfo, setRegistrationInfo] = useState({
    userName: '',
    password: '',
    validatePassword: '',
    passwordDifferent: false,
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    userType: 'customer',
    registerFailed: '',
  });

  const handleChange = (field, value) => {
    setRegistrationInfo({ ...registrationInfo, [field]: value });
  };

  const retypePassword = (event) => {
    const { value } = event.target;
    setRegistrationInfo({ ...registrationInfo, validatePassword: value });
    if (value === registrationInfo.password) {
      setRegistrationInfo({ ...registrationInfo, passwordDifferent: false });
    } else {
      setRegistrationInfo({ ...registrationInfo, passwordDifferent: true });
    }
  };

  const registerUser = (event) => {
    event.preventDefault();
    if (registrationInfo.passwordDifferent) {
      setRegistrationInfo({ ...registrationInfo, registerFailed: 'Please correct the error' });
      return;
    }

    axios
      .post(`/api/${registrationInfo.userType}/register`, {
        userName: registrationInfo.userName,
        password: registrationInfo.password,
        phoneNumber: registrationInfo.phoneNumber,
        address: registrationInfo.address,
        city: registrationInfo.city,
        state: registrationInfo.state,
        zip: registrationInfo.zip,
      })
      .then((response) => {
        changeUser(response.data, 'login');
      })
      .catch((err) => {
        console.log(err);
        setRegistrationInfo({ ...registrationInfo, registerFailed: err.response.data });
      });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <div className="container">
          <FastfoodIcon className="icon" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography variant="body1" color="error">
            {registrationInfo.registerFailed}
          </Typography>
          <form onSubmit={this.registerUser}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="UserName"
                type="text"
                value={this.state.userName}
                autoFocus
                onChange={event => this.handleChange({userName: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={this.state.password}
                onChange={event => this.handleChange({password: event.target.value})}
              />
              <Typography variant="body2" color="error">
                {this.state.passwordDifferent ? <i>Password doesn't match</i> : null}
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Re-enter your password"
                type="password"
                value={this.state.validatePassword}
                onChange={event => this.retypePassword(event)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                type="text"
                value={this.state.phoneNumber}
                onChange={event => this.handleChange({phoneNumber: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Address"
                type="text"
                value={this.state.address}
                onChange={event => this.handleChange({address: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="City"
                type="text"
                value={this.state.city}
                onChange={event => this.handleChange({city: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="State"
                type="text"
                value={this.state.state}
                onChange={event => this.handleChange({state: event.target.value})}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Zip Code"
                type="text"
                value={this.state.zip}
                onChange={event => this.handleChange({zip: event.target.value})}
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Register as a </FormLabel>
                <RadioGroup row aria-label="UserType" name="userType" value={this.state.userType} onChange={event => this.handleChange({userType: event.target.value})}>
                  <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                  <FormControlLabel value="driver" control={<Radio />} label="Driver" />
                  <FormControlLabel value="restaurant" control={<Radio />} label="Restaurant" />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <br/>
              <br/>
              <Link to={"/login"} className="link">
                Already have an account? Sign In
              </Link>
              <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                  {'Copyright © NEUEat '}
                  {new Date().getFullYear()}
                  {'.'}
                </Typography>
              </Box>
            </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
