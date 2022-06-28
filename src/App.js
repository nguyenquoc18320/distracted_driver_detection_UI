import React from 'react'
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
 
import Login from './pages/login';
import ManageUsers from './pages/manage_users';

import AddUsers from './pages/adduser';
import Predict from "./pages/predict";
import PredictImage from "./pages/predict_image";

import Home from './pages/home';
 function App() {
    return (
        <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-user" element={<ManageUsers />} />
          <Route path="/adduser" element={<AddUsers />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/predict_image" element={<PredictImage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
