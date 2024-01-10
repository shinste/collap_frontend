import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import getNotifications from '../functions/getNotifications';

const NotificationList = () => {

    const [eventData, setEventData] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage, setErrorMessage] = useState('');
    const storedUsername = localStorage.getItem('username') || '';

    useEffect(() => {
        getNotifications(setEventData, setErrorMessage, storedUsername); 
    }, []);

    return (
        <Box sx={{width:'25%', marginTop: 10}}>
                <div className='center-left'>
                    <Typography variant="h4" className='mb-3'>
                        Notifications
                    </Typography>
                    <Box sx={{height: '100vh', overflowY: 'auto'}}>
                        <List className='scrollable-box' sx={{ width: '100%', maxHeight: '70%'}}>
                            <Divider />
                            {/* Check if eventData exists and then render its keys/values */}
                            {eventData &&
                                Object.keys(eventData).map((key) => (
                                    <div key={key}>
                                        {typeof eventData[key as keyof typeof eventData] === 'object' &&
                                            Object.entries(eventData[key as keyof typeof eventData]).map(([nestedKey, value]) => (
                                                (nestedKey == "notification") && (
                                                    <ListItem divider key={nestedKey}>
                                                        <ListItemText primary={`${value}`} secondary={!value.includes('You must vote on') ? null : (<Typography variant="subtitle2" color="error">Mandatory</Typography>)}/>
                                                    </ListItem>
                                                )
                                            ))}
                                    </div>
                                ))}
                            <Divider />
                            <ListItem>
                                <ListItemText primary={<Link to ="/event/notifications" className="App-link">Go To Notifications</Link>}/>
                            </ListItem>
                        </List>
                    </Box>
                </div>
        </Box>
    );
};

export default NotificationList;
