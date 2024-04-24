import { FormControl, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';
import { styled } from '@mui/system';
import DynamicInput from './DynamicInput';
import postApi from "../functions/postApi";

const StyledMultiInputDateTimeRangeField = styled(MultiInputDateTimeRangeField)`
  .MuiInputBase-input {
    // font-size: 18px; /* Adjust font size */
    padding: 12px; /* Adjust padding */
    /* Add more styles as needed */
  }
`;
interface Item {
  value: string | Date;
};

const TagInput = () => {
  const [users, setUsers] = useState<Item[]>([]);
  const [dates, setDates] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleEventName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePrimary = (e: any) => {
    try {
      const start = e[0].$d
      const end = e[1].$d
      setDateStart(start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate())
      setDateEnd(end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate())
      setTimeStart(String(start).split(' ')[4])
      setTimeEnd(String(end).split(' ')[4])
    } catch {}
  }; 

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernames = users.map(users => users.value);
    const availability = dates.map(dates => dates.value)
    const eventData = {
        event: {
            name: name,
            host: localStorage.getItem('username'),
            primary_date: dateStart,
            primary_end: dateEnd,
            start: timeStart,
            end: timeEnd
          },
          user: usernames,
          date: availability
    }
    try {
      const response = await postApi(`event/create/`, eventData);
        if (response.ok) {
          const data = await response.json();
          console.log('User created:', data);
          navigate('/homepage', { replace: true})
        } else {
            const errorData = await response.json();
            const message = errorData.error
            if (typeof message != "string") {
                const message2 = Object.values(message)[0]
                setError(String(message2))
            } else{
                setError(message)
            }
            console.error('Failed to create event:', message);
            console.log(eventData)
        }
      } catch (errors) {
        console.error('Error:', errors);
        setError('Invalid Request');
      }
    };
    


  return (
    <div className='center-content'>
        <div className='m-5'>
            <h1> Create an Event</h1>
        </div>
        
        <div className="mb-3">
            <h3>Event Name</h3>
            <TextField size='small' sx={{width:"30%", "& input": {height: '35px'}}} onChange={handleEventName} placeholder='Name of Event'/>      
        </div>
        <div className='m-3'>
            <div>
                <h3>Primary Date</h3>
            </div>
            <div>
                <Typography className="mb-1" variant='subtitle2'>Your event will be hosted on this day until you (the host) update it</Typography>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'StyledMultiInputDateTimeRangeField',
                ]}
              >
                <StyledMultiInputDateTimeRangeField
                  onChange={handlePrimary}
                  slotProps={{
                    textField: ({ position }) => ({
                      label: position === 'start' ? 'Event Start' : 'Event End',
                    }),
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
        </div>

        <div className='m-3'>
            <div>
                <h3>Invite Others</h3>
            </div>
            <div>
                <Typography className="mb-1" variant='subtitle2'>These users will be invited once the event is created You may invite users later if needed (Press Enter)</Typography>
            </div>
            <DynamicInput data={users} setData={setUsers} inputType="Invite Users" />
        </div>      
        

        <div className='m-3'>
            <div>
                <h3>Availability</h3>
            </div>
            <div>
                <Typography className="mb-1" variant='subtitle2'>List Available times near the Primary Date so you can figure out what works best among users (Press Enter)</Typography>
            </div>
            <DynamicInput data={dates} setData={setDates} inputType="YYYY-MM-DD" />
        </div>  
        

        <div>
            <FormControl>
            <form onSubmit={handleCreate}>
                    {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
                    <Button className="center" variant="contained" type="submit" color="primary" style={{backgroundColor: "#87976E"}} sx={{ borderRadius: "15px", mt: 2 }}>
                            Create Event
                    </Button>
                </form>
            </FormControl>
        </div>
    </div>
  );

};

export default TagInput;
