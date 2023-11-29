import React, { useState } from 'react';
import {
  Typography, Grid, Menu, MenuItem, IconButton, Button, Dialog, TextField
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

const UserMenu = (props) => {
  const [state, setState] = useState({
    anchorEl: null,
    warnOpen: false,
    resetFailed: '',
    dropFailed: '',
    passwordDialogOpen: false,
    phoneDialogOpen: false,
    addressDialogOpen: false,
    oldPassword: '',
    newPassword: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const openMenu = (event) => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const closeMenu = () => {
    setState({ ...state, anchorEl: null });
  };

  const openWarnDialog = () => {
    setState({ ...state, warnOpen: true, anchorEl: null });
  };

  const closeWarn = () => {
    setState({ ...state, warnOpen: false, dropFailed: '' });
  };

  const openPasswordDialog = () => {
    setState({ ...state, passwordDialogOpen: true, anchorEl: null });
  };

  const closePasswordDialog = () => {
    setState({ ...state, passwordDialogOpen: false, oldPassword: '', newPassword: '', resetFailed: '' });
  };

  const openPhoneDialog = () => {
    setState({ ...state, phoneDialogOpen: true, anchorEl: null });
  };

  const closephoneDialog = () => {
    setState({ ...state, phoneDialogOpen: false, phoneNumber: '' });
  };

  const openAddressDialog = () => {
    setState({ ...state, addressDialogOpen: true, anchorEl: null });
  };

  const closeAddressDialog = () => {
    setState({ ...state, addressDialogOpen: false, address: '', city: '', state: '', zip: '' });
  };

  const logout = () => {
    setState({ ...state, anchorEl: null });
    props.logoutUser();
  };

  const dropAccount = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.delete(`/api/${type}/${props.currentUser.id}`)
      .then(response => {
        closeWarn();
        logout();
        console.log('Successfully delete the user');
      })
      .catch(err => {
        setState({ ...state, dropFailed: err.response.data });
        console.log(err.response.data);
      });
  };

  const resetPassword = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.post(`/api/${type}/resetPassword`, {
      id: props.currentUser.id,
      password: state.oldPassword,
      newPassword: state.newPassword,
    }).then(response => {
      closePasswordDialog();
      console.log('Password update');
    }).catch(err => {
      setState({ ...state, resetFailed: err.response.data });
      console.log(err.response.data);
    });
  };

  const resetPhone = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.post(`/api/${type}/resetPhone`, {
      id: props.currentUser.id,
      phoneNumber: state.phoneNumber,
    }).then(response => {
      closephoneDialog();
      console.log('Phone update');
    }).catch(err => {
      console.log(err);
    });
  };

  const resetAddress = (event) => {
    event.preventDefault();
    let type = props.currentUser.type;
    axios.post(`/api/${type}/resetAddress`, {
      id: props.currentUser.id,
      address: state.address,
      city: state.city,
      state: state.state,
      zip: state.zip,
    }).then(response => {
      closeAddressDialog();
      console.log('Address update');
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <Grid container>
      <IconButton edge="end" style={{color: "white"}} aria-label="menu" onClick={this.openMenu} >
          <SettingsIcon/>
          <Typography variant="h5">My Account</Typography>
        </IconButton>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          getContentAnchorEl={null}
          onClose={this.closeMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openPasswordDialog}>Reset Password</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openPhoneDialog}>Update Contact Information</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openAddressDialog}>Update Address</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.logout}>Logout</MenuItem>
          <MenuItem style={{color : "#1E90FF"}} onClick={this.openWarnDialog}>Drop My Account</MenuItem>
        </Menu>
        <Dialog open={this.state.warnOpen} onClose={this.closeWarn}>
          <div className="dialog">
            <Typography variant="h6" color="error">Warn!!!</Typography>
            <Typography variant="h6">Do you want to drop your account?</Typography>
            <Typography color="textSecondary"><i>(This will erase your order information as well)</i></Typography>
            <Typography variant="body1" color="error">
                {this.state.dropFailed}
              </Typography>
            <br />
            <Button type="submit"
                fullWidth
                variant="contained"
                color="secondary" 
                onClick={this.dropAccount} 
            >
              Yes
            </Button>
            <Button onClick={this.closeWarn}>No</Button>
          </div>
        </Dialog>
        <Dialog open={this.state.passwordDialogOpen} onClose={this.closePasswordDialog}>
          <div className="dialog">
            <form onSubmit={this.resetPassword}>
              <Typography component="h1" variant="h5">
                Reset Your Password
              </Typography>
              <Typography variant="body1" color="error">
                {this.state.resetFailed}
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Old Password"
                  type="password"
                  value={this.state.oldPassword}
                  autoFocus
                  onChange={event => this.handleChange({oldPassword: event.target.value})}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="New Password"
                  type="password"
                  value={this.state.newPassword}
                  onChange={event => this.handleChange({newPassword: event.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Password
              </Button>
              <Button onClick={this.closePasswordDialog}>Cancel</Button>
            </form>
          </div>
        </Dialog>
        <Dialog open={this.state.phoneDialogOpen} onClose={this.closephoneDialog}>
          <div className="dialog">
            <form onSubmit={this.resetPhone}>
              <Typography component="h1" variant="h5">
                Reset Your Phone Number
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="New Phone Number"
                  type="text"
                  value={this.state.phoneNumber}
                  autoFocus
                  onChange={event => this.handleChange({phoneNumber: event.target.value})}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Phone Number
              </Button>
              <Button onClick={this.closephoneDialog}>Cancel</Button>
            </form>
          </div>
        </Dialog>
        <Dialog open={this.state.addressDialogOpen} onClose={this.closeAddressDialog}>
          <div className="dialog">
            <form onSubmit={this.resetAddress}>
              <Typography component="h1" variant="h5">
                Reset Your Address
              </Typography>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Address"
                  type="text"
                  value={this.state.address}
                  autoFocus
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Address
              </Button>
              <Button onClick={this.closeAddressDialog}>Cancel</Button>
            </form>
          </div>
        </Dialog>
    </Grid>
  );
};

export default UserMenu;
