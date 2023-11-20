import React, { useState } from 'react';
import Box from '@mui/material/Box';
import calendar from '../images/calendarimg.png';
import Typography from '@mui/material/Typography';

// const [createpage, setcreatepage] = useState('') 

// const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setUsername(e.target.value);
// };

const Showcase = () => {
    return (
        <Box className="container-fluid">
            <Box sx={{textAlign: 'left'}}>
              <h2> Start Planning Events with Collap</h2>
              <Typography variant="h5" sx={{ fontSize: '20px', marginTop: '20px', marginRight: '50px', color:"#000000" }}> Efficient event planning and enhanced participation begins here.</Typography>            
            </Box>
            <Box className="p-0 m-0" >
              <img src={calendar} alt="calendar" />
            </Box>
        </Box>
    );
  };

export default Showcase;