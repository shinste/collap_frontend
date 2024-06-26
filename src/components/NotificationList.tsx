import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import getNotifications from '../functions/getNotifications';

const NotificationList = () => {

    const [eventData, setEventData] = useState('');
    const storedUsername = localStorage.getItem('username') || '';

    useEffect(() => {
        getNotifications(setEventData, storedUsername); 
    }, []);

    return (
        <div className='mx-3 mt-3'>
            <Typography variant="h4" className='mb-3 mt-5 mx-3'>
                Notifications
            </Typography>
            <Box sx={{height: '100vh', overflowY: 'auto'}}>
                <List className='scrollable-box' sx={{ width: '100%', maxHeight: '70%', borderRadius: '12px', height:'42rem'}}>
                    {eventData &&
                        Object.keys(eventData).map((key) => (
                            <Link to ="/event/notifications" style={{textDecoration: 'none', color: 'inherit'}}>
                                <div key={key} className='Notification-item'>
                                    {typeof eventData[key as keyof typeof eventData] === 'object' &&
                                        Object.entries(eventData[key as keyof typeof eventData]).map(([nestedKey, value]) => (
                                            (nestedKey == "notification") && (
                                                <ListItem  key={nestedKey}>
                                                    <ListItemText primary={`${value}`} secondary={!value.includes('You must vote on') ? null : (<Typography variant="subtitle2" color="error">Mandatory</Typography>)}/>
                                                </ListItem>
                                            )
                                        ))}
                                </div>
                            </Link>
                        ))}
                </List>
            </Box>
        </div>
    );
};

export default NotificationList;
