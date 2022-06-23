// import logo from './logo.svg';
import React, { useEffect, memo } from "react";
import "./App.css";
import HeaderBar from "./components/header/header";
import SearchDashboard from "./components/search-dashboard/SearchDashboard";
import {
  Routes,
  Route,
  useNavigate,
  NavLink,
  useLocation,
} from "react-router-dom";
import isLoggedIn from "./components/login/login-status";
import Login from "./components/login/login";
import Footer from "./components/footer/footer";
import Admin from "./components/admin/Admin";

const App = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("loggedIn") === false) {
      navigate("");
    }
  }, []);

  const location = useLocation();

  return (
    <div>
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="/signup" element={<ErrorPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin-access" element={<AdminComponent />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </div>
      {location.pathname === "/" ? <></> : <Footer />}
    </div>
  );
};

const LoginPage = (props) => {
  return <Login />;
};

const SearchPage = () => {
  let data = localStorage.getItem("loggedIn");

  return (
    <>
      <div>
        <HeaderBar />
        <SearchDashboard />
      </div>
    </>
  );
};

const SignUpPage = () => {
  return (
    <>
      <h1>Sign up page </h1>
    </>
  );
};

const AdminComponent = () => {
  return (
    <>
      <HeaderBar />
      <Admin />
    </>
  );
};

const ErrorPage = () => {
  return (
    <section className="p-5">
      <div className="container p-5">
        <div className="row text-center">
          <h2>This Page is Under Construction </h2>
        </div>
      </div>
    </section>
  );
};

const LogOut = () => {
  localStorage.clear();

  return (
    <section className="p-5">
      <div className="container p-5">
        <div className="row text-center">
          <h2>You have successfully logged out!</h2>
          <p>To log back in click below</p>
          <NavLink to="/">
            <p className="home-page">Log Back In</p>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default memo(App);
