import React, { useState, useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/UsernameContext';
import postApi from '../functions/postApi';


const InputLogin = () => {

    const {setUsername} = useContext(LoginContext)
    const {username} = useContext(LoginContext)
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const loginInfo = {
        username: username,
        password: password
      }
      try {
        const response = await postApi('login/', loginInfo)
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
      <div className="bg-light Left-box center">
          <div className='vertical-center vertical-flex' style={{textAlign:'center'}}>
            <h3>Welcome to Collap!👋</h3>
            <h6>Log in to get started.</h6>
            <form onSubmit={handleSubmit}>
              <div className="mb-5 mt-3 vertical-flex">
                <TextField className="horizontal-center" label="Username" onChange={(e) => setUsername(e.target.value)} size='small'/>
                <TextField className="mt-3" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} size='small'/>
              </div>
                {error && <Typography variant="body1" sx={{ color: 'red' }}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" style={{backgroundColor: "#87976E"}} sx={{ borderRadius: "15px", width: '300px'}}>LogIn</Button>
            </form>
            <Typography variant="body1" sx={{ fontSize: '12px' }}>New to Collap? <Link to="/registration" className="App-link" color="green">Get started</Link></Typography>
          </div>
      </div> 
    )
}

export default InputLogin;