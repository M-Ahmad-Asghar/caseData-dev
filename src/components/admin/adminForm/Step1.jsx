import React, { useEffect } from "react";
import { useFormik } from "formik";
import style from "./step1.module.css";
import * as Yup from "yup";
import stateSelected from "../StateList";

const Step1 = ({ onNextClick, setErr }) => {
  const formik = useFormik({
    initialValues: {
      caseNumber: "",
      name: "",
      decedentAddress: "",
      city: "",
      state: "",
      zip: "",
      petitioner: "",
    },
    validationSchema: Yup.object({
      caseNumber: Yup.string().required("Case number is required"),
      name: Yup.string().required("Name is required"),
      decedentAddress: Yup.string().required("Decedent Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string().required("Zip is required"),
      petitioner: Yup.string().required("Petitioner is required"),
    }),
    // onSubmit: (values) => {
    //   onNextClick(values);
    // },
  });
  const { submitForm, values, errors } = formik;
  useEffect(() => {
    if (
      values.caseNumber.length < 1 &&
      values.name.length < 1 &&
      values.decedentAddress.length < 1 &&
      values.city.length < 1 &&
      values.state.length < 1 &&
      values.zip.length < 1 &&
      values.petitioner.length < 1
    ) {
      setErr(1);
    } else {
      setErr(Object.keys(errors).length);
    }
    onNextClick(values, submitForm);
  }, [values, errors]);

  return (
    <div>
      <form className={style.form} onSubmit={formik.handleSubmit}>
        <div className={style.fieldCont}>
          <label className={style.label}>Case Number</label>
          <input
            className={style.input}
            id="caseNumber"
            name="caseNumber"
            placeholder="Enter Case Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.caseNumber}
          />
          <div
            style={{
              opacity:
                formik.touched.caseNumber && formik.errors.caseNumber ? "1" : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.caseNumber}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Name</label>
          <input
            className={style.input}
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <div
            style={{
              opacity: formik.touched.name && formik.errors.name ? "1" : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.name}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Decedent Address</label>
          <input
            className={style.input}
            id="decedentAddress"
            name="decedentAddress"
            type="text"
            placeholder="Enter Decedent Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.decedentAddress}
          />
          <div
            style={{
              opacity:
                formik.touched.decedentAddress && formik.errors.decedentAddress
                  ? "1"
                  : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.decedentAddress}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>City</label>
          <input
            className={style.input}
            id="city"
            name="city"
            type="text"
            placeholder="Enter City"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
          <div
            style={{
              opacity: formik.touched.city && formik.errors.city ? "1" : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.city}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Select State</label>
          <select
            id="state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
          >
            {stateSelected}
          </select>

          <div
            style={{
              opacity: formik.touched.state && formik.errors.state ? "1" : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.state}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Zip</label>
          <input
            className={style.input}
            id="zip"
            name="zip"
            type="text"
            placeholder="Enter Zip"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.zip}
          />
          <div
            style={{
              opacity: formik.touched.zip && formik.errors.zip ? "1" : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.zip}
          </div>
        </div>
        <div className={style.fieldCont}>
          <label className={style.label}>Petitioner</label>
          <input
            className={style.input}
            id="petitioner"
            name="petitioner"
            placeholder="Enter Petitioner"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.petitioner}
          />
          <div
            style={{
              opacity:
                formik.touched.petitioner && formik.errors.petitioner ? "1" : 0,
            }}
            className={style.errMessage}
          >
            {formik.errors.petitioner}
          </div>
        </div>

        {/* <div className={style.btnContainer}>
        <button type="submit" >
          Submit
        </button>
      </div> */}
      </form>
    </div>
  );
};

export default Step1;
