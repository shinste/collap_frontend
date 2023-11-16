import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField'
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import calendar from '../images/calendarimg.png';
import Showcase from '../components/Showcase';
import InputLogin from '../components/InputLogin'

const theme = createTheme({
  palette: {
    background: {
      default: '#AFC38E'
    },
    primary: {
        main: '#87976E',
      },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderColor: '#87976E', // Use the custom color
          },
          '&:hover': {
            borderColor: '#87976E', // Change border color on hover
          },
          '& fieldset': {
            borderColor: '#87976E', // Set border color when not focused
          }
        },
      },
      defaultProps: {
        InputLabelProps: {
          style: {
            color: '#87976E', // Use the custom color for label
          },
        },
      },
    },
  }
});



function App() {



  return (
    // <UsernameProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          display: 'flex'
        }}>
          <Box
            sx={{
              width: '35vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              margin: '0px 200px 0 0px',
              paddingBottom: '20px',
              backgroundColor: 'white',
            }}
          >
            <>
              <InputLogin />
            </>
            <Typography variant="body1" sx={{ fontSize: '12px', fontFamily: 'Bell MT' }}>New to Collap? <Link to="/homepage">Get started</Link></Typography>
          </Box>
          <>
            <Showcase />
          </>
          
        </Box>
      </ThemeProvider>
    // </UsernameProvider>                    
  );
}



export default App;
