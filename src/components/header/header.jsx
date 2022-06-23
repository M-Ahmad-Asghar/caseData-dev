import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../images/icons/logo.png";
import Home from "../../../src/images/icons/home.png";
import User from "../../../src/images/icons/user1.png";
import Arrow from "../../../src/images/icons/arrow.png";
import Logout from "../../../src/images/icons/logout.png";
import AddEntry from "../../../src/images/icons/addEntry.png";
import { Modal } from "react-bootstrap";

const HeaderBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();
  const userUnParsed = localStorage.getItem("user");
  const user = JSON.parse(userUnParsed)?.data[0];
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const renderHomeButton = () => {
    const user = localStorage.getItem("user");
    let role = "user";
    if (user) {
      role = JSON.parse(user)?.data[0][4] ? "admin" : "user";
    }
    const path = window.location.pathname;
    console.log(path);

    if (path === "/search" && role === "admin") {
      return (
        <span className="tab">
          <a
            style={{ textDecoration: "none", color: "#fff" }}
            href="/admin-access"
          >
            <img className="home-icon" src={AddEntry} alt="add-icon" />
            <span className="home-text"> Add New Entry</span>
          </a>
        </span>
      );
    } else {
      return (
        <span className="tab">
          <a style={{ textDecoration: "none", color: "#fff" }} href="/search">
            <img className="home-icon" src={Home} alt="home-icon" />
            <span className="home-text"> Home</span>
          </a>
        </span>
      );
    }
  };

  return (
    <header className="header-main">
      <div>
        <img className="weeder-logo" src={logo} alt="weeder-logo" />
      </div>
      <div>
        <div className="header-tabs">
          <div>{renderHomeButton()}</div>
          <div className="profile-container">
            <div>
              <img className="profile-icon" src={User} alt="profile-icon" />
            </div>
            <div className="profile-text">
              <span className="profile-name">
                {user?.[1] || "Swati Mazumder"}
              </span>
              <span className="profile-name-2"> {user?.[3] || "Client"}</span>
            </div>
            <div>
              <div className="profile-arrow-icon-container">
                <img
                  onClick={() => handleShow()}
                  className="profile-arrow-icon"
                  src={Arrow}
                  alt="home"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal dialogClassName="my-modal" show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="modal-conateiner">
            <img
              className="logout-icon"
              src={Logout}
              alt="home"
              style={{ width: "30px" }}
            />
            <span className="logout-text" onClick={logout}>
              LogOut
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
};
export default HeaderBar;
