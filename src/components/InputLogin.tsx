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
      <div>
        <div className="bg-light login-box">
          <div className="vertical-center ">
            <div className='center'>
              <div className = "left">
                <h3>Welcome to Collap!👋</h3>
                <h6>Log in to get started.</h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-5 mt-3">
                  <Box>
                      <TextField label="Username" onChange={handleUsernameChange} size='small' sx={{width: '300px', size: "small"}}/>
                      <TextField className="mt-3" label="Password" type="password" onChange={handlePasswordChange} size='small' sx={{width: '300px'}}/>
                  </Box>
                </div>
                  {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
                  <Button type="submit" variant="contained" color="primary" style={{backgroundColor: "#87976E",}} sx={{ width: '300px'}}>LogIn</Button>
                </form>
              </div>
          </div>
          <div className="sub_div justify-content-center">
            <Typography variant="body1" sx={{ fontSize: '12px' }}>New to Collap? <Link to="/homepage" className="App-link">Get started</Link></Typography>
          </div>
        </div>
      </div>  
    )
}

export default InputLogin;