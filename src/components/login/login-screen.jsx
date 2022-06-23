// import logo from './logo.svg';
import React, { useState } from "react";
import "./login.css";
import ladyWorking from "../../images/icons/lady-working.png";
import logo from "../../images/icons/logo.png";
import { useNavigate } from "react-router-dom";
// import ApiCall from "../api/apiCall";
// import isLoggedIn from "./login-status";
import axios from "axios";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messsage, setMessage] = useState(false);
  let navigate = useNavigate();

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      `https://e1b9-39-62-56-179.ap.ngrok.io/login?username=${email}&password=${password} `
    );
    console.log(data);
    if (data.data === "Invalid username or password.") {
      setMessage(true);
    } else if (data.data[0][4] === false) {
      navigate("/search");
    } else if (data.data[0][4] === true) {
      navigate("/admin-access");
    }
  };
  // regular account
  // // Client.Test.45678746
  // // 45678746!@421563qw

  // admin

  //  dev_admin
  // SyncDev1!3#

  return (
    <>
      <div className="login-screen">
        <br />
        <br />
        <br />
        <br />
        <div className=" login-white-container ">
          <div className="row justify-content-between align-items-end">
            <div className="col-4">
              <img className="login-logo-icon" src={logo} alt="weeder logo" />
            </div>
            {/*  <div className="col-2">
              <p className='grey-letters'>New User <NavLink to="/signup" className='sign-up'> Sign Up</NavLink></p>
          </div>  */}
          </div>
          <div className="row">
            <div className="col-6">
              <img
                className="lady-working-icon"
                src={ladyWorking}
                alt="lady-working-icon"
              />
            </div>
            <div className="col-6">
              <h1 className="welcome-b-text">Welcome Back!</h1>
              <p className="grey-letters">Login to continue</p>

              <form>
                <div className="mb-3">
                  <input
                    onFocus={() => setMessage(false)}
                    autoComplete="on"
                    value={email}
                    onChange={onChangeEmail}
                    type="email"
                    className="input-field "
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-3">
                  <input
                    onFocus={() => setMessage(false)}
                    autoComplete="on"
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                    className="input-field "
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <div className={"err-container"}>
                  <p
                    style={{
                      opacity: messsage ? 1 : 0,
                      transition: "ease-in-out .3s",
                    }}
                    className={` text-center red err-text`}
                  >
                    {"Invalid username or password."}
                  </p>
                </div>
                <div className="row justify-content-between pt-2">
                  <div className="col">
                    <button
                      isloggedin={props.isloggedin}
                      onClick={submitHandler}
                      className="login-btn"
                    >
                      LOGIN
                    </button>
                  </div>
                  {/* <div className="col">
                <p>Forgot Password?</p>
                </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginScreen;
