import React from 'react';
import "../styles/add_user.css";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Global from "../globals";
import Menu from '../components/menu'
import { FaRegListAlt } from "react-icons/fa";
function UpdateUser() {
    const navigate = useNavigate();
    const [name, setName] = React.useState();
    const [gender, setGender]= React.useState(true)
    const [birthday, setBirthday] = React.useState(Date);
    const [phone, setPhone] = React.useState();
    var gender_current = '';
    const [showResults, setShowResults] = React.useState(false)
    const onClickMenu = () => setShowResults(true)
    //get user
    const location = useLocation();
    var [data, setData] = React.useState([]);
    
    React.useEffect(() => {
        setData(location.state)
        setName(location.state.name)
        setBirthday(location.state.birthday)
        setGender(location.state.gender)
        setPhone(location.state.phone)
 
    },[]);

    if (data.gender===1){
        gender_current = 'Male';
    }else{
        gender_current = 'Female';
    }
    function changeNameValue(e) {
        setName(e.target.value);
    }

    function changeGender(e) {
        setGender(e.target.value);
    }
    function changeBirthday(e) {
        setBirthday(e.target.value);
    }
    function changePhoneValue(e) {
        setPhone(e.target.value);
    }
    
    async function clickUpdateButton() {
        const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: data.id,
            name: name,
            gender: gender,
            birthday: birthday,
            phone: phone
            }),
        };
        fetch(Global.api_url + "update-user", requestOptions)
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
      }

    return (
        
        
        <div className='container'>
            <div className="div-menu-icon">
                <FaRegListAlt className="div-menu-icon2" onClick={onClickMenu} />
                { showResults ? <Menu state={data}/> : null }               
            </div>
            <div className='div_header'>
                <h2>Update Information</h2>
            </div>
            <div className='div_body'>
                <div className='div_format'>
                    <p>Name:</p>
                    <input type="text" name="name" placeholder='Your name' value={name} onChange={(e) => changeNameValue(e)} required="required"   ></input>
                </div>
                <div className='div_format'>
                    <p>Driver License:</p>
                    {/* disabled */}
                    <input type="text" name= "driver_license" value= {data.driver_license} disabled></input>
                </div>
                <div className='div_format_gender'>
                    <p>Gender:</p>
                    <div className='div_gender'>
                        <input type="radio" id="gender1" name="gender" onChange={(e) => changeGender(e)} checked = {gender_current==='Male'}></input>
                        <p for="gender1">Male</p>
                        <input type="radio" id="gender2" name="gender" onChange={(e) => changeGender(e)} checked = {gender_current==='Female'} ></input>
                        <p for="gender2">Female</p>
                        
                    </div>
                </div>
                <div className='div_format'>
                    <p>Birthday:</p>
                    <input type="date" value={birthday} name= "birthday" onChange={(e) => changeBirthday(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Phone:</p>
                    <input type="text" name="phone" value={phone} placeholder='Your phone' onChange={(e) => changePhoneValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <button className='btn_register' onClick={() => clickUpdateButton()}>Update</button>
                </div>
                
            </div>
        </div> 
            
    ); 
}

export default UpdateUser;