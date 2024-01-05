import {Box, Typography} from '@mui/material';
import CustomCalendar from './CustomCalendar';

const MyCalendar = () => {

  return (
    <Box sx={{ height: '50vw', width: '80vw', background: '#e8efe0', marginTop: 15, borderRadius: '15px'}}>
      <Typography variant='h6' sx={{textAlign: 'left', margin: 3, marginLeft: 7}}>See All Your Events!</Typography>
      <Box sx={{height: '80%', width: '70%', position: 'absolute', top: '27%', left: '27%', background: '#e8efe0'}}>
        <CustomCalendar initialView='dayGridMonth' height='44.5rem'/>
      </Box>
      
    </Box>
  );
};

export default MyCalendar;
