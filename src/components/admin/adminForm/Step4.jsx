import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import style from "./step1.module.css";
import * as Yup from "yup";
import stateSelected from "../StateList";

function Step4({ onNextClick, setErr }) {
  const formik = useFormik({
    initialValues: {
      attorneyName: "",
      attorneyAddress: "",
      attorneyCity: "",
      attorneyState: "",
      attorneyZip: "",
    },
    validationSchema: Yup.object({
      attorneyName: Yup.string().required("Attorney Name is required"),
      attorneyAddress: Yup.string().required("Attorney Address is required"),
      attorneyCity: Yup.string().required("Attorney City is required"),
      attorneyState: Yup.string().required("Attorney  is required"),
      attorneyZip: Yup.string().required("Attorney Zip is required"),
    }),
    // onSubmit: (values) => {
    //   onNextClick(values);
    // },
  });

  const { submitForm, values, errors } = formik;
  useEffect(() => {
    if (
      values.attorneyName.length < 1 &&
      values.attorneyAddress.length < 1 &&
      values.attorneyCity.length < 1 &&
      values.attorneyState.length < 1 &&
      values.attorneyZip.length < 1
    ) {
      setErr(1);
    } else {
      setErr(Object.keys(errors).length);
    }
    onNextClick(values);
  }, [values, errors]);

  return (
    <div>
      <form className={style.form} onSubmit={formik.handleSubmit}>
        <div className={style.fieldCont}>
          <label className={style.label}>Attorney Name</label>
          <input
            className={style.input}
            placeholder='Attorney Name'
            id="attorneyName"
            name="attorneyName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.attorneyName}
          />
          <div
            style={{
              opacity:
                formik.touched.attorneyName && formik.errors.attorneyName
                  ? "1"
                  : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.attorneyName}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Attorney Address</label>
          <input
            className={style.input}
            placeholder='Attorney Address'
            id="attorneyAddress"
            name="attorneyAddress"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.attorneyAddress}
          />
          <div
            style={{
              opacity:
                formik.touched.attorneyAddress && formik.errors.attorneyAddress
                  ? "1"
                  : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.attorneyAddress}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Attorney City</label>
          <input
            className={style.input}
            placeholder='Attorney City'
            id="attorneyCity"
            name="attorneyCity"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.attorneyCity}
          />
          <div
            style={{
              opacity:
                formik.touched.attorneyCity && formik.errors.attorneyCity
                  ? "1"
                  : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.attorneyCity}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Attorney State</label>
          <select
            className={style.input}
            id="attorneyState"
            name="attorneyState"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.attorneyState}
          >
            {stateSelected}
          </select>
          <div
            style={{
              opacity:
                formik.touched.attorneyState && formik.errors.attorneyState
                  ? "1"
                  : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.attorneyState}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Attorney Zip</label>
          <input
            className={style.input}
            placeholder='Attorney Zip'
            id="attorneyZip"
            name="attorneyZip"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.attorneyZip}
          />
          <div
            style={{
              opacity:
                formik.touched.attorneyZip && formik.errors.attorneyZip
                  ? "1"
                  : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.attorneyZip}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Step4;
