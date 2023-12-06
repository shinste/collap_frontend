import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import HomepageHeader from '../components/HomepageHeader';
import NotificationList from '../components/NotificationList';
import Calendar from '../components/Calendar';
import { Grid } from '@mui/material';

const Homepage = () => {


    return (
      <body>
        <HomepageHeader />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <NotificationList />
          </Grid>
          <Grid item xs={8}>
            <Calendar />
          </Grid>
      </Grid>
      </body>
    );
  }




export default Homepage;