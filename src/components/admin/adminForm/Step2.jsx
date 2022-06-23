import React, { useState, useEffect } from "react";
import style from "./step1.module.css";
import { Calendar } from "react-date-range";

function Step2({ onNextClick, step }) {
  const [date1, setDate1] = useState({ dateFilled: new Date() });
  const [date2, setDate2] = useState({ dateOfDeath: new Date() });

  const year = new Date(date1?.dateFilled).getFullYear();
  const month = new Date(date1?.dateFilled).getMonth();
  const day = new Date(date1?.dateFilled).getDate() + 1;
  const filledDate = new Date(year, month, day);

  const year1 = new Date(date2?.dateOfDeath).getFullYear();
  const month1 = new Date(date2?.dateOfDeath).getMonth();
  const day1 = new Date(date2?.dateOfDeath).getDate() + 1;
  const deathDate = new Date(year1, month1, day1);
  const values = { filledDate, deathDate };

  const onChange1 = (date) => {
    setDate1({ dateFilled: JSON.stringify(date).slice(1, 11) });
    const dateA = { dateFilled: JSON.stringify(date).slice(1, 11) };
    const year = new Date(dateA?.dateFilled).getFullYear();
    const month = new Date(dateA?.dateFilled).getMonth();
    const day = new Date(dateA?.dateFilled).getDate() + 1;
    const newFilledDate = new Date(year, month, day);
    onNextClick({
      filledDate: newFilledDate || new Date(),
      newDeathDate: deathDate || new Date(),
    });
  };

  const onChange2 = (date) => {
    setDate2({ dateOfDeath: JSON.stringify(date).slice(1, 11) });
    const dateB = { dateOfDeath: JSON.stringify(date).slice(1, 11) };
    const year = new Date(dateB?.dateOfDeath).getFullYear();
    const month = new Date(dateB?.dateOfDeath).getMonth();
    const day = new Date(dateB?.dateOfDeath).getDate() + 1;
    const newDeathDate = new Date(year, month, day);
    onNextClick({
      filledDate: filledDate,
      newDeathDate: newDeathDate,
    });
  };
  return (
    <div className={style.step2Main}>
      <div className={style.calendarsCont}>
        <div className={style.calenderLeft}>
          <h4 className={style.dateHeading}>
            <p> Date Filed</p>
            {`${year}-${month + 1}-${day}`}
          </h4>
          <Calendar date={filledDate} onChange={onChange1} />
        </div>
        <div className={style.calenderRight}>
          <h4 className={style.dateHeading}>
            <p> Date of Death</p>
            {`${year1}-${month1 + 1}-${day1}`}
          </h4>
          <Calendar date={deathDate} onChange={onChange2} />
        </div>
      </div>
    </div>
  );
}

export default Step2;
