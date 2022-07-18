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
    function changeNameValue(e) {
        setName(e.target.value);
    }

    const changeGender = () => setGender(value => !value);
    function changeBirthday(e) {
        setBirthday(e.target.value);
    }
    function changePhoneValue(e) {
        setPhone(e.target.value);
    }
    
    async function clickUpdateButton() {
        const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
        },
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
            alert(data.data["alert"])
            navigate("/infor",{state: data.data["user"]})
        })
        .catch(
            (error) => {console.log(error)
            } // Handle the error response object
        );
      }

    return (
        
        <div className='div_background'>
        <div className='container'>
            <div className="div-menu-icon">
                <FaRegListAlt className="div-menu-icon2" onClick={onClickMenu} />
                { showResults ? <Menu state={data}/> : null }               
            </div>
            <div className='div_header'>
                <h1>Update Information</h1>
            </div>
            <div className='div_body'>
                <div className='div_format'>
                    <p>Name:</p>
                    <input type="text" name="name" placeholder='Name' value={name} onChange={(e) => changeNameValue(e)} required="required"   ></input>
                </div>
                <div className='div_format'>
                    <p>Driver License:</p>
                    {/* disabled */}
                    <input type="text" name= "driver_license" value= {data.driver_license} disabled></input>
                </div>
                <div className='div_format_gender'>
                    <p>Gender:</p>
                    <div className='div_gender'>
                        <input type="radio" id="gender1" name="gender" onChange={changeGender} checked = {gender}></input>
                        <p for="gender1">Male</p>
                        <input type="radio" id="gender2" name="gender" onChange={changeGender} checked = {!gender} ></input>
                        <p for="gender2">Female</p>
                        
                    </div>
                </div>
                <div className='div_format'>
                    <p>Birthday:</p>
                    <input type="date" value={birthday} name= "birthday" onChange={(e) => changeBirthday(e)} required></input>
                </div>
                <div className='div_format'>
                    <p>Phone:</p>
                    <input type="text" name="phone" value={phone} placeholder='Phone' onChange={(e) => changePhoneValue(e)} required></input>
                </div>
                <div className='div_format'>
                    <button className='btn_register' onClick={() => clickUpdateButton()}>Update</button>
                </div>
                
            </div>
        </div> 
        </div>
    ); 
}

export default UpdateUser;