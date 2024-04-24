import {Typography} from '@mui/material';
import CustomCalendar from './CustomCalendar';

const MyCalendar = () => {

  return (
    <div className='Calendar-div horizontal-center vertical-flex' >
      <Typography variant='h4' sx={{textAlign: 'left'}}>Scheduled Events</Typography>
      <div className='mt-4' style={{border: 'solid #AFC38E', borderRadius: '8px'}}>
        <CustomCalendar initialView='dayGridMonth' height='40.5rem'/>
      </div>
    </div>
  );
};

export default MyCalendar;
