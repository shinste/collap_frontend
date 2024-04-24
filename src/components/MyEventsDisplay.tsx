import { useState, useEffect } from 'react';
import { Box, Button, Typography, List, ListItemButton, ListItemText,
         Collapse, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, 
         DialogActions} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { red } from '@mui/material/colors';
import CustomCalendar from './CustomCalendar';
import getEvents from '../functions/getEvents';
import formatTimeRange from '../functions/getTimeRange';
import getDate from '../functions/getDate';
import postApi from '../functions/postApi';

const MyEventsDisplay = () => {
  type EventData = {
    event_id: string;
    name: string;
    host_id: number;
    primary_date: string;
    dates: string[];
    participants: string[];
    start: string;
    end: string;
  };

  const [eventData, setEventData] = useState<Record<string, EventData>>({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);

  type OpenStatesType = {
    [key: string]: boolean;
  };
  const [openStates, setOpenStates] = useState<OpenStatesType>({});
  const [success, setSuccess] = useState('');
  const storedUsername = localStorage.getItem('username') || '';


  useEffect(() => {
    getEvents(setEventData, storedUsername);
  }, [status]);

  const toggleDropdown = (key: any) => {
    setOpenStates({
      ...openStates,
      [key]: !openStates[key],
    });
  };

  const handleLeave = async (event_id: String, numb: any, name: String) => {
    try {
      const deleteData = {
        username: storedUsername,
        event_id: event_id
      }
      const response = await postApi('event/leave/', deleteData);
      if (response.ok) {
        const data = await response.json();
        console.log('Event Left:', data);
        setError('')
        setSuccess('Successfully Left ' + [name])
        delete eventData[numb]
      } else {
          const errorData = await response.json();
          const message = errorData.error
          if (typeof message != "string") {
              const message2 = Object.values(message)[0]
              setError(String(message2))
          } else{
              setError(message)
          }
          setSuccess("")
          console.error('Failed to delete user:', message);
      }
    } catch (errors) {
      console.error('Error:', errors);
      setSuccess("")
      setError('Invalid Request');
    }
    setStatus(!status)
  };

  return (
    <div className='flex-container mt-5' style={{width:'100%', height: '50%'}}>
      <div style={{width: '40%', marginLeft: 80}} >
        <Box sx={{width: '100%', height: '45rem', overflow: 'auto', display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
          <Box sx={{marginBottom: 4}}>
            <Typography variant="h4">
              My Events
            </Typography>
            </Box>
          <List sx={{ 
                      width: '100%', 
                      maxWidth: 360,
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'right'
                    }}>
            {error && <Typography sx={{ color: 'red' }} >{error}</Typography>}
            {success && <Typography sx={{ color: 'green' }} >{success}</Typography>}
            {Object.entries(eventData).map(([key, value]) => (
              <div key={key}>
                <Box sx={{ border: '2px solid #A8A8A8', borderRadius: '15px', width: '35rem', height:'8rem', marginBottom:2, background: '#FFFFFF '}}>
                  {typeof value === 'object' && value !== null &&
                  Object.entries(value).map(([nestedKey, nestedValue]) => (
                    nestedKey === 'name' && (
                      <div className="vertical-flex" style={{height: '100%', position: 'relative'}} key={nestedKey}>

                        {/* collapse button */}
                        <Box style={{width:'100%'}}>
                          <ListItemButton onClick={() => toggleDropdown(key)} key={nestedKey}>
                            <ListItemText style={{ textAlign: 'left', textTransform: 'capitalize'}} primary={String(nestedValue)} />
                            {openStates[key] ? <ExpandLessIcon /> : <ExpandMore />}
                          </ListItemButton>
                        </Box>

                        {/* real collapse */}
                        <Collapse in={openStates[key]} timeout="auto" unmountOnExit>
                            <div className='mt-2 mx-3' style={{textAlign: 'left'}}>
                              <Typography sx={{fontSize: 12}}>Participants: {value["participants"].map((participant, index) => (
                                <Typography sx={{display: 'inline', fontSize: 12}}>{participant} </Typography>
                              ))}</Typography>
                            </div>
                        </Collapse>

                        {/* Date and Time */}
                        <div className='flex-container' style={{height:'2rem', width: '97%', marginLeft:15, marginBottom: 5, position: 'absolute', bottom:0}}>
                              <div>
                                <Typography className='vertical-center-relative'>{getDate(value["primary_date"])}</Typography>
                              </div>
                              <div style={{marginLeft: 5}}>
                                <Typography className='vertical-center-relative'>{formatTimeRange(String(value["start"]), String(value["end"]))}</Typography>
                              </div>
                              <div style={{flexGrow:1, textAlign: 'right'}}>
                                <Tooltip title='Leave Event'>
                                  <Button onClick={() => setOpen(true)}className='vertical-center'>
                                    <ExitToAppIcon sx={{ color: red[500] }}/>
                                  </Button>
                                </Tooltip>
                                <Dialog
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                    {"Delete the event " + value["name"]}
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to leave this event?
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button sx={{color: 'green'}} onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button sx={{color: 'red'}} onClick={() => {
                                                                                handleLeave(value['event_id'], key, value['name']); // Call the action/function
                                                                                setOpen(false);
                                                                        }} autoFocus>
                                        Leave
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                              </div>
                              
                            </div>
                      </div>
                    )
                  ))}
                </Box>
              </div>
            ))}
          </List>
        </Box>
      </div>
      <div style={{width:'50%', textAlign: 'left'}}>
        <Box sx={{marginLeft:10, paddingTop: 5, border: '2px solid #A8A8A8', borderRadius: '15px', width: '40rem', height: '90%', overflow:'hidden'}}>
          <CustomCalendar initialView='listWeek' height='600px'/>
        </Box>
      </div>
  </div>
  );
};

export default MyEventsDisplay;
