import React, { useState } from 'react';
import HomepageHeader from '../components/HomepageHeader';
import MyEventsDisplay from '../components/MyEventsDisplay';

const MyEvents = () => {
    return (
      <body>
        <HomepageHeader />
        <div>
          <MyEventsDisplay />
        </div>
      </body>
    );
  };


export default MyEvents;