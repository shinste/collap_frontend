import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import CreateEvent from './pages/CreateEvent';
import Notifications from './pages/Notifications';
import HostedEvents from './pages/HostedEvents';
import MyEvents from './pages/MyEvents';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/event/create" element={<CreateEvent />} />
        <Route path="/event/list" element={<MyEvents />} />
        <Route path="/event/notifications" element={<Notifications />} />
        <Route path="/event/hosted" element={<HostedEvents />} />

        {/* Define more routes for other pages as needed */}
      </Routes>
    </Router>
  );
};

export default App; 