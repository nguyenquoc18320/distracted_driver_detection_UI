import React from "react";
import "../styles/menu.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaList,FaCarAlt, FaSignOutAlt, FaWindowClose, FaHighlighter} from "react-icons/fa";
const Menu = function(props) {
  const navigate = useNavigate();
  const clickInfor = () =>{
    navigate("/infor",{state: props.state})
  }
  const clickPredict = () =>{
    navigate("/predict",{state: props.state})
  }
  const clickUpdate = () =>{
    navigate("/update_infor",{state: props.state})
  }
  const clickUpdatePass = () =>{
    navigate("/change_password",{state: props.state})
  }
  const clickBack = () =>{
    navigate("/manage-user");
  }
    return (
      <div className="bm-menu-wrap">
        <div className="bm-menu">
          <div className="bm-item-list">
            <a className="bm-item" onClick={clickInfor}>
              <FaUserCircle>:: before</FaUserCircle>
              <span>Information</span>
            </a>
            <a className="bm-item" onClick={clickUpdate}>
              <FaHighlighter>:: before</FaHighlighter>
              <span>Update User</span>
            </a>
            <a className="bm-item" onClick={clickUpdatePass}>
              <FaHighlighter>:: before</FaHighlighter>
              <span>Change Password</span>
            </a>
            <a className="bm-item" onClick={clickPredict}>
              <FaCarAlt>:: before</FaCarAlt>
              <span>Distraction</span>
            </a>
            <a className="bm-item" onClick={clickBack}>
              <FaSignOutAlt>:: before</FaSignOutAlt>
              <span>Back</span>
            </a>
          </div>
          <div className="bm-close" >
            <FaWindowClose className="btn-close" onClick={() => window.location.reload()} ></FaWindowClose>
          </div>
        </div> 
      </div>
    )
}
  

 
export default Menu;