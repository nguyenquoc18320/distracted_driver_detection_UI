import React from "react";
import "../styles/infor.css"
import {useLocation} from 'react-router-dom';
import Menu from '../components/menu'
import ButtonInfor from '../components/btn_infor'
import { FaRegListAlt, FaUserCircle } from "react-icons/fa";

function Information() {
    const location = useLocation();
    var [data, setData] = React.useState([]);
    var gender = '';
    const [showResults, setShowResults] = React.useState(false)
    const [showButtons, setShowButtons] = React.useState(false)
    const onClickMenu = () => setShowResults(true)
    if (data.gender===1){
        gender = 'Male';
    }else{
        gender = 'Female';
    }
    const onClickButtonChangeInfor = () => {
        if (showButtons === false){
            setShowButtons(true)
        }else{
            setShowButtons(false)
        }
        
    }

    React.useEffect(() => {
        // if ((location.state) =! null){
            setData(location.state)
        // }
    },[]);
    
    return (
        <>     
        <div className="div-logo">
        
            <div className="div-menu-icon">
                <FaRegListAlt className="div-menu-icon2" onClick={onClickMenu} />
                { showResults ? <Menu state={data} /> : null }               
            </div>
            {/* <Menu/> */}
            <div className="div-border">
                <div className="div-update-infor">
                    <FaUserCircle className="div-menu-icon2"  onClick={onClickButtonChangeInfor} ></FaUserCircle>
                    { showButtons ? <ButtonInfor state={data} ></ButtonInfor> : null } 
                </div>
               
                <h3>Information</h3>
                <p>Name: {data.name}</p>
                <p> Gender: {gender}</p>
                <p> Phone: {data.phone}</p>
                <p>Birthday: {data.birthday}</p>
                <p>Driver License: {data.driver_license}</p>
            </div>
        </div>
        

        </>
    )
}
export default Information;