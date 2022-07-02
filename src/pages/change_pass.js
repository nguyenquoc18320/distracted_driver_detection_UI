import React from 'react';
import "../styles/add_user.css";
import { useNavigate, useLocation } from "react-router-dom";
import Global from "../globals";
import Menu from '../components/menu'
import { FaRegListAlt } from "react-icons/fa";
function UpdatePassword() {
    const navigate = useNavigate();
    const location = useLocation();
    var [data, setData] = React.useState([]);
    const [oldpassword, setOldpassword] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirm_password, setConfirmPassword] = React.useState();
    const [showResults, setShowResults] = React.useState(false)
    const onClickMenu = () => setShowResults(true)
    React.useEffect(() => {
            setData(location.state)
    },[]);
    
    function changePassWordValue(e) {
        setPassword(e.target.value);
    }
    function changeConfirmPasswordValue(e) {
        setConfirmPassword(e.target.value);
    }
    function changeOldpasswordValue(e) {
        setOldpassword(e.target.value);
    }
    async function clickRegisterButton() {
        if(password === confirm_password){
            const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: data.id,
                oldpassword: oldpassword,
                newpassword: password,
            }),
            };
            fetch(Global.api_url + "password_update", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Global.updateAccessToken(data.data["access_token"]);
                navigate("/infor",{state: data.data["user"]})
            })
            .catch(
                (error) => console.log(error) // Handle the error response object
            );
        }else{
            alert("Confirmation password is not correct!!!")
        }

      }

    return (
        <div className='container'>
            <div className="div-menu-icon">
                <FaRegListAlt className="div-menu-icon2" onClick={onClickMenu} />
                { showResults ? <Menu state={data} /> : null }               
            </div>
            <div className='div_header'>
                <h2>Change your password</h2>
            </div>
            <div className='div_body'>
                <div className='div_format'>
                    <p>Old Password:</p>
                    <input type="text" name="oldpassword" placeholder='Your old password' onChange={(e) => changeOldpasswordValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>New password:</p>
                    <input type="Password" name= "password" placeholder='Your password' onChange={(e) => changePassWordValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Confirm password:</p>
                    <input type="Password" name="confirmpassword" placeholder='Confirm your password' onChange={(e) => changeConfirmPasswordValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <button className='btn_register' onClick={() => clickRegisterButton()}>Update</button>
                </div>
                
            </div>
        </div>     
    ); 
}

export default UpdatePassword;