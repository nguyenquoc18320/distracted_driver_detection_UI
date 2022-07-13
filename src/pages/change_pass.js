import React from 'react';
import "../styles/add_user.css";
import { useNavigate, useLocation } from "react-router-dom";
import Global from "../globals";
import Menu from '../components/menu'
import { FaRegListAlt } from "react-icons/fa";
function UpdatePassword() {
    const navigate = useNavigate();
    const location = useLocation();
    var [user, setUser] = React.useState([]);
    const [name, setName] = React.useState();

    const [password, setPassword] = React.useState();
    const [confirm_password, setConfirmPassword] = React.useState();
    const [showResults, setShowResults] = React.useState(false)
    const onClickMenu = () => setShowResults(true)
    React.useEffect(() => {
        setUser(location.state)
        setName(location.state.name)
    },[]);
    
    function changePassWordValue(e) {
        setPassword(e.target.value);
    }
    function changeConfirmPasswordValue(e) {
        setConfirmPassword(e.target.value);
    }
    async function clickRegisterButton() {
        if(password === confirm_password){
            const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json"}, //"Authorization": "Bearer " + Global.access_token },
            body: JSON.stringify({
                id: user.id,
                newpassword: password,
            }),
            };
            fetch(Global.api_url + "password_update", requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Global.updateAccessToken(data.data["access_token"]);
                alert(data.data["request"])
                navigate("/infor",{state: user})
                
            })
            .catch(
                (error) => console.log(error) // Handle the error response object
            );
        }else{
            alert("Confirmation password is not correct!!!")
        }

      }

    return (
        <div className='div_background'>
            <div className='container'>
                <div className="div-menu-icon">
                    <FaRegListAlt className="div-menu-icon2" onClick={onClickMenu} />
                    { showResults ? <Menu state={user} /> : null }               
                </div>
                <div className='div_header_distrac'>
                    <h2>Change your password</h2>
                </div>
                <div className='div_body'>
                    <div className='div_format'>
                        <p>Name:</p>
                        <input type="text" name="name" value={name} disabled></input>
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
          
        </div>  
    ); 
}

export default UpdatePassword;