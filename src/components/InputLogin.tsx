import React, { useState, useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/UsernameContext';
import getApi from '../functions/getApi';


const InputLogin = () => {

    const {setUsername} = useContext(LoginContext)
    const {username} = useContext(LoginContext)
    const navigate = useNavigate()
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
      // http://127.0.0.1:8000
      // https://collapbackend.azurewebsites.net
      try {
        const response = await getApi(`login/?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        if (response.ok) {
          const data = await response.json();
          navigate('/homepage', { replace: true})
          console.log('Login successful:', data);
        } else {
          setError('Incorrect Password or Username');
        }
      } catch (error) {
        console.error('Error:', error);
      }   
    }

    return (
      <div className="bg-light left-box">
        <div className="vertical-center vertical-flex" style={{textAlign:'center'}}>
        <div className='center-left'>
          <div>
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
              <Button type="submit" variant="contained" color="primary" style={{backgroundColor: "#87976E"}} sx={{ borderRadius: "15px", width: '300px'}}>LogIn</Button>
            </form>
          </div>
            <Typography variant="body1" sx={{ fontSize: '12px' }}>New to Collap? <Link to="/registration" className="App-link" color="green">Get started</Link></Typography>
        </div>
      </div> 
    )
}

export default InputLogin;