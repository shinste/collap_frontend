import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';



const theme = createTheme({
    palette: {
      background: {
        default: '#AFC38E'
      },
      primary: {
          main: '#87976E',
        },
    },
});









const InputLogin = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const response = await fetch(`http://127.0.0.1:8000/login/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
        if (response.ok) {
          const data = await response.json();
          setError('');
          navigate('/homepage', { replace: true})
          console.log('Login successful:', data);
          // Handle successful login, redirect, etc.
        } else {
          setUsername(''); // Clear username input
          setPassword(''); // Clear password input
          setError('Incorrect Password or Username'); // Set error message
          // Handle failed login, show error message, etc.
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle fetch error
      }
    }

    return (
        <Box sx={{ margin: 'auto'}}>
            <Box sx={{ margin: '80px'}}>
                <Typography variant="h3" sx={{ fontSize: '30px', margin: '30px', marginRight: '50px', fontFamily: 'Roboto', color:"#000000" }}> Welcome to Collap!👋</Typography>
                <Typography variant="h6" sx={{ fontSize: '15px', margin: '30px', marginLeft: '35px', fontFamily: 'Roboto', color: '#444444' }}> Log in to get started.</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box sx={{ margin: '-50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <TextField
                        label="Username"
                        onChange={handleUsernameChange}
                        size='small'
                        color='primary'
                        sx={{
                        width: '300px',
                        size: "small",
                        margin: 'auto'
                        }}
                    />
                </Box>
                <Box sx={{ margin: '70px' , display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <TextField
                        label="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        size='small'
                        color="primary"
                        InputLabelProps={{
                            style: {
                            color: theme.palette.primary.main, // Set label color to primary main color
                            },
                        }}
                        sx={{
                        width: '300px',
                        }}
                />
                </Box>
                <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '100px',
                        }}>
                {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" style={{backgroundColor: "#87976E",}} sx={{ width: '300px'}}>LogIn</Button>
                </Box>
        </form>
    </Box>
    
    )
}

export default InputLogin;