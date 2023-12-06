import React, { useState } from 'react';
import HomepageHeader from '../components/HomepageHeader';
import CreateEventBox from '../components/CreateEventBox';
const CreateEvent = () => {
    return (
      <body>
        <HomepageHeader />
        <div className='centered-div'>
          <CreateEventBox />
        </div>
      </body>
    );
  };


export default CreateEvent;