import React, { useContext, useState } from "react";
import logo from "../../images/icons/small-logo.png";
import mail from "../../images/icons/user.png";
import lock from "../../images/icons/lock.png";
import show from "../../images/icons/show.png";
import checked from "../../images/icons/checked.png";
import hide from "../../images/icons/hide.png";
import ladyWorking from "../../images/icons/login.jpg";
import style from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

// Login Creds
// regular account
// // Client.Test.45678746
// // 45678746!@421563qw

// admin

//  dev_admin
// SyncDev1!3#

function Login() {
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState(false);
  const [passwordVal, setPasswordVal] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(true);
  const [isErr, setIsErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTick, setIsTick] = useState(false);
  let navigate = useNavigate();
  const [message, setMessage] = useState("Invalid username or password");
  const submitHandler = async (e) => {
    if (email !== "" && passwordVal !== "") {
      setIsErr(false);
      setLoading(true);
      e.preventDefault();
      const data = await axios.post(
        `${BASE_URL}/login?username=${email}&password=${passwordVal} `
      );
      localStorage.setItem("user", JSON.stringify(data));

      if (data.data === "Invalid username or password.") {
        setIsErr(true);
        setLoading(false);
      } else if (data.data[0][4] === false) {
        navigate("/search");
        setLoading(false);
      } else if (data.data[0][4] === true) {
        navigate("/admin-access");
        setLoading(false);
      }
    } else {
      setIsErr(true);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.loginContainer}>
        <div>
          <img src={logo} className={style.logo} alt="logo" />
        </div>
        <div className={style.mainContainer}>
          <div className={style.left}>
            <center>
              <img
                className={style.leftImg}
                src={ladyWorking}
                alt="lady-working-icon"
              />
            </center>
          </div>
          <div className={style.right}>
            <h1 className={style.welcomeText}>{"Welcome Back!"}</h1>
            <p className={style.loginDesc}>
              To keep connecting with us, please login with your personal
              information by username and password &nbsp;🔔
            </p>
            <div className={style.form}>
              <div
                style={{
                  backgroundColor: emailFocus
                    ? "white"
                    : "rgba(39, 60, 93, 0.061)",
                  transition: "ease-in-out .3s",
                }}
                className={style.emailContainer}
              >
                <div className={style.iconContainer}>
                  <img className={style.icon} src={mail} alt="mail" />
                </div>
                <div className={style.inputField}>
                  <input
                    className={style.input}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => {
                      setEmailFocus(false);
                      email.length > 5 && setIsTick(true);
                      email.length < 5 && setIsTick(false);
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsErr(false);
                      email.length < 5 && setIsTick(false);
                      email.length > 5 && setIsTick(true);
                    }}
                    value={email}
                    type="text"
                    id="email"
                    required
                  />
                  <label className={style.label} for="email">
                    Username
                  </label>
                </div>
                <div className={style.endIconContainer}>
                  <img
                    style={{
                      opacity: isTick ? 1 : 0,
                    }}
                    className={style.CheckIcon}
                    src={checked}
                    alt="mail"
                  />
                </div>
              </div>
              <div
                style={{
                  backgroundColor: password
                    ? "white"
                    : "rgba(39, 60, 93, 0.061)",
                  transition: "ease-in-out .3s",
                }}
                className={style.passwordContainer}
              >
                <div className={style.iconContainer}>
                  <img className={style.icon} src={lock} alt="password" />
                </div>
                <div className={style.inputField}>
                  <input
                    className={style.input}
                    onChange={(e) => {
                      setPasswordVal(e.target.value);
                      setIsErr(false);
                    }}
                    value={passwordVal}
                    onFocus={() => setPassword(true)}
                    onBlur={() => setPassword(false)}
                    type={type ? "password" : "text"}
                    id="password"
                    required
                  />
                  <label className={style.label} for="password">
                    Password
                  </label>
                </div>
                <div className={style.endIconContainer}>
                  <img
                    onClick={() => setType(!type)}
                    className={style.eyeIcon}
                    src={type ? show : hide}
                    alt="password"
                  />
                </div>
              </div>
            </div>
            <div className={style.errMessageCont}>
              <p
                style={{
                  opacity: isErr ? 1 : 0,
                }}
                className={style.errMessage}
              >
                {email === ""
                  ? "Username is required!"
                  : passwordVal === ""
                  ? "Password is required!"
                  : "Invalid username or password"}
              </p>
            </div>
            <div className={style.btndiv}>
              <div
                onClick={submitHandler}
                className={loading ? style.loginBtnLoad : style.loginBtn}
              >
                {loading ? <div className={style.loader}></div> : "Login Now"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
