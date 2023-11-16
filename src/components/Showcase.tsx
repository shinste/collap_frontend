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
        <Box sx={{overflow: 'hidden', width: '1100px'}}>
            <Box sx={{textAlign: 'left'}}>
              <Typography variant="h2" sx={{margin: '0px', marginTop: '100px', fontFamily: 'Roboto', color:"#000000" }}> Start Planning Events with Collap</Typography>
              <Typography variant="h5" sx={{ fontSize: '20px', marginTop: '20px', marginRight: '50px', fontFamily: 'Roboto', color:"#000000" }}> Efficient event planning and enhanced participation begins here.</Typography>            
            </Box>
            <Box sx={{ height: '704px', width: '1150px' , overflow: 'hidden'}}>
              <img src={calendar} alt="calendar" style={{position: 'relative', right: "80px", top: "70px", width: '100%', maxWidth: '1150px', height: 'auto'}} />;
            </Box>
        </Box>
    );
  };


export default Showcase;