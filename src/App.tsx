import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import CreateEvent from './pages/CreateEvent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/event/create" element={<CreateEvent />} />
        {/* Define more routes for other pages as needed */}
      </Routes>
    </Router>
  );
};

export default App;