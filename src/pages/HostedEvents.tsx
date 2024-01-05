import React, { useState } from 'react';
import HomepageHeader from '../components/HomepageHeader';
import { Home } from '@mui/icons-material';
import HostEventActions from '../components/HostEventActions';

const HostedEvents = () => {
    return (
      <body >
        <HomepageHeader />
        <HostEventActions />
      </body>
    );
  };


export default HostedEvents;