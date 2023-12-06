import { AppBar, Container, Toolbar, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
  
  
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const userData = {
          username: username,
          password: password,
        };
    
        try {
          const response = await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('User created:', data);
            setSuccess(true)
            setError('')
          } else {
              const errorData = await response.json();
              const errorMessage = errorData.username[0];
              setError(errorMessage);
              setSuccess(false)
              console.error('Failed to create user:', error);
          }
        } catch (error) {
          console.error('Error:', error);
          setSuccess(false)
          setError('Invalid Request');
        }
      };
  
    return (
        <Container>
          <div className="vertical-center-norm">
            <div className='center' >
              <form onSubmit={handleSubmit}>
                <h1 className='center'>Registration</h1>
                <TextField
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <div className='center-content'>
                  {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
                  {success && <Typography variant="body1" sx={{ color: 'green' }}>Registration for {username} successful! Click <Link to="/" className="App-link">Here</Link> to Login</Typography>}
                  <Button className="center" variant="contained" type="submit" color="primary" style={{backgroundColor: "#87976E"}} sx={{ borderRadius: "15px", mt: 2 }}>
                      Register
                  </Button>
  
                </div>
                
              </form>
            </div>
          </div>
        </Container>
    );
  };
  
  export default Register;
  