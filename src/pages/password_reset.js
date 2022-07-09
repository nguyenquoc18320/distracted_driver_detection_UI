import React from 'react';
import "../styles/add_user.css";
import { useNavigate } from "react-router-dom";
import Global from "../globals";
function ResetPassword() {
    const navigate = useNavigate();
    const [driver_license, setDriverLicense] = React.useState();
    const [username, setUserName] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirm_password, setConfirmPassword] = React.useState();

   
    function changeDriverLicenseValue(e) {
        setDriverLicense(e.target.value);
    }
    function changePassWordValue(e) {
        setPassword(e.target.value);
    }
    function changeConfirmPasswordValue(e) {
        setConfirmPassword(e.target.value);
    }
    function changeUsernameValue(e) {
        setUserName(e.target.value);
    }
    async function clickRegisterButton() {
        if(password === confirm_password){
            const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                driver_license: driver_license,
                username: username,
                newpassword: password,
            }),
            };
            fetch(Global.api_url + "password_reset", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Global.updateAccessToken(data.data["access_token"]);
                navigate("/login");
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
            <div className='div_header'>
                <h2>Reset your password</h2>
            </div>
            <div className='div_body'>
                <div className='div_format'>
                    <p>Username:</p>
                    <input type="text" name="username" placeholder='Your username' onChange={(e) => changeUsernameValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Driver License:</p>
                    <input type="text" name= "driver_license" placeholder='Your Driver License' onChange={(e) => changeDriverLicenseValue(e)} required></input>
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
                    <button className='btn_register' onClick={() => clickRegisterButton()}>Compete</button>
                </div>
                
            </div>
        </div>     
    ); 
}

export default ResetPassword;