import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import style from "./step1.module.css";
import * as Yup from "yup";
import courtHouseList from "../CourtHouseList";
function Step3({ onNextClick, setFileAdd, fileAdd }) {
  const [file, setFile] = useState({});
  // s3 config

  const onUpload = async (e) => {};
  const dateStr = "2022-07-21T09:35:31.820Z";
  const date1 = new Date(dateStr);

  const result = new Date(date1.toISOString().slice(0, -1));

  const [fileHover, setFileHover] = useState(false);
  const [active, setActive] = useState(false);
  const baniList = [
    {
      beneficiaryName: "beneficiaryName",
      relation: "",
      beneficiaryAddress: "beneficiaryAddress",
      beneficiaryCity: "dasbeneficiaryCityd",
      beneficiaryState: "beneficiaryState",
      beneficiaryZip: "new",
      beneficiaryCountry: "beneficiaryCountry",
    },
  ];
  const data = {
    case_number: 181,
    decedent_name: "decedent_name",
    decedent_address: "decedent_address",
    decedent_city: "decedent_city",
    decedent_state: "decedent_state",
    decedent_zip: "decedent_zip",
    date_filed: "2021-11-04 08:30:00",
    date_of_death: "2021-11-04 08:30:00",
    petitioner: "petitioner",
    net_property_value: 65543163,
    attorney_name: "attorney_name",
    attorney_address: "attorney_address",
    attorney_city: "attorney_city",
    attorney_state: "attorney_state",
    attorney_zip: "attorney_zip",
    personal_property: 632,
    intestate: false,
    court_house: "Pasadena Courthouse",
    beneficiaryList: baniList,
    pdfFile: "link",
  };
  var date = new Date("2021-12-30 10:30:00");
  // remove timezone from date

  const onClick = async () => {
    const res = await fetch(
      `https://e1b9-39-62-56-179.ap.ngrok.io/admin/adddata `,

      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  };

  const onClick2 = async () => {
    const start = "2021-12-30";
    const end = "2021-12-30";
    const res = await fetch(
      `https://e1b9-39-62-56-179.ap.ngrok.io/search?name=decedent_name`,
      {
        method: "GET",
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      propertyValue: "",
      courtHouseName: "",
      pdf: "",
      personalProperty: "",
      intestate: false,
    },
    validationSchema: Yup.object({
      propertyValue: Yup.string().required("Property value is required"),
      courtHouseName: Yup.string().required("Court house name is required"),
      personalProperty: Yup.string().required("Personal Property is required"),
      pdf: Yup.string().required("Pdf is required"),
    }),
    // onSubmit: (values) => {
    //   onNextClick(values);
    // },
  });
  const { submitForm, values, errors } = formik;
  var filename = values.pdf.replace(/^.*[\\\/]/, "") || "Select a file";
  filename = filename !== "Select a file" && fileHover ? "Replace " : filename;
  useEffect(() => {
    // if (
    //   values.propertyValue.length < 1 &&
    //   values.courtHouseName.length < 1 &&
    //   values.pdf.length < 1 &&
    //   values.personalProperty.length < 1
    // ) {
    //   setErr(1);
    // } else {
    //   setErr(Object.keys(errors).length);
    // }
    values.intestate = active;
    onNextClick({ values: values, submitForm });
  }, [values, active]);
  const onRemove = () => {
    formik.setFieldValue("pdf");
  };
  // upload file to s3

  return (
    <div>
      <div>
        {/* <input
          type={"file"}
          onChange={(e) => setFile(e.target.files[0])}
          accept="application/pdf"
        /> */}
        <form className={style.form} onSubmit={formik.handleSubmit}>
          <div className={style.fieldCont}>
            <label className={style.label}>Property Value</label>
            <input
              className={style.input}
              placeholder="Property Value"
              id="propertyValue"
              name="propertyValue"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.propertyValue}
            />
            <div
              style={{
                opacity:
                  formik.touched.propertyValue && formik.errors.propertyValue
                    ? "1"
                    : 0,
              }}
              className={style.errMessage}
            >
              {formik.errors.propertyValue}
            </div>
          </div>
          <div className={style.fieldCont}>
            <label className={style.label}>Court House Name</label>
            <select
              placeholder="Court House Name"
              className={style.input}
              id="courtHouseName"
              name="courtHouseName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.courtHouseName}
            >
              <option value="">-</option>
              {courtHouseList.map((courtHouse) => (
                <option key={courtHouse} value={courtHouse}>
                  {courtHouse}
                </option>
              ))}
            </select>

            <div
              style={{
                opacity:
                  formik.touched.courtHouseName && formik.errors.courtHouseName
                    ? "1"
                    : 0,
              }}
              className={style.errMessage}
            >
              {formik.errors.courtHouseName}
            </div>
          </div>
          <div className={style.fieldCont}>
            <label className={style.label}>Upload Pdf</label>
            <label
              htmlFor="pdf"
              onMouseEnter={() => setFileHover(true)}
              onMouseLeave={() => setFileHover(false)}
              className={style.fileLabel}
            >
              {fileAdd?.name || "Select File"}
            </label>
            <input
              style={{
                display: "none",
              }}
              className={style.input}
              id="pdf"
              name="pdf"
              accept="application/pdf"
              type="file"
              onChange={(e) => {
                setFileAdd(e.target.files[0]);
              }}
              // onBlur={formik.handleBlur}
              // value={file}
            />
            <div
              style={{
                opacity: formik.touched.pdf && formik.errors.pdf ? "1" : 0,
              }}
              className={style.errMessage}
            >
              {formik.errors.pdf}
            </div>
          </div>
          <div className={style.fieldCont}>
            <label className={style.label}>Personal Property</label>
            <input
              placeholder="Personal Property"
              className={style.input}
              id="personalProperty"
              name="personalProperty"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.personalProperty}
            />
            <div
              style={{
                opacity:
                  formik.touched.personalProperty &&
                  formik.errors.personalProperty
                    ? "1"
                    : 0,
              }}
              className={style.errMessage}
            >
              {formik.errors.personalProperty}
            </div>
          </div>
          <div className={style.fieldCont}>
            <label className={style.label}>Intestate Yes or No?</label>
            <div
              onClick={() => setActive(!active)}
              className={active ? style.toggleActive : style.toggle}
            >
              <div className={active ? style.circleActive : style.circle}></div>
            </div>
          </div>
        </form>
      </div>
      <div className={style.btnContainer}>
        {/* <button onClick={onUpload}>Upload</button> */}
        {/* <button onClick={onClick}>submit</button> */}
      </div>
    </div>
  );
}

export default Step3;
