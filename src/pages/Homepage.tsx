import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { UsernameContext } from '../contexts/UsernameContext';
// const [createpage, setcreatepage] = useState('') 

// const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setUsername(e.target.value);
// };

// const username = Login().getUsername();
const Homepage = () => {
  // const [username, setUsername] = useState('');
  // let storedUsername = '';
  // const { username } = useUsername();

  // const handleUsernameChange = (newUsername: string) => {
  //   storedUsername = newUsername;
  //   // You can perform any additional logic with the new username here
  // };
  // try {
  //   const response = await fetch(`http://127.0.0.1:8000/event/view/?username=${encodeURIComponent(username)}}`);
  //   if (response.ok) {
  //     let event_info = response.json
  //   }

    return (
      <div>
        <h1>Welcome to the Homepage</h1>
        <Typography variant="body1" sx={{ fontSize: '12px', fontFamily: 'Bell MT' }}><Link to="/event/create">Create Event Page</Link></Typography>
        {/* <UsernameContext.Provider value={{username, setUsername}}> */}
          {/* <Typography>{username}</Typography>
        </UsernameContext.Provider> */}
      </div>
    );
  }




export default Homepage;