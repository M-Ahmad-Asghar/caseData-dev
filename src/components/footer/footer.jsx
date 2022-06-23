import React from "react";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footerMain}>
      <p className={style.footerText}>
        © Copyright 2022 CASEDATA - All Rights Reserved
      </p>
    </footer>
  );
};
export default Footer;
