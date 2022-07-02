import React from "react";
import "../styles/login.css";
import Global from "../globals";
import { useNavigate } from "react-router-dom";
import driver_image from "../assets/images/login_image.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = React.useState({ value: "" });
  const [password, setPassword] = React.useState({ value: "" });
  const [error, setError] = React.useState({ value: false });
  // console.log(error);

  function changeUserNameValue(e) {
    setUserName(e.target.value);
  }

  function changePasswordValue(e) {
    setPassword(e.target.value);
  }

  async function clickLoginButton() {
    setError(false);

    //request
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    //send to Api
    fetch(Global.api_url + "login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Global.updateAccessToken(data.data["access_token"]);
        navigate("/infor",{state: data.data["user"]})
      })
      .catch(
        (error) => {
          console.log("login error");
          setError(true);
        } // Handle the error response object
      );
  }
  

  return (
    <>
      <div className="div_all">
        <div className="div_login">
          <p>Welcom back</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => changeUserNameValue(e)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => changePasswordValue(e)}
          ></input>
          <div className="div_error">
            {error === true ? <p>*Cannot login</p> : null}
          </div>
          <button onClick={() => clickLoginButton()}>Login</button>
        </div>
        <div className="div_info">
          <p id="title">Predict Driver Status - AI</p>
          <p id='student_info'>Created by: Nguyễn Anh Quốc & Nguyễn Phan Sự</p>
          <img src={driver_image} alt="driver"/>
        </div>
      </div>
      <div></div>
      <div className="div_register">
          <p>You don't have an account?.</p>
          <a href = "/adduser">Register now!</a>
          <a href="/password_reset">Forget Password</a>
      </div>
    </>
  );
}

export default Login;
