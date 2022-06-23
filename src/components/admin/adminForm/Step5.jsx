import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import style from "./step1.module.css";
import * as Yup from "yup";
import stateSelected from "../StateList";
import countryList from "../CountryList";
import edit from "../../../images/icons/edit.png";
import del from "../../../images/icons/delete.png";
import add from "../../../images/icons/add.png";
import { Table } from "react-bootstrap";

function Step5({ onNextClick, setErr }) {
  const [isPopup, setIsPopup] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const deleteData = (id) => {
    setData((prevData) => {
      return prevData.filter((item, index) => index !== id);
    });
    const nData = [...data];
    const filData = nData.filter((item, index) => index !== id);
    onNextClick(filData);
  };
  const editData = (id) => {
    setEditIndex(id);
    setIsEdit(true);

    setIsPopup(true);
  };
  const Popup = () => {
    const onSubmit = () => {
      submitForm();
      if (values.name !== "") {
        setData([...data, values]);
        handleReset();
        setIsPopup(false);
        const nData = [...data, values];
        onNextClick(nData);
      }
    };
    const onEdit = () => {
      submitForm();
      if (values.name !== "") {
        const newData = [...data];
        newData[editIndex].name = values.name;
        newData[editIndex].address = values.address;
        newData[editIndex].city = values.city;
        newData[editIndex].state = values.state;
        newData[editIndex].country = values.country;
        newData[editIndex].zip = values.zip;
        setData(newData);
        const nData = [...newData];
        onNextClick(nData);
        handleReset();
        setIsPopup(false);
        setIsEdit(false);
      }
    };
    const formik = useFormik({
      initialValues: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),
        // address: Yup.string().required("Decedent Address is required"),
        // city: Yup.string().required("City is required"),
        // state: Yup.string().required("State is required"),
        // zip: Yup.string().required("Zip is required"),
        // country: Yup.string().required("Country is required"),
      }),
      // onSubmit: (values) => {
      //   onSubmit(values);
      // },
    });
    const { submitForm, values, errors, handleReset } = formik;
    useEffect(() => {
      if (isEdit) {
        formik.setFieldValue("name", data[editIndex].name);
        formik.setFieldValue("address", data[editIndex].address);
        formik.setFieldValue("city", data[editIndex].city);
        formik.setFieldValue("state", data[editIndex].state);
        formik.setFieldValue("zip", data[editIndex].zip);
        formik.setFieldValue("country", data[editIndex].country);
      }
    }, [isEdit]);

    // formik.setFieldValue("name", data[editIndex].name);
    return (
      <div className={style.popupCont}>
        <div className={style.popup}>
          <h1>Add Beneficiar</h1>

          <div>
            <form className={style.form} onSubmit={formik.handleSubmit}>
              <div className={style.fieldCont}>
                <label className={style.label}>Name</label>
                <input
                  className={style.input}
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.name}
                />
                <div
                  style={{
                    opacity:
                      formik.touched.name && formik.errors.name ? "1" : 0,
                  }}
                  className={style.errMessage}
                >
                  {formik.errors.name}
                </div>
              </div>
              <div className={style.fieldCont}>
                <label className={style.label}>Address</label>
                <input
                  className={style.input}
                  id="address"
                  name="address"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.address}
                />
                <div
                  style={{
                    opacity:
                      formik.touched.address && formik.errors.address ? "1" : 0,
                  }}
                  className={style.errMessage}
                >
                  {formik.errors.address}
                </div>
              </div>
              <div className={style.fieldCont}>
                <label className={style.label}>City</label>
                <input
                  className={style.input}
                  id="city"
                  name="city"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.city}
                />
                <div
                  style={{
                    opacity:
                      formik.touched.city && formik.errors.city ? "1" : 0,
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
                  value={values.state}
                >
                  {stateSelected}
                </select>

                <div
                  style={{
                    opacity:
                      formik.touched.state && formik.errors.state ? "1" : 0,
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.zip}
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
                <label className={style.label}>Country</label>
                <select
                  className={style.input}
                  id="country"
                  name="country"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={values.country}
                >
                  {countryList}
                </select>
                <div
                  style={{
                    opacity:
                      formik.touched.petitioner && formik.errors.petitioner
                        ? "1"
                        : 0,
                  }}
                  className={style.errMessage}
                >
                  {formik.errors.petitioner}
                </div>
              </div>

              <div className={style.btnsContainer}>
                <button
                  className={style.addBtn}
                  onClick={isEdit ? onEdit : onSubmit}
                >
                  {isEdit ? "Update" : "Add"}
                </button>
                <button
                  className={style.cancelBtn}
                  onClick={() => setIsPopup(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const showListOfSearchTitles = (
    <thead>
      <tr>
        <th style={{ padding: 20 }} scope="col">
          Name
        </th>
        <th style={{ padding: 20 }} scope="col">
          Address
        </th>
        <th style={{ padding: 20 }} scope="col">
          City
        </th>
        <th style={{ padding: 20 }} scope="col">
          State
        </th>
        <th style={{ padding: 20 }} scope="col">
          Zip
        </th>
        <th style={{ padding: 20 }} scope="col">
          action
        </th>
      </tr>
    </thead>
  );

  console.log("data", data);

  let showrenderList = data.map((data, index) => (
    <tr key={index}>
      <td>{data.name}</td>
      <td>{data.address}</td>
      <td>{data.city}</td>
      <td>{data.state}</td>
      <td>{data.zip}</td>
      <td>
        <div className={style.tableBtns}>
          <img
            className={style.edIcon}
            onClick={() => editData(index)}
            src={edit}
          />
          <img
            className={style.edIcon}
            onClick={() => deleteData(index)}
            src={del}
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      <div
        style={{
          display: isPopup ? "block" : "none",
        }}
      >
        <Popup />
      </div>
      {/* <div className={style.table}>
        <div className={style.tableHeader}>
          <p className={style.tableHeading}>Name</p>
          <p className={style.tableHeading}>Address</p>
          <p className={style.tableHeading}>City</p>
          <p className={style.tableHeading}>State</p>
          <p className={style.tableHeading}>Zip</p>
          <p className={style.tableHeading}>Country</p>
        </div>
        {data.length === 0 && (
          <div
            style={{
              width: "100%",
              height: "40px",
              marginTop: "0px",
            }}
          >
            <p className={style.noBani}>No Beneficiar added</p>
          </div>
        )}
        {data.map((item, index) => (
          <div
            style={{
              backgroundColor: index % 2 === 0 ? "white" : "rgb(237, 237, 237)",
            }}
            key={index}
            className={style.tableRow}
          >
            <p className={style.tableData}>{item?.name}</p>
            <p className={style.tableData}>{item?.address}</p>
            <p className={style.tableData}>{item?.city}</p>
            <p className={style.tableData}>{item?.state}</p>
            <p className={style.tableData}>{item?.zip}</p>
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
              className={style.tableData}
            >
              <p>{item?.country}</p>
              <div>
                <div className={style.tableBtns}>
                  <img
                    className={style.edIcon}
                    onClick={() => editData(index)}
                    src={edit}
                  />
                  <img
                    className={style.edIcon}
                    onClick={() => deleteData(index)}
                    src={del}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <Table responsive className="table p-5">
        {showListOfSearchTitles}
        <tbody>{showrenderList}</tbody>
      </Table>
      {data.length === 0 && (
          <div
            style={{
              width: "100%",
              height: "40px",
              marginTop: "0px",
            }}
          >
            <p className={style.noBani}>No Beneficiar added</p>
          </div>
        )}

      <div className={style.addBanificierContainer}>
        <button
          onClick={() => {
            setIsPopup(true);
            setIsEdit(false);
          }}
          className={style.addBanificier}
        >
          <div className={style.btnIconCont}>
            <img className={style.btnIcon} src={add} />
          </div>
          <p className={style.btnTextMain}> Add Beneficiar</p>
        </button>
      </div>
    </div>
  );
}

export default Step5;
