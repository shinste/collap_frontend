import { AppBar, Container, Toolbar, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationHeader from '../components/RegistrationHeader';
import Register from '../components/Register';

const Registration = () => {

  return (
    <div>
      <RegistrationHeader />
      <Register />
    </div>
  );
};

export default Registration;
