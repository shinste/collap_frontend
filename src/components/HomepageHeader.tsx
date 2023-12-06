import React, { useState, useContext, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/UsernameContext';




const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
  },
});


const HomepageHeader = () => {
  const navigate = useNavigate()
  const {username} = useContext(LoginContext)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  if (username) {
    localStorage.setItem('username', username);
  }

  useEffect(() => {
    if (username) {
        localStorage.setItem('username', username);
    }
  }, [username]);

  const storedUsername = localStorage.getItem('username') || '';


  const handleLogOut = () => {
  
    try {
        navigate('/', { replace: true})
        console.log('Logout successful');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCreateEvent = () => {
  
    try {
        navigate('/event/create', { replace: true})
        console.log('Navigated Successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleMyEvents = () => {
  
    try {
        navigate('/event/list', { replace: true})
        console.log('Navigated Successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleNotifications = () => {
  
    try {
        navigate('/event/notifications', { replace: true})
        console.log('Navigated Successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleHostedEvents = () => {
  
    try {
        navigate('/event/hosted', { replace: true})
        console.log('Navigated Successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleHomePage = () => {
  
    try {
        navigate('/homepage', { replace: true})
        console.log('Navigated Successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return (
        <AppBar position="static" style={{ background: '#AFC38E' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"

                        sx={{
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 750,
                        letterSpacing: '.2rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        Collap
                    </Typography>
                    <ThemeProvider theme={theme} >
                    <div className='flex-container m-3' >
                            <Button onClick={handleHomePage} sx={{ textTransform: 'capitalize', m: 1 }}>
                                HomePage
                            </Button>
                            <Button onClick={handleMyEvents} sx={{ textTransform: 'capitalize', m: 1 }}>
                                My Events
                            </Button>
                            <Button onClick={handleHostedEvents} sx={{ textTransform: 'capitalize', m: 1 }}>
                                Hosted Events
                            </Button>
                            <Button onClick={handleNotifications} sx={{ textTransform: 'capitalize', m: 1 }}>
                                Notifications
                            </Button>
                            <Button onClick={handleCreateEvent} sx={{ textTransform: 'capitalize', m: 1 }}>
                                Create an Event
                            </Button>
                            
                    </div>
                    <div className="position-absolute end-0">
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}>
                                <Button>{localStorage.getItem('username')}</Button>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="Log Out" onClick={handleLogOut}>
                                <Typography textAlign="center">Log Out</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                    </ThemeProvider>
                </Toolbar>
            </Container>
        </AppBar>
    )

}

export default HomepageHeader