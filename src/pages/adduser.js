import React from 'react';
import "../styles/add_user.css";
import { useNavigate } from "react-router-dom";
import Global from "../globals";
function AddUsers() {
    const navigate = useNavigate();
    const [name, setName] = React.useState();
    const [driver_license, setDriverLicense] = React.useState();
    const [username, setUserName] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirm_password, setConfirmPassword] = React.useState();

    function changeNameValue(e) {
        setName(e.target.value);
    }
    function changeDriverLicenseValue(e) {
        setDriverLicense(e.target.value);
    }
    function changeUserNameValue(e) {
        setUserName(e.target.value);
    }
    function changePassWordValue(e) {
        setPassword(e.target.value);
    }
    function changeConfirmPasswordValue(e) {
        setConfirmPassword(e.target.value);
    }
    
    async function clickRegisterButton() {
        if(password === confirm_password){
            const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                driver_license: driver_license,
                username: username,
                password: password,
            }),
            };
            fetch(Global.api_url + "register", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Global.updateAccessToken(data.data["access_token"]);
                navigate("/predict");
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
                <h2>Register</h2>
            </div>
            <div className='div_body'>
                <div className='div_format'>
                    <p>Name:</p>
                    <input type="text" name="name" placeholder='Your name' onChange={(e) => changeNameValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Driver License:</p>
                    <input type="text" name= "driver_license" placeholder='Your Driver License' onChange={(e) => changeDriverLicenseValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Username to Login:</p>
                    <input type="text" name="username" placeholder='Your username' onChange={(e) => changeUserNameValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Password:</p>
                    <input type="Password" name= "password" placeholder='Your password' onChange={(e) => changePassWordValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Confirm password:</p>
                    <input type="Password" name="confirmpassword" placeholder='Confirm your password' onChange={(e) => changeConfirmPasswordValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <button className='btn_register' onClick={() => clickRegisterButton()}>Register</button>
                </div>
                
            </div>
        </div>     
    ); 
}

export default AddUsers;