import React from "react";
import "../styles/menu.css";
import { useNavigate } from "react-router-dom";

const ButtonInfor = function(props) {
  const navigate = useNavigate();
  const clickNigative = () =>{
    navigate("/change_password",{state: props.state})
  }
  const clickNigative2 = () =>{
    navigate("/update_infor",{state: props.state})
  }
  return (
    <div className="bm-btn-wrap">
      <button onClick={clickNigative}>Change Password</button>
      <button onClick={clickNigative2}>Update Information</button>
    </div>
  )
}
  
export default ButtonInfor;