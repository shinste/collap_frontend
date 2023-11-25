import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { LoginContext } from '../contexts/UsernameContext';
import HomepageHeader from '../components/HomepageHeader';

const Homepage = () => {


    return (
      <body>
        <HomepageHeader />
      </body>
    );
  }




export default Homepage;