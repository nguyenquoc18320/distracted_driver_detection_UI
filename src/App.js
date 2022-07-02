import React from 'react'
import {BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
 
import Login from './pages/login';
import ManageUsers from './pages/manage_users';
import Home from './pages/home';
import AddUsers from './pages/adduser';
import Predict from "./pages/predict";
import PredictImage from "./pages/predict_image";
import ResetPassword from "./pages/password_reset";
import UpdatePassword from "./pages/change_pass";
import Information from "./pages/infor";
import Menu from "./components/menu";
import ButtonInfor from "./components/btn_infor";
import UpdateUser from './pages/update_infor';
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
          <Route path="/password_reset" element={<ResetPassword />} />
          <Route path="/change_password" element={<UpdatePassword/>}/>
          <Route path="/infor" element={<Information/>}/>
          <Route element={<ButtonInfor/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/update_infor" element={<UpdateUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;