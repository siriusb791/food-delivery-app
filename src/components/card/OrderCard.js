import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/Expand';
import Geocode from 'react-geocode';
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Divider,
  Collapse,
  Button,
  Box,
  TextField,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import './Card.css';
import MapCard from './MapCard';
import axios from 'axios';

// Geocode.setApiKey(process.env.REACT_APP_API_KEY);
// Geocode.setRegion('us');
// Geocode.enableDebug();

const OrderCard = ({ userType, order, getOrders }) => {
  const [dict, setDict] = useState({});
  const [restaurant, setRestaurant] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [driver, setDriver] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [resAddress, setResAddress] = useState('');
  const [cusAddress, setCusAddress] = useState('');
  const [wrongAddress, setWrongAddress] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fillDict();
    orderInfo();
  }, []);

  const handleChange = (content) => {
    switch (Object.keys(content)[0]) {
      case 'rating':
        setRating(content.rating);
        break;
      case 'comment':
        setComment(content.comment);
        break;
      default:
        break;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fillDict = () => {
    const menu = order.content;
    const tempDict = {};
    menu.forEach((item) => {
      tempDict[item.dishName] = tempDict[item.dishName] ? tempDict[item.dishName] + 1 : 1;
    });
    setDict(tempDict);
  };

  const orderInfo = () => {
    const fetchRestaurant = axios.get(`/api/restaurant/${order.restaurantId}`);
    const fetchCustomer = axios.get(`/api/customer/${order.customerId}`);

    Promise.all([fetchRestaurant, fetchCustomer])
      .then((responses) => {
        const resData = responses[0].data;
        const cusData = responses[1].data;

        setRestaurant(resData);
        const resAddress = `${resData.address},${resData.city}`;
        Geocode.fromAddress(resAddress)
          .then((res) => {
            const { lat, lng } = res.results[0].geometry.location;
            setResAddress(`${lat},${lng}`);
          })
          .catch(() => {
            setWrongAddress(true);
          });

        setCustomer(cusData);
        const cusAddress = `${cusData.address},${cusData.city}`;
        Geocode.fromAddress(cusAddress)
          .then((res) => {
            const { lat, lng } = res.results[0].geometry.location;
            setCusAddress(`${lat},${lng}`);
          })
          .catch(() => {
            setWrongAddress(true);
          });
      })
      .catch((err) => console.log(err));

    if (order.driverId) {
      axios.get(`/api/driver/${order.driverId}`)
        .then((response) => {
          setDriver(response.data);
        })
        .catch((err) => console.log(err));
    }
  };
  const deleteOrder = () => {
    axios.delete(`/api/order/${order.id}`).then((response) => {
      getOrders();
    }).catch(err => console.log(err));
  };

  const acceptOrder = () => {
    axios.post('/api/driver/accept', {
      orderId: order.id,
      driverId: sessionStorage.getItem('userId'),
    }).then((response) => {
      getOrders();
    }).catch(err => console.log(err));
  };
  const finishOrder = () => {
    axios
      .post('/api/driver/finish', {
        orderId: order.id,
      })
      .then((response) => {
        getOrders();
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = () => {
    axios
      .delete(`/api/order/deleteComment/${order.id}`)
      .then((response) => {
        getOrders();
      })
      .catch((err) => console.log(err));
  };

  const addComment = () => {
    axios
      .post('/api/order/addComment', {
        orderId: order.id,
        rating,
        content: comment,
      })
      .then((response) => {
        getOrders();
      })
      .catch((err) => console.log(err));
  };

  // Other methods (deleteOrder, acceptOrder, finishOrder, deleteComment, addComment) remain unchanged

  return dict && restaurant && customer ? (
    <div>
      <Card>
          <Typography variant="body1" style={{position : "relative", backgroundColor: "#FAFAD2"}} >
            {userType === "customer" ? 
              <Link to={"/customer/restaurant/" + restaurant.id}>
                <img className="orderCardImage" src= {restaurant.information.imageUrl} alt={restaurant.information.restaurantName} />
              </Link> : null
            }
            <i><b>Order from {restaurant.information.restaurantName}</b></i>
            {userType === "customer" && !order.delivery ? (
              <IconButton size="small" style={{position : "absolute", right : "0"}} onClick={deleteOrder}>
                <ClearIcon />
              </IconButton>
            ) : null}
          </Typography>
          <Divider />
          <CardContent>
            {Object.keys(dict).map(key => <Typography variant="body1" color="textSecondary" component="p" key={key}><i>{key}</i> ... x {this.state.dict[key]}</Typography>)}
            <Divider />
            <br />
            <Grid container direction="column" alignItems="flex-end" spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1" color="primary"><i>Subtotal : $ {order.price}</i></Typography>
              </Grid>
              {userType === "driver" && !order.delivery ? 
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary" size="small" onClick={acceptOrder}>
                    Accept this order
                  </Button>
                </Grid> : null
              }
              {userType === "driver" && order.delivery && order.endTime === null ?
                <Grid item xs={12}>
                  <Button variant="outlined" color="secondary" size="small" onClick={finishOrder}>
                    Finish the order
                  </Button>
                </Grid> : null
              }
            </Grid>
            <br />
            <Divider />
          </CardContent>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
          <Typography><b>Check Order Status</b></Typography>
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography color="textSecondary" paragraph><i><b>From :</b></i> {restaurant.address}, {restaurant.city}, {restaurant.state}, {restaurant.zip}</Typography>
              <Typography color="textSecondary" paragraph><i><b>To :</b></i> {customer.address}, {customer.city}, {customer.state}, {customer.zip}</Typography>
              <Divider />
              <Typography color="textSecondary" paragraph><i><b>Customer contact :</b></i> {customer.phoneNumber}</Typography>
              <Typography color="textSecondary" paragraph><i><b>Restaurant contact :</b></i> {restaurant.phoneNumber}</Typography>
              {driver ? <Typography color="textSecondary" paragraph><i><b>Driver contact :</b></i> {driver.phoneNumber}</Typography> : null}
              {order.startTime === null ? (
                <Typography paragraph><i>Waiting for checking out...</i></Typography>
              ) : null}
              {order.startTime !== null && !order.delivery ? (
                <Typography paragraph><i>Waiting for a driver...</i></Typography>
              ) : null}
              {order.startTime !== null && order.delivery && order.endTime === null ? (
                <Typography paragraph><i>In delivery...</i></Typography>
              ) : null}
              {order.startTime !== null && !order.delivery ? (
                <Typography paragraph><i>Order placed at {new Date(Date.parse(order.startTime)).toLocaleString()}</i></Typography>
              ) : null}
              {order.endTime !== null ? (
                <Typography paragraph><i>Order already arrived at {new Date(Date.parse(order.endTime)).toLocaleString()}</i></Typography>
              ) : null}
              {order.startTime !== null && order.delivery && wrongAddress ? <Typography variant="body1" color="secondary">The address can't be loaded, please contact the driver for detailed route information</Typography> : null}
              {order.startTime !== null && order.delivery && !wrongAddress && resAddress && cusAddress ? 
              <MapCard resAddress={resAddress} cusAddress={cusAddress} /> 
              : null
              }
              <Divider />
              {userType === "customer" && order.endTime !== null && order.comment !== null ? (
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={order.comment.rating} readOnly />
                  <Typography color="textSecondary" variant="body2"><i>{order.comment.content}</i></Typography>
                  <IconButton onClick={deleteComment}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : null}
              {userType === "customer" && order.endTime !== null && order.comment === null ? (
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend" variant="body2"><i>Rating : </i></Typography>
                  <Rating name="simple-controlled" value={rating} onChange={event => handleChange({rating: event.target.value})} />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Please add your comment"
                    type="text"
                    value={comment}
                    onChange={event => handleChange({comment: event.target.value})}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addComment}
                    disabled={rating === 0 || comment === ""}
                  >
                    <b>Add Comment</b>
                  </Button>
                </Box>
              ) : null}
              {userType === "restaurant" && order.endTime !== null && order.comment !== null ? (
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="read-only" value={order.comment.rating} readOnly />
                  <Typography color="textSecondary" variant="body2"><i>{order.comment.content}</i></Typography>
                </Box>
              ) : null}
            </CardContent>
          </Collapse>
        </Card>
    </div>
  ) : <div />;
};

export default OrderCard;
