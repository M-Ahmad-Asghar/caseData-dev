import React from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CountryList from "./CountryList";
import CourtHouseList from "./CourtHouseList";
import StateList from "./StateList";
import "./admin.css";

const LongInput = (props) => {
  return (
    <>
      <div
        className={`form-floating mb-3 ${
          props.addClass === undefined ? "" : props.addClass
        }`}
      >
        <input
          onChange={props.inputChange}
          type="text"
          className="form-control"
        />
        <label>{props.children}</label>
      </div>
    </>
  );
};

const CityAndState = (props) => {
  return (
    <div
      className={`row ${props.addToRow === undefined ? "" : props.addToRow}`}
    >
      <div className="col-md">
        <div className="form-floating">
          <input
            onChange={props.cityChange}
            type="text"
            className="form-control"
            id="decedentCity"
            placeholder=""
          />
          <label>City</label>
        </div>
      </div>
      <div className="col-md">
        <div className="form-floating">
          <select
            onChange={props.stateChange}
            className="form-select"
            id="decedentState"
            aria-label="Floating label select example"
          >
            {StateList}
          </select>
          <label>Select State</label>
        </div>
      </div>
    </div>
  );
};

const ZipCode = (props) => {
  return (
    <div
      className={`col-md ${
        props.addToRow === undefined ? "" : props.addToRow
      } `}
    >
      <div className="form-floating">
        <input
          onChange={props.zipChange}
          type="text"
          className="form-control"
          id="decedentCity"
          placeholder=""
        />
        <label>{`Zip`}</label>
      </div>
    </div>
  );
};

class AdminAccess extends React.Component {
  constructor(props) {
    super();

    this.state = {
      // decedents input variables
      caseNumber: "",
      decedentName: "",
      decedentAddress: "",
      city: "",
      state: "",
      zipCode: "",
      dateFilled: "",
      dateOfDeath: "",
      petitioner: "",
      netPropertyValue: "",
      courtName: "",
      numberOfBeneficiaries: 0,
      enterNumberOfBen: false,
      loopNumb: 0,
      perosonalProperty: "",
      exportPDF: "",
      apiCallStatus: "",
      intestate: null,
      // beneficiary input variables
      renderNum: [],
      beneficiaryName: [],
      beneficiaryAddress: [],
      beneficiaryCity: [],
      beneficiaryState: [],
      beneficiaryZip: [],
      beneficiaryCountry: [],
      beneficiaryHeir: [],
      benAddInputs: [],
      // Attorney input variables
      attorneyInfo: "",
      i: 0,
    };

    this.inputCaseNumber = this.inputCaseNumber.bind(this);
    this.inputName = this.inputName.bind(this);
    this.inputAddress = this.inputAddress.bind(this);
    this.inputCity = this.inputCity.bind(this);
    this.inputZipCode = this.inputZipCode.bind(this);
    this.selectState = this.selectState.bind(this);
    this.inputNetPropertyValue = this.inputNetPropertyValue.bind(this);
    this.inputPetitioner = this.inputPetitioner.bind(this);
    this.inputNumberOfBeneficiaries =
      this.inputNumberOfBeneficiaries.bind(this);
    this.handleDateFiled = this.handleDateFiled.bind(this);
    this.handleDateDeath = this.handleDateDeath.bind(this);
    this.handleSubmitBtn = this.handleSubmitBtn.bind(this);
    this.addBen = this.addBen.bind(this);
    this.selectCourtName = this.selectCourtName.bind(this);
    this.inputPersonalProperty = this.inputPersonalProperty.bind(this);
    this.handleExportPDF = this.handleExportPDF.bind(this);
    this.renderBenForm = this.renderBenForm.bind(this);
  }

  // below is all the functions for the inputs
  handleExportPDF(e) {
    // const pdfData = new FormData();
    this.setState({ exportPDF: e.target.files[0] }); // e.target.files[0]
    // pdfData.append("pdf",this.state.exportPDF )

    // console.log(this.state.exportPDF)
  }
  inputPersonalProperty(e) {
    this.setState({ perosonalProperty: e.target.value });
  }
  inputCaseNumber(e) {
    this.setState({ caseNumber: e.target.value });
  }
  inputName(e) {}
  inputAddress(e) {
    this.setState({ decedentAddress: e.target.value });
  }
  inputCity(e) {
    this.setState({ city: e.target.value });
  }
  inputZipCode(e) {
    this.setState({ zipCode: e.target.value });
  }
  selectState(e) {
    this.setState({ state: e.target.value });
  }
  inputNetPropertyValue(e) {
    this.setState({ netPropertyValue: e.target.value });
  }
  inputPetitioner(e) {
    this.setState({ petitioner: e.target.value });
  }
  inputNumberOfBeneficiaries(e) {
    this.setState({ numberOfBeneficiaries: e.target.value });
    if (this.state.numberOfBeneficiaries > 0) {
      this.setState({ enterNumberOfBen: true });
    }
  }

  // Below is all the event functions for the form

  handleDateFiled(date) {
    this.setState({ dateFilled: JSON.stringify(date).slice(1, 11) });
  }

  handleDateDeath(date) {
    this.setState({ dateOfDeath: JSON.stringify(date).slice(1, 11) });
  }
  selectCourtName(e) {
    this.setState({ courtName: e.target.value });
  }

  handleSubmitBtn = async (e) => {
    e.preventDefault();
    let stateIs = this.state;
    const pdfData = new FormData();
    pdfData.append("file", this.state.exportPDF);

    console.log(this.state.exportPDF);

    // const data = await axios.post(`https://e1b9-39-62-56-179.ap.ngrok.io/admin/enterdata?case_number=${stateIs.caseNumber}
    // &decedent_name=${stateIs.decedentName}&decedent_address=${stateIs.decedentAddress}
    // &decedent_city=${stateIs.city}&decent_state=${stateIs.state}&decedent_zip=${stateIs.zipCode}
    // &date_filed=${stateIs.dateFilled}&date_of_death=${stateIs.dateOfDeath}&petitioner=${stateIs.petitioner}
    // &net_property_value=${stateIs.netPropertyValue}&attorney_name=${stateIs.attorneyName}
    // &attorney_address=${stateIs.attorneyAddress}&attorney_city=${stateIs.attorneyCity}&attorney_state=${stateIs.attorneyState}
    // &attorney_zip=${stateIs.attorneyZip}&personal_property=${stateIs.perosonalProperty}&intestate=${stateIs.intestate}
    // &court_name=${stateIs.courtName}&beneficiaryName=${stateIs.beneficiaryName[0]}&beneficiaryAddress=${stateIs.beneficiaryAddress[0]}
    // &beneficiaryCity=${stateIs.beneficiaryCity[0]}&beneficiaryState=${stateIs.beneficiaryState[0]}
    // &beneficiaryZip=${stateIs.beneficiaryZip[0]}&beneficiaryCountry=${stateIs.beneficiaryCountry[0]}`)
    /////////////////////////////////
    // testing
    // const data = axios.post(`https://e1b9-39-62-56-179.ap.ngrok.io/admin/enterdata?case_number=${stateIs.caseNumber}
    // &decedent_name=${stateIs.decedentName}&decedent_address=${stateIs.decedentAddress}
    // &decedent_city=${stateIs.city}&decent_state=${stateIs.state}&decedent_zip=${stateIs.zipCode}
    // &date_filed=${stateIs.dateFilled}&petitioner=${stateIs.petitioner}`)

    // http://api.datacse/admin/enterdata?
    // case_number=22STPB03389&decedent_name=Sharon K. Caseyyyyy2
    // &decedent_address=9308 Ruffner Street
    // &decedent_city=Northridge&decedent_state=CA
    // &decedent_zip=90025&date_filed='2022-02-02'
    // &date_of_death='2021-05-20'&petitioner=John Casey
    // &net_property_value=1880000&attorney_name=Ellis Stern
    // &attorney_address=8345 Balboa Blvd.
    // &attorney_city=Encino&attorney_state=CA
    // &attorney_zip=91316&personal_property=20000
    // &intestate=True&court_name=SUPERIOR COURT OF CALIFORNIA, COUNTY OF Los Angeleseses2&beneficiaryName=Billy Casey&relation=Adult Child&beneficiaryAddress=22040 Martinez Street&beneficiaryCity=Woodland Hills&beneficiaryState=CA&beneficiaryZip=91364&beneficiaryCountry=US&beneficiaryName=Bob Casathon&relation=Adult Child&beneficiaryAddress=22040 Martinez Street&beneficiaryCity=Woodland Hills&beneficiaryState=CA&beneficiaryZip=91364&beneficiaryCountry=US

    //  await fetch
    // await fetch(`https://e1b9-39-62-56-179.ap.ngrok.io/admin/enterdata?
    //   case_number=${stateIs.caseNumber}
    //   &decedent_name=${stateIs.decedentName}
    //   &date_filed=${stateIs.dateFilled}
    //   &petitioner=${stateIs.petitioner}`, {
    //     method: 'POST',
    //     body:  pdfData,
    //   })
    await fetch(
      `https://e1b9-39-62-56-179.ap.ngrok.io/admin/enterdata?
    case_number=${stateIs.caseNumber}
    &decedent_name=${stateIs.decedentName}
    &date_filed=${stateIs.dateFilled}
    &petitioner=${stateIs.petitioner}`,
      {
        method: "POST",
        body: pdfData,
      }
    )
      // Request URL: https://e1b9-39-62-56-179.ap.ngrok.io/admin/enterdata?%20%20%20%20case_number=123%20%20%20%20&decedent_name=michael%20%20%20%20&date_filed=2022-03-03%20%20%20%20&petitioner=Sari%20L.%20Swig

      // await fetch(`https://e1b9-39-62-56-179.ap.ngrok.io/admin/enterdata?case_number=${stateIs.caseNumber}
      // &decedent_name=${stateIs.decedentName}&decedent_address=${stateIs.decedentAddress}
      // &decedent_city=${stateIs.city}&decedent_state=${stateIs.state}&decedent_zip=${stateIs.zipCode}
      // &date_filed=${stateIs.dateFilled}&date_of_death=${stateIs.dateOfDeath}&petitioner=${stateIs.petitioner}
      // &net_property_value=${stateIs.netPropertyValue}&attorney_name=${stateIs.attorneyName}
      // &attorney_address=${stateIs.attorneyAddress}&attorney_city=${stateIs.attorneyCity}&attorney_state=${stateIs.attorneyState}
      // &attorney_zip=${stateIs.attorneyZip}&personal_property=${stateIs.perosonalProperty}&intestate=${stateIs.intestate}
      // &court_name=${stateIs.courtName}&beneficiaryName=${stateIs.beneficiaryName[0]}&beneficiaryAddress=${stateIs.beneficiaryAddress[0]}
      // &beneficiaryCity=${stateIs.beneficiaryCity[0]}&beneficiaryState=${stateIs.beneficiaryState[0]}
      // &beneficiaryZip=${stateIs.beneficiaryZip[0]}&beneficiaryCountry=${stateIs.beneficiaryCountry[0]}`, {
      //       method: 'POST'
      //     })
      .then((res) => {
        this.setState({ apiCallStatus: res });
      })
      .catch((err) => console.log(err));
    // this.setState({ apiCallStatus: data });
    console.log(this.state.apiCallStatus);
    //&relation=Adult Child&beneficiaryName=Bob Casathon&relation=Adult Child&beneficiaryAddress=22040 Martinez Street&beneficiaryCity=Woodland Hills&beneficiaryState=CA&beneficiaryZip=91364&beneficiaryCountry=US
  };
  // Add Beneficiar button to the array
  addBen(e) {
    e.preventDefault();
    this.setState({
      numberOfBeneficiaries: this.state.numberOfBeneficiaries + 1,
      beneficiaryName: [...this.state.beneficiaryName, this.state.benName],
      beneficiaryAddress: [
        ...this.state.beneficiaryAddress,
        this.state.benAddress,
      ],
      beneficiaryCity: [...this.state.beneficiaryCity, this.state.benCity],
      beneficiaryState: [...this.state.beneficiaryState, this.state.benState],
      beneficiaryZip: [...this.state.beneficiaryZip, this.state.benZip],
      beneficiaryCountry: [
        ...this.state.beneficiaryCountry,
        this.state.benCountry,
      ],
      beneficiaryHeir: [...this.state.beneficiaryHeir, this.state.benHeir],
      benAddInputs: [...this.state.benAddInputs, <this.renderBenForm />],
    });
  }

  // Function to add more beneficiary
  renderBenForm() {
    return (
      <>
        <div className="row p-5">
          <hr />
          <LongInput
            addClass="mt-5"
            inputChange={(e) => this.setState({ benName: e.target.value })}
          >
            Name
          </LongInput>
          <LongInput
            inputChange={(e) => this.setState({ benAddress: e.target.value })}
          >
            Address
          </LongInput>
          <div className="row">
            <CityAndState
              cityChange={(e) => this.setState({ benCity: e.target.value })}
              stateChange={(e) => this.setState({ benState: e.target.value })}
            ></CityAndState>
          </div>

          <div className="row p-3">
            <ZipCode
              zipChange={(e) => this.setState({ benZip: e.target.value })}
            >
              {" "}
            </ZipCode>

            <div className="col-md">
              <div className="form-floating">
                <select
                  id="country"
                  name="country"
                  onChange={(e) =>
                    this.setState({ benCountry: e.target.value })
                  }
                  className="form-select"
                  aria-label="Floating label select example"
                >
                  {CountryList}
                </select>

                <label>{`Country`}</label>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // render methlod

  render() {
    // const heirList = HeirList;
    const courtList = CourtHouseList;
    // const showHeirList = heirList.map((heir, i) => (
    //   <option key={i} value={heir}>{heir}</option>
    // ));
    const showCourtHouseList = courtList.map((court, i) => (
      <option key={i} value={court}>
        {court}
      </option>
    ));
    const countryList = CountryList;

    let showBenNumber =
      this.state.numberOfBeneficiaries > 0 ? (
        <div className="row">
          <p className="text-center">{`${this.state.numberOfBeneficiaries}`}</p>
        </div>
      ) : (
        <div className="row">
          <p className="text-center"></p>
        </div>
      );

    let displayDateFile =
      this.state.dateFilled === "" ? (
        <p> {`Date Filed: `}</p>
      ) : (
        <p> {`Date Filed is ${this.state.dateFilled}`}</p>
      );
    let displayDateDeath =
      this.state.dateOfDeath === "" ? (
        <p> {`Date of Death: `}</p>
      ) : (
        <p> {`Date of Death is ${this.state.dateOfDeath}`}</p>
      );

    return (
      <section className="pt-5 pb-5">
        <div className="container">
          <form>
            {/* // Decedent input fields  */}
            <LongInput inputChange={this.inputCaseNumber} required>
              Case Number
            </LongInput>

            <LongInput
              required
              inputChange={(e) =>
                this.setState({ decedentName: e.target.value })
              }
            >
              Name
            </LongInput>
            <LongInput inputChange={this.inputAddress}>
              Decedent Address
            </LongInput>
            <CityAndState
              cityChange={this.inputCity}
              stateChange={this.selectState}
            ></CityAndState>

            <div className="row mb-3 pt-3">
              <ZipCode zipChange={this.inputZipCode}></ZipCode>
              <div className="col-md">
                <div className="form-floating">
                  <input
                    onChange={this.inputPetitioner}
                    type="text"
                    className="form-control"
                    id="petitioner"
                    placeholder=""
                    required
                  />
                  <label>Petitioner</label>
                </div>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="col-md">
                {displayDateFile}
                {/* <p> {`Date Filed is ${displayDateFile}`}</p> */}
                <Calendar date={new Date()} onChange={this.handleDateFiled} />
              </div>

              <div className="col-md">
                {displayDateDeath}
                {/* <p> Date of Death</p> */}
                <Calendar date={new Date()} onChange={this.handleDateDeath} />
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="col-md">
                <div className="form-floating">
                  <input
                    onChange={this.inputNetPropertyValue}
                    type="text"
                    className="form-control"
                    id="netPropertyValue"
                  />
                  <label>Net Property Value</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating">
                  <select
                    onChange={this.selectCourtName}
                    className="form-select"
                    id="decedentState"
                    aria-label="Floating label select example"
                  >
                    {showCourtHouseList}
                  </select>
                  <label>Court House Name</label>
                </div>
              </div>
              <div>
                <label className="form-label">Upload PDF</label>
                <input
                  onChange={this.handleExportPDF}
                  className="form-control"
                  type="file"
                  id="formFile"
                />
              </div>

              <div className="form-group">
                <label>Personal Property</label>
                <textarea
                  onChange={this.inputPersonalProperty}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <label> Intestate Yes or No? </label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    onChange={() => this.setState({ intestate: true })}
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value={true}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onChange={() => this.setState({ intestate: false })}
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox2"
                    value={false}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>

            {/*  Attorney input fields  */}
            <div className="row attorney-row m-5 p-5">
              <h3 className="text-center">Attorney Information</h3>
              <LongInput
                addClass="mt-5"
                inputChange={(e) =>
                  this.setState({ attorneyName: e.target.value })
                }
              >
                Attorney Name
              </LongInput>

              <LongInput
                inputChange={(e) =>
                  this.setState({ attorneyAddress: e.target.value })
                }
              >
                Attorney Address
              </LongInput>
              <CityAndState
                cityChange={(e) =>
                  this.setState({ attorneyCity: e.target.value })
                }
                stateChange={(e) =>
                  this.setState({ attorneyState: e.target.value })
                }
              >
                {" "}
              </CityAndState>

              <ZipCode
                addToRow="pt-3"
                zipChange={(e) =>
                  this.setState({ attorneyZip: e.target.value })
                }
              ></ZipCode>
            </div>

            {/*  Beneficiar input fields  */}
            <div className="row ben-row m-5">
              <h3 className="text-center">Beneficiar</h3>
              {showBenNumber}
              <LongInput
                addClass="mt-5"
                inputChange={(e) => this.setState({ benName: e.target.value })}
              >
                Name
              </LongInput>

              <LongInput
                inputChange={(e) =>
                  this.setState({ benAddress: e.target.value })
                }
              >
                Address
              </LongInput>

              <CityAndState
                cityChange={(e) => this.setState({ benCity: e.target.value })}
                stateChange={(e) => this.setState({ benState: e.target.value })}
              ></CityAndState>
              <div className="row pt-3">
                <ZipCode
                  zipChange={(e) => this.setState({ benZip: e.target.value })}
                ></ZipCode>
                <div className="col-md">
                  <div className="form-floating">
                    <select
                      id="country"
                      name="country"
                      onChange={(e) =>
                        this.setState({ benCountry: e.target.value })
                      }
                      className="form-select"
                      aria-label="Floating label select example"
                    >
                      {countryList}
                    </select>
                    <label>{`Country`}</label>
                    {/* <label>{`Country`}</label> */}
                  </div>
                </div>
              </div>
              <div className="row p-5">
                <p>
                  Note: Once you input all the beneficiary information make sure
                  you click "Add Beneficiar" so the information gets added
                  correctly.
                </p>
              </div>
              <div className="row p-5">{this.state.benAddInputs}</div>
              <button
                className=" btn btn-primary mt-5 mb-5"
                onClick={this.addBen}
              >{`Add Beneficiar`}</button>
            </div>
            {/* </div> */}

            <div className="row pt-5 pb-5">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmitBtn}
              >
                Submit
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </section>
    );
  }
}

export default AdminAccess;
