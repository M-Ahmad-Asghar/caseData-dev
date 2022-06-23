import React, { useState } from "react";
import tick from "../../images/icons/check.png";
import Step1 from "../admin/adminForm/Step1";
import Step2 from "../admin/adminForm/Step2";
import Step3 from "../admin/adminForm/Step3";
import Step4 from "../admin/adminForm/Step4";
import Step5 from "../admin/adminForm/Step5";
import style from "./stepper.module.css";
function Stepper() {
  const [step1Fun, setStep1Fun] = useState({});
  const [step2Fun, setStep2Fun] = useState({});
  const [step1Errs, setStep1Errs] = useState(1);
  const [step3Fun, setStep3Fun] = useState({});
  const [step3Errs, setStep3Errs] = useState(1);
  const [step4Fun, setStep4Fun] = useState({});
  const [step4Errs, setStep4Errs] = useState(1);
  const [step5Fun, setStep5Fun] = useState({});
  const [step5Errs, setStep5Errs] = useState(1);

  const onStep1Click = (values, submitForm) => {
    setStep1Fun({ submitForm, values });
  };
  const onStep2Click = (values) => {
    setStep2Fun({ values });
  };
  const onStep3Click = (values) => {
    setStep3Fun({ values });
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
      ? "Beneficiar"
      : "Step 6";
  return (
    <div className={style.main}>
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
                  borderColor: step > 1 ? "green" : "#0000ff",
                  backgroundColor: step === 1 ? "#0000ff" : "white",
                  color: step === 1 ? "white" : "black",
                }}
                className={style.round}
              >
                {step > 1 ? (
                  <img className={style.tick} src={tick} alt="tick" />
                ) : (
                  "1"
                )}
              </div>
              <div className={style.dot}></div>
            </div>
            <div className={style.stepIcon}>
              <div
                style={{
                  borderColor: step > 2 ? "green" : "#0000ff",
                  backgroundColor: step === 2 ? "#0000ff" : "white",
                  color: step === 2 ? "white" : "black",
                }}
                className={style.round}
              >
                {step > 2 ? (
                  <img className={style.tick} src={tick} alt="tick" />
                ) : (
                  "2"
                )}
              </div>
              <div className={style.dot}></div>
            </div>
            <div className={style.stepIcon}>
              <div
                style={{
                  borderColor: step > 3 ? "green" : "#0000ff",
                  backgroundColor: step === 3 ? "#0000ff" : "white",
                  color: step === 3 ? "white" : "black",
                }}
                className={style.round}
              >
                {step > 3 ? (
                  <img className={style.tick} src={tick} alt="tick" />
                ) : (
                  "3"
                )}
              </div>
              <div className={style.dot}></div>
            </div>
            <div className={style.stepIcon}>
              <div
                style={{
                  borderColor: step > 4 ? "green" : "#0000ff",
                  backgroundColor: step === 4 ? "#0000ff" : "white",
                  color: step === 4 ? "white" : "black",
                }}
                className={style.round}
              >
                {step > 4 ? (
                  <img className={style.tick} src={tick} alt="tick" />
                ) : (
                  "4"
                )}
              </div>
              <div className={style.dot}></div>
            </div>
            <div className={style.stepIcon}>
              <div
                style={{
                  borderColor: step > 5 ? "green" : "#0000ff",
                  backgroundColor: step === 5 ? "#0000ff" : "white",
                  color: step === 5 ? "white" : "black",
                }}
                className={style.round}
              >
                {step > 5 ? (
                  <img className={style.tick} src={tick} alt="tick" />
                ) : (
                  "5"
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <h1 className={style.title}>{title}</h1>
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
              <Step2 onNextClick={onStep2Click} />
            </div>
            <div
              style={{
                opacity: step === 3 ? 1 : 0,
                display: step === 3 ? "block" : "none",
              }}
            >
              <Step3 onNextClick={onStep3Click} setErr={setStep3Errs} />
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
      </div>
      <div className={style.nextPrev}>
        <p
          onClick={onPrevClick}
          style={{
            cursor: step === 1 ? "auto" : "pointer",
          }}
          className={style.prevClick}
        >
          Prev
        </p>
        <p className={style.verDiv}></p>
        <p onClick={onNextClick} className={style.nextClick}>
          {step === 6 ? "Submit" : " Next"}
        </p>
      </div>
    </div>
  );
}

export default Stepper;
