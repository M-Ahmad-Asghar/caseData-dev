import React from "react";
import logo from "../../images/icons/logo.png";
import { NavLink } from "react-router-dom";
// import homeIcon from "../../images/icons/home-icon.png";
// import hisIcon from "../../images/icons/hist-icon.png";
// import profileIcon from "../../images/icons/profile-icon.png";
// import { NavLink } from "react-router-dom";
const adminHeader = () => {
  return (
    <header className="header-bar pt-3">
      <div className="container">
        <div className="row d-flex justify-content-start">
          <div className="col-8">
            <img className="weeder-logo" src={logo} alt="weeder-logo" />
          </div>
        </div>
        <div className="row text-center ">
          <div className="col ">
            {/* <NavLink to="/admin-access">
              <p className="home-page">Home</p>
            </NavLink> */} 
            <a className="home-page" href="/admin-access">Home</a>
          </div>

          <div className="col">
            <NavLink to="/logout">
              <p className="home-page">LogOut</p>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
export default adminHeader;
