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
import '../App.css';


const theme = createTheme({
  palette: {
    background: {
      default: '#AFC38E'
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
          <body >
            <Box sx={{
              display: 'flex',
            }}>
              <section>
                <InputLogin />
              </section>
              <section>
                <Showcase />
              </section>
            </Box>
          </body>
      </ThemeProvider>
    // </UsernameProvider>  
  )                  
}



export default App;
