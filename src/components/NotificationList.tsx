import React, { useState, useContext, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { LoginContext } from '../contexts/UsernameContext';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotificationList = () => {

    const [eventData, setEventData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const storedUsername = localStorage.getItem('username') || '';

    useEffect(() => {
        // if (username && username != localStorage.getItem('username')) {
        //     localStorage.setItem('username', username);
        // }
        getNotifications(); 
      }, []);
    


    const getNotifications = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/notification/?username=${encodeURIComponent(storedUsername)}`);
            if (response.ok) {
                const eventData = await response.json();
                setEventData(eventData); // Update state with fetched data
                console.log('Query Successful', eventData);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error[0];
                setErrorMessage(errorMessage); // Update state with error message
                console.error('Failed to Query', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className='left-box'>
            <div className="mt-5">
                <div className='center-left'>
                    <Typography variant="h4" className='mb-3'>
                        Notifications
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360 }}>
                        <Divider />
                        {/* Check if eventData exists and then render its keys/values */}
                        {eventData &&
                            Object.keys(eventData).map((key) => (
                                <div key={key}>
                                    {typeof eventData[key as keyof typeof eventData] === 'object' &&
                                        Object.entries(eventData[key as keyof typeof eventData]).map(([nestedKey, value]) => (
                                            (nestedKey == "notification") && (
                                                <ListItem divider key={nestedKey}>
                                                    <ListItemText primary={`${value}`} secondary={!value.includes('Vote') ? null : (<Typography variant="subtitle2" color="error">Mandatory</Typography>)}/>
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
                </div>
            </div>
        </div>
    );
};

export default NotificationList;
