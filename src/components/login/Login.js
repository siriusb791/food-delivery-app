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
  Radio} from '@mui/material';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = ({ changeUser }) => {
  const [loginInfo, setLoginInfo] = useState({
    userName: '',
    password: '',
    userType: 'customer',
    loginFailed: '',
  });

  const handleChange = (field, value) => {
    setLoginInfo({ ...loginInfo, [field]: value });
  };

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/${loginInfo.userType}/login`, {
        userName: loginInfo.userName,
        password: loginInfo.password,
      });
      changeUser(response.data, 'login');
    } catch (err) {
      console.log(err.response.data);
      setLoginInfo({
        ...loginInfo,
        userName: '',
        password: '',
        loginFailed: err.response.data,
      });
    }
  };

  return (
    <Grid container>
      <Grid item xs={7}>
        <img
          className="image"
          alt="foodImage"
          src="https://i.pinimg.com/originals/b4/09/33/b40933bf361ec47c1835cae89398275d.jpg"
        />
      </Grid>
      <Grid item xs={5}>
        <div className="container">
          <FastfoodIcon className="icon" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography variant="body1" color="error">
            {loginInfo.loginFailed}
          </Typography>
          <form onSubmit={loginUser}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="UserName"
              type="text"
              value={loginInfo.userName}
              autoFocus
              onChange={(event) => handleChange('userName', event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={loginInfo.password}
              onChange={(event) => handleChange('password', event.target.value)}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Login as a </FormLabel>
              <RadioGroup
                row
                aria-label="UserType"
                name="userType"
                value={loginInfo.userType}
                onChange={(event) => handleChange('userType', event.target.value)}
              >
                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="driver" control={<Radio />} label="Driver" />
                <FormControlLabel value="restaurant" control={<Radio />} label="Restaurant" />
              </RadioGroup>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <br />
            <br />
            <Link to="/register" className="link">
              Don't have an account? Sign Up
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

export default Login;
