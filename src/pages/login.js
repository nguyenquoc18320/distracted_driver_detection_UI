import React from "react";
import "../styles/login.css";
import Global from "../globals";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = React.useState();
  const [password, setPassword] = React.useState();

  function changeUserNameValue(e) {
    setUserName(e.target.value);
  }

  function changePasswordValue(e) {
    setPassword(e.target.value);
  }

  async function clickLoginButton() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch(Global.api_url + "login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Global.updateAccessToken(data.data["access_token"]);
        // <Navigate to="/manage-user" />;
        navigate("/manage-user");
      })
      .catch(
        (error) => console.log(error) // Handle the error response object
      );
  }

  return (
    <>
      <div className="title">
        <h3>AI - Distracted Driver Detection System</h3>
      </div>
      <div className="div_login">
        <p>Login to account</p>
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
        <button onClick={() => clickLoginButton()}>Login</button>
      </div>
    </>
  );
}

export default Login;
