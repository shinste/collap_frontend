import React, { useState } from 'react';
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


const App = () => {

  const [username, setUsername] = useState('');


  return (
    <Router>
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
    </Router>
  );
};

export default App; 