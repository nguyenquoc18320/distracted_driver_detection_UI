import React from "react";
import "../styles/menu.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaList,FaCarAlt, FaSignOutAlt, FaWindowClose} from "react-icons/fa";
const Menu = function(props) {
  const navigate = useNavigate();
  const clickInfor = () =>{
    navigate("/infor",{state: props.state})
  }
  const clickPredict = () =>{
    navigate("/predict",{state: props.state})
  }
    return (
      <div className="bm-menu-wrap">
        <div className="bm-menu">
          <div className="bm-item-list">
            <a className="bm-item" onClick={clickInfor}>
              <FaUserCircle>:: before</FaUserCircle>
              <span>Information</span>
            </a>
            <a className="bm-item" onClick={clickPredict}>
              <FaCarAlt>:: before</FaCarAlt>
              <span>Predict</span>
            </a>
            <a href="/#" className="bm-item">
              <FaList>:: before</FaList>
              <span>Statistics</span>
            </a>
            <a href="/#" className="bm-item">
              <FaSignOutAlt>:: before</FaSignOutAlt>
              <span>Logout</span>
            </a>
          </div>
          <div className="bm-close">
            <FaWindowClose className="btn-close" onClick={() => window.location.reload()} ></FaWindowClose>
          </div>
        </div> 
      </div>
    )
}
  

 
export default Menu;