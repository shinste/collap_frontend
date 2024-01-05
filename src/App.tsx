import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import CreateEvent from './pages/CreateEvent';
import Notifications from './pages/Notifications';
import HostedEvents from './pages/HostedEvents';
import MyEvents from './pages/MyEvents';
import Registration from './pages/Registration';
import './App.css'
import { LoginContext } from './contexts/UsernameContext';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
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
  },
  palette: {
      background: {
      default: '#FBFBFB', // Set your desired background color here
    },
  },
});

const App = () => {

  const [username, setUsername] = useState('');


  return (
    <Router>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginContext.Provider value={{username, setUsername}}>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/event/create" element={<CreateEvent />} />
          <Route path="/event/list" element={<MyEvents />} />
          <Route path="/event/notifications" element={<Notifications />} />
          <Route path="/event/hosted" element={<HostedEvents />} />
          <Route path="/registration" element={<Registration />} />

        {/* Define more routes for other pages as needed */}
      </Routes>
      </LoginContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App; 