import React, { useState } from "react";
import { BASE_URL, myBucket, S3_BUCKET } from "../../config";
import tick from "../../images/icons/check.png";
import Step1 from "../admin/adminForm/Step1";
import Step2 from "../admin/adminForm/Step2";
import Step3 from "../admin/adminForm/Step3";
import Step4 from "../admin/adminForm/Step4";
import Step5 from "../admin/adminForm/Step5";
import style from "./stepper.module.css";

function Stepper() {
  const [laoding, setLaoding] = useState(false);
  const [isSuccuess, setIsSuccuess] = useState(false);
  const [fileAdd, setFileAdd] = useState(null);
  const [step1Fun, setStep1Fun] = useState({});
  const [step2Fun, setStep2Fun] = useState({
    values: { filledDate: new Date(), deathDate: new Date() },
  });
  const [step1Errs, setStep1Errs] = useState(1);
  const [step3Fun, setStep3Fun] = useState({});
  const [step3Errs, setStep3Errs] = useState(1);
  const [step4Fun, setStep4Fun] = useState({});
  const [step4Errs, setStep4Errs] = useState(1);
  const [step5Fun, setStep5Fun] = useState({});
  const [step5Errs, setStep5Errs] = useState(1);
  const [uploadArr, setUploadArr] = useState([]);

  const onFinalSubmit = async () => {
    const step1Values = step1Fun?.values;
    const step2Values = step2Fun?.values;
    const step3Values = step3Fun?.values?.values;
    const step4Values = step4Fun?.values;
    const step5Values = step5Fun?.values;

    const allData = {
      // add step1 values to allData
      case_number: step1Values?.caseNumber,
      decedent_city: step1Values?.city,
      decedent_address: step1Values?.decedentAddress,
      decedent_name: step1Values?.name,
      petitioner: step1Values?.petitioner,
      decedent_state: step1Values?.state,
      decedent_zip: step1Values?.zip,
      // add step2 values to allData
      date_filed: step2Values?.filledDate,
      date_of_death: step2Values?.newDeathDate,
      // add step3 values to allData
      court_house: step3Values?.courtHouseName,
      intestate: step3Values?.intestate,
      personal_property: step3Values?.personalProperty,
      net_property_value: step3Values?.propertyValue,
      // add step4 values to allData
      attorney_address: step4Values?.attorneyAddress,
      attorney_city: step4Values?.attorneyCity,
      attorney_name: step4Values?.attorneyName,
      attorney_state: step4Values?.attorneyState,
      attorney_zip: step4Values?.attorneyZip,
    };

    // missing keys
    // court_house
    // intestate
    // net_property_value
    // personal_property

    // add step4 values to allData
    //  allData.attorney_address = step4Values?.attorneyAddress;
    const banData = [];
    step5Values?.map((item) => {
      banData.push({
        beneficiaryName: item.name,
        // relation: ,
        beneficiaryAddress: item.address,
        beneficiaryCity: item.city,
        beneficiaryState: item.state,
        beneficiaryZip: item.zip,
        beneficiaryCountry: item.country,
      });
    });

    allData.beneficiaryList = banData;

    setLaoding(true);
    try {
      if (fileAdd) {
        const params = {
          ACL: "public-read",
          Body: fileAdd,
          Bucket: S3_BUCKET,
          Key: `${fileAdd.name}`,
        };

        const res = myBucket.upload(params).promise();
        const data = await res;
        allData.pdfFile = data.Location;
        console.log("allData", allData);
      }

      const res = await fetch(
        `${BASE_URL}/admin/adddata `,

        {
          method: "POST",
          body: JSON.stringify(allData),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = res.body;

      setIsSuccuess(true);
    } catch (error) {
      console.log("error", error);
      alert(JSON.stringify(error));
      setLaoding(false);
    } finally {
      setLaoding(false);
    }
  };
  const onStep1Click = (values, submitForm) => {
    setStep1Fun({ submitForm, values });
  };
  const onStep2Click = (values) => {
    setStep2Fun({ values });
  };

  const onStep3Click = (values, b, onUpload) => {
    setStep3Fun({ values });
    // upload = onUpload;
  };
  const onStep4Click = (values) => {
    setStep4Fun({ values });
  };
  const onStep5Click = (values) => {
    setStep5Fun({ values });
  };
  const [step, setStep] = useState(1);
  const onNextClick = () => {
    const submit = step1Fun.submitForm;
    const dates = step2Fun.values;
    submit();
    if (step1Errs === 0) {
      if (step < 6) {
        setStep(step + 1);
      } else {
        setStep(6);
      }
    }
  };
  const onPrevClick = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setStep(1);
    }
  };
  const title =
    step === 1
      ? "Basic"
      : step === 2
      ? "Dates"
      : step === 3
      ? "Property"
      : step === 4
      ? "Attorney"
      : step === 5
      ? "Beneficiar "
      : "Step 6";
  return (
    <div className={style.main}>
      {isSuccuess ? (
        <div className={style.succContainer}>
          <h3 className={style.succMessHead}>Successfully Submitted!</h3>
          <div onClick={() => setIsSuccuess(false)} className={style.addOne}>
            Add another
          </div>
        </div>
      ) : (
        <div>
          <div className={style.content}>
            <div className={style.left}>
              <div className={style.leftContent}>
                <div className={style.contentLeft}>
                  <div className={style.step}>
                    <p className={style.stepTitle}>Basic</p>
                    <p className={style.stepDesc}>Basic Information </p>
                  </div>
                  <div className={style.step}>
                    <p className={style.stepTitle}>Dates</p>
                    <p className={style.stepDesc}>Date of file and death</p>
                  </div>
                  <div className={style.step}>
                    <p className={style.stepTitle}>Property</p>
                    <p className={style.stepDesc}>Property information</p>
                  </div>
                  <div className={style.step}>
                    <p className={style.stepTitle}>Attorney</p>
                    <p className={style.stepDesc}>Attorney Details</p>
                  </div>
                  <div className={style.step}>
                    <p className={style.stepTitle}>Beneficiar</p>
                    <p className={style.stepDesc}>Add beneficiar</p>
                  </div>
                </div>
              </div>
              <div className={style.rightContent}>
                <div className={style.stepIcon}>
                  <div
                    style={{
                      borderColor: "#0000ff",
                      backgroundColor: step >= 1 ? "#0000ff" : "white",
                      color: "white",
                    }}
                    className={style.round}
                  >
                    {step > 1 ? (
                      <img
                        style={{
                          filter:
                            step === 2 || 3 || 4 || 5
                              ? "brightness(0) invert(1)"
                              : "none",
                        }}
                        className={style.tick}
                        src={tick}
                        alt="tick"
                      />
                    ) : (
                      "1"
                    )}
                  </div>
                  <div className={style.dot}></div>
                </div>
                <div className={style.stepIcon}>
                  <div
                    style={{
                      borderColor: "#0000ff",
                      backgroundColor: step >= 2 ? "#0000ff" : "white",
                      color: step === 2 ? "white" : "black",
                    }}
                    className={style.round}
                  >
                    {step > 2 ? (
                      <img
                        style={{
                          filter:
                            step === 2 || 3 || 4 || 5
                              ? "brightness(0) invert(1)"
                              : "none",
                        }}
                        className={style.tick}
                        src={tick}
                        alt="tick"
                      />
                    ) : (
                      "2"
                    )}
                  </div>
                  <div className={style.dot}></div>
                </div>
                <div className={style.stepIcon}>
                  <div
                    style={{
                      borderColor: "#0000ff",
                      backgroundColor: step >= 3 ? "#0000ff" : "white",
                      color: step === 3 ? "white" : "black",
                    }}
                    className={style.round}
                  >
                    {step > 3 ? (
                      <img
                        style={{
                          filter:
                            step === 2 || 3 || 4 || 5
                              ? "brightness(0) invert(1)"
                              : "none",
                        }}
                        className={style.tick}
                        src={tick}
                        alt="tick"
                      />
                    ) : (
                      "3"
                    )}
                  </div>
                  <div className={style.dot}></div>
                </div>
                <div className={style.stepIcon}>
                  <div
                    style={{
                      borderColor: "#0000ff",
                      backgroundColor: step >= 4 ? "#0000ff" : "white",
                      color: step === 4 ? "white" : "black",
                    }}
                    className={style.round}
                  >
                    {step > 4 ? (
                      <img
                        style={{
                          filter:
                            step === 2 || 3 || 4 || 5
                              ? "brightness(0) invert(1)"
                              : "none",
                        }}
                        className={style.tick}
                        src={tick}
                        alt="tick"
                      />
                    ) : (
                      "4"
                    )}
                  </div>
                  <div className={style.dot}></div>
                </div>
                <div className={style.stepIcon}>
                  <div
                    style={{
                      borderColor: "#0000ff",
                      backgroundColor: step >= 5 ? "#0000ff" : "white",
                      color: step === 5 ? "white" : "black",
                    }}
                    className={style.round}
                  >
                    {step > 5 ? (
                      <img
                        style={{
                          filter:
                            step === 2 || 3 || 4 || 5
                              ? "brightness(0) invert(1)"
                              : "none",
                        }}
                        className={style.tick}
                        src={tick}
                        alt="tick"
                      />
                    ) : (
                      "5"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <div> */}
            <div
              style={{
                backgroundColor: "#fff",
                // marginTop: "50px",
                boxShadow: "0 -0px 20px 0 rgb(28 9 80 / 15%)",
                borderRadius: "8px",
              }}
              className={style.right}
            >
              <h1
                style={{
                  textAlign: step === 5 ? "left" : "center",
                  marginLeft: step === 5 ? "0px" : "-40px",
                }}
                className={style.title}
              >
                {title}
              </h1>
              <div className={style.formContainer}>
                <div
                  style={{
                    opacity: step === 1 ? 1 : 0,
                    display: step === 1 ? "block" : "none",
                  }}
                >
                  <Step1 setErr={setStep1Errs} onNextClick={onStep1Click} />
                </div>
                <div
                  style={{
                    opacity: step === 2 ? 1 : 0,
                    display: step === 2 ? "block" : "none",
                  }}
                >
                  <Step2 step={step} onNextClick={onStep2Click} />
                </div>
                <div
                  style={{
                    opacity: step === 3 ? 1 : 0,
                    display: step === 3 ? "block" : "none",
                  }}
                >
                  <Step3
                    fileAdd={fileAdd}
                    onNextClick={onStep3Click}
                    setFileAdd={setFileAdd}
                  />
                </div>
                <div
                  style={{
                    opacity: step === 4 ? 1 : 0,
                    display: step === 4 ? "block" : "none",
                  }}
                >
                  <Step4 onNextClick={onStep4Click} setErr={setStep1Errs} />
                </div>
                <div
                  style={{
                    opacity: step === 5 ? 1 : 0,
                    display: step === 5 ? "block" : "none",
                  }}
                >
                  <Step5 onNextClick={onStep5Click} />
                </div>
              </div>
            </div>

            {/* </div> */}
          </div>
          <div className={style.nextPrev}>
            <p
              onClick={onPrevClick}
              style={{
                cursor: step === 1 ? "auto" : "pointer",
                color: step > 1 ? "#0000ff" : "gray",
              }}
              className={style.prevClick}
            >
              Prev
            </p>
            <p className={style.verDiv}></p>
            <p
              onClick={step === 5 ? onFinalSubmit : onNextClick}
              className={style.nextClick}
            >
              {step === 5 && !laoding ? (
                "Submit"
              ) : laoding ? (
                <div className={style.loader}></div>
              ) : (
                " Next"
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stepper;
