import React from 'react';
import "../styles/add_user.css";
import { useNavigate } from "react-router-dom";
import Global from "../globals";
function AddUsers() {
    const navigate = useNavigate();
    const [name, setName] = React.useState();
    const [driver_license, setDriverLicense] = React.useState();
    const [username, setUserName] = React.useState();
    const [gender, setGender]= React.useState(true)
    const [birthday, setBirthday] = React.useState(Date);
    const [phone, setPhone] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirm_password, setConfirmPassword] = React.useState();

    React.useEffect(() => {
        setBirthday('2000-01-01')
        setGender(true)
    }, []);
    function changeNameValue(e) {
        setName(e.target.value);
    }
    function changeDriverLicenseValue(e) {
        setDriverLicense(e.target.value);
    }
    const changeGender = () => setGender(value => !value);
    function changeBirthday(e) {
        setBirthday(e.target.value);
    }
    function changePhoneValue(e) {
        setPhone(e.target.value);
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
        if(name != null &&driver_license !=null&&gender !=null&&birthday !=null&&phone !=null&&username !=null&&password !=null&&confirm_password !=null){
            if(password === confirm_password){
                const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json",
                // "Authorization": "Bearer " + Global.access_token
                Authorization: "Bearer " + localStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    name: name,
                    driver_license: driver_license,
                    gender: gender,
                    birthday: birthday,
                    phone: phone,
                    username: username,
                    password: password, 
                }),
                };
                fetch(Global.api_url + "register", requestOptions)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // Global.updateAccessToken(data.data["access_token"]);
                    alert(data.data["alert"])
                    navigate("/manage-user");
                })
                .catch(
                    (error) => {console.log(error)
                        alert("Fail !!!");
                    }
                )
                
                ;
            }else{
                alert("Confirmation password is not correct!!!")
            }
        }else{
            alert("Please enter enough information!!!")
        }
      }

    return (
        <div className='div_background'>
        <div className='container'>
            <div className='div_header_distrac'>
                <h1>New Account</h1>
            </div>
            <div className='div_body'>
            <div className='div_convert'>
                <div className='div_format2'>
                    <p>Name:</p>
                    <input type="text" name="name" placeholder="Driver's name" onChange={(e) => changeNameValue(e)} required></input>
                </div>
                <div className='div_format3'>
                    <p>Driver License:</p>
                    <input type="text" name= "driver_license" placeholder= "Driver's license" onChange={(e) => changeDriverLicenseValue(e)} required></input>
                </div>
                </div>
                <div className='div_format_gender'>
                    <p>Gender:</p>
                    <div className='div_gender'>
                        
                        <input type="radio" id="gender1" name="gender" onChange={changeGender} checked={gender} ></input>
                        <p for="gender1">Male</p>
                        <input type="radio" id="gender2" name="gender" onChange={changeGender} checked={!gender}></input>
                        <p for="gender2">Female</p>
                        
                    </div>
                </div>
             
                <div className='div_format'>
                    <p>Birthday:</p>
                    <input type="date" name= "birthday"  value={birthday} onChange={(e) => changeBirthday(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Phone:</p>
                    <input type="text" name="phone" placeholder='Phone' onChange={(e) => changePhoneValue(e)} required></input>
                </div>
                
                <div className='div_format'>
                    <p>Username to Login:</p>
                    <input type="text" name="username" placeholder='Username' onChange={(e) => changeUserNameValue(e)} required></input>
                </div>
                <div className='div_convert'>
                    <div className='div_format2'>
                        <p>Password:</p>
                        <input type="Password" name= "password" placeholder='Password' onChange={(e) => changePassWordValue(e)} required></input>
                    </div>
                    <div className='div_format3'>
                        <p>Confirm password:</p>
                        <input type="Password" name="confirmpassword" placeholder='Confirm password' onChange={(e) => changeConfirmPasswordValue(e)} required></input>
                    </div>
                </div>
                <div className='div_format'>
                    <button className='btn_register' onClick={() => clickRegisterButton()}>Add User</button>
                </div>
                
            </div>
        </div>    
        </div> 
    ); 
}

export default AddUsers;