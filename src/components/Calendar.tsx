import {Typography} from '@mui/material';
import CustomCalendar from './CustomCalendar';

const MyCalendar = () => {

  return (
    <div className='Calendar-div vertical-flex' >
      <div id="Calendar-background">
        <Typography variant='h4' sx={{textAlign: 'left', marginBottom: '10px'}}>Scheduled Events</Typography>
        <CustomCalendar initialView='dayGridMonth' height='38.5rem'/>
      </div>
    </div>
  );
};

export default MyCalendar;
