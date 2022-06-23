import React from "react";
import Stepper from "../stepper/Stepper";
import style from "./admin.module.css";
function Admin() {
  return (
    <div className={style.main}>
      <Stepper />
    </div>
  );
}

export default Admin;
