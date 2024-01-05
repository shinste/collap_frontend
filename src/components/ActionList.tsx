import React, { useState, useContext, useEffect } from 'react';
import getNotifications from '../functions/getNotifications';
import { Button, Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { BorderAllOutlined } from '@mui/icons-material';
import JoinPanel from './JoinPanel';
import VotePanel from './VotePanel';



const ActionList = () => {
  interface datatype {
    id: number;
    event_id_id: string;
    username_id: string;
    notification: string;
  }


    const [eventData, setEventData] = useState<datatype[]>([]);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const storedUsername = localStorage.getItem('username') || '';
    const [panel, setPanel] = useState('');
    const [join, setJoin] = useState<number | null>(null);
    const [vote, setVote] = useState<number | null>(null);
    const [dates, setDates] = React.useState<string[]>([]);
    const [id, setId] = useState('');
    const [missed, setMissed] = useState('');
    const [action, setAction] = useState('');



    useEffect(() => {
        getNotifications(setEventData, setError, storedUsername, setMissed, setAction);
        setPanel('');
        // actionEnd(eventData);
    }, [status]);


    const handleDismiss = async (event: any) => {
      try {
        setPanel('');
        const dismissData = {
          event_id : event["event_id_id"],
          username : event["username_id"],
          notification : event["notification"]
        }
        
        const response = await fetch('http://127.0.0.1:8000/delete_notifications/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dismissData),
        });
        if (response.ok) {
          const data = await response.json();
          
          setError('')
          setStatus(status + "dismissal")
          console.log('Notification Dismissed:', status);
        } else {
          const errorData = await response.json();
          const message = errorData.error
          if (typeof message != "string") {
              const message2 = Object.values(message)[0]
              setError(String(message2))
          } else{
              setError(message)
          }
          console.error('Failed to delete notification:', message);
          setStatus('errordismissal')
        }
      } catch (errors) {
        console.error('Error:', errors);
        setError('Invalid Request');
        setStatus('errordismissal')
      }
      
    }
    
    const handleJoin = (selected: number, event: any) => {
      setPanel('Join');
      setJoin(selected);
      setVote(null);
    }

    const handleVote = async (selected: number, event:any) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/event/dates/?event_id=${encodeURIComponent(event.event_id_id)}`);
        if (response.ok) {
          const fetchedEventData = await response.json();
          setDates(fetchedEventData); // Update state with fetched data
          setId(event.event_id_id);
          console.log('Date Lookup Successful', fetchedEventData);
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.error[0];
          console.error('Failed to Query', errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setPanel('Vote');
      setVote(selected);
      setJoin(null);
    }

    return (
        <div className='flex-container' style={{width:'100%', height: '95vh', marginLeft: 70}}>
          <div className='mt-5' style={{width: '30%'}} >
            <Box sx={{width: '30rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
              <Typography variant="h4" style={{ marginBottom: '1rem' }}>
                  Notifications
              </Typography>
              <Box sx={{height: '80%', overflowY: 'auto'}}>
                <List>  
                  {eventData &&
                    Object.keys(eventData).map((key: any) => (
                      <div className='my-3'>
                          {typeof eventData[key as keyof typeof eventData] === 'object' &&
                            Object.entries(eventData[key as keyof typeof eventData]).map(([nestedKey, value]) => {
                              if (nestedKey === 'notification') {
                                return (
                                  <div>
                                    {key === action && (
                                        <div style={{marginBottom: 10}}>
                                          <Typography>actions</Typography>
                                          {/* {updateAction()} */}
                                        </div>
                                      )}
                                    {key === missed && (
                                        <div style={{marginBottom: 10}}>
                                          <Typography>what you missed</Typography>
                                          {/* {updateAction()} */}
                                        </div>
                                      )}
                                    <Box sx={{ border: '2px solid #A8A8A8', borderRadius: '15px', width: '25rem', background:'#FFFFFF' }}>
                                    
                                    <div key={nestedKey}>
                                      <ListItem divider>
                                        <ListItemText primary={`${value}`} secondary={!value.includes('You must vote') ? null : (<Typography variant="subtitle2" color="error">Mandatory</Typography>)} style={{textAlign:'center'}}/>
                                      </ListItem>
                                      <div className='flex-container' style={{justifyContent:'center'}}>
                                        {value.includes("You have been invited") && (
                                          <Button className='mx-4' onClick={() => handleJoin(key, eventData[key])}>
                                              Join
                                          </Button>
                                        )
                                        }
                                        {!value.includes('You must vote') ? (
                                          <Button className='mx-4' onClick={() => handleDismiss(eventData[key])}>
                                            Dismiss
                                          </Button>
                                          ) : (
                                              <Button onClick={() => handleVote(key, eventData[key])}>Vote</Button>
                                          )
                                        }
                                      </div>
                                    </div>
                                    </Box>
                                  </div>
                                );
                              }
                              return null;
                            })}
                      </div>
                    ))}
                    {/* <Typography>what you missed</Typography> */}
                </List>
              </Box>
            </Box>  
          </div>
          <div style={{width: '60%', height: '70%', margin: 150}}>
            <Box sx={{border: '2px solid #A8A8A8', background: '#FFFFFF', height: '100%', width: '80%', borderRadius: '15px', textAlign: 'center' }}>
                {!panel && <div className='center' style={{height: '100%', alignContent  :'center'}}><Typography variant="h2" sx={{ color: 'gray' }}> </Typography></div>}
                {panel === 'Join' && join !== null && <JoinPanel key={join} eventInfo={eventData[join]} status={setStatus} />}
                {status.includes('joined event successfully') && <Typography variant="body1" sx={{ color: 'green' }}>Event Successfully Joined</Typography>}
                {panel === 'Vote' && vote !== null && <VotePanel key={vote} status={setStatus} dates={dates} event_id={id} />}
            </Box>
          </div>
        </div>
      
    )

}

export default ActionList