import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  IconButton,
  Avatar,
  Grid,
  Box,
  MobileStepper,
  Button,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  KeyboardArrowRight  from '@mui/icons-material/KeyboardArrowRight';
import  KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import './Card.css';
import axios from 'axios';

const RestaurantCard = ({ userId, restaurantId, restaurantInfo }) => {
  const [comments, setComments] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);

  useEffect(() => {
    findComments();
  }, []);

  const findComments = () => {
    axios.get(`/api/restaurant/getComments/${restaurantId}`)
      .then((response) => {
        setComments(response.data);
        setMaxSteps(response.data.length);
      })
      .catch((err) => console.log(err));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return userId && restaurantId && restaurantInfo && comments ? (
    <Card>
        <CardHeader
          style={{backgroundColor: "#FAFAD2", height: "40px"}}
          avatar={
            <Avatar aria-label="recipe" style={{backgroundColor: "#FF4500"}}>
              {this.props.restaurantInfo.restaurantName.substring(0, 1)}
            </Avatar>
          }
          action={
            this.props.restaurantInfo.open ? (<Typography color="primary">Open</Typography>) : <Typography color="secondary">Closed</Typography>}
            titleTypographyProps={{variant:'h5'}}
            title={this.props.restaurantInfo.restaurantName}
        />
        <Link to={"/customer/restaurant/" + this.props.restaurantId} className="link">
          <img className="photoCardImage" src= {this.props.restaurantInfo.imageUrl} alt={this.props.restaurantInfo.restaurantName} />
        </Link>
        <CardContent style={{backgroundColor: "#e6f7ff"}}>
          <Typography variant="body1" color="textSecondary" component="p">
            <i>{this.props.restaurantInfo.description}</i>
          </Typography>
      </CardContent>
      <IconButton
        onClick={this.handleExpandClick}
        aria-expanded={this.state.expanded}
      >
      <Typography><b>See Comments</b></Typography>
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {this.state.comments.length > 0 ? 
            <Grid container justify="center">
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="read-only" value={this.state.comments[this.state.activeStep].rating} readOnly />
                <Typography color="textSecondary" variant="body2"><i>{this.state.comments[this.state.activeStep].content}</i></Typography>
              </Box>
              <Grid item xs={12}>
                <MobileStepper 
                  steps={this.state.maxSteps}
                  position="static"
                  variant="text"
                  activeStep={this.state.activeStep}
                  nextButton={
                    <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === this.state.maxSteps - 1}>
                      Next
                      <KeyboardArrowRight />
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                      <KeyboardArrowLeft />
                      Back
                    </Button>
                  }
                /> 
              </Grid>
            </Grid> 
            : <Typography variant="body1" color="primary"><i>This restaurant doesn't have any comments</i></Typography>}
        </CardContent>
      </Collapse>
      </Card>
  ) : <div />;
};

export default RestaurantCard;
