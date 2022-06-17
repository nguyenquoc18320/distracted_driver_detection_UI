import React from 'react'
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
 
import Login from './pages/login';
import ManageUsers from './pages/manage_users';
 
 function App() {
    return (
        <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manage-user" element={<ManageUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
