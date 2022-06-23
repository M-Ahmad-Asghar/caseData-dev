import React from "react";
import "./searchDashboard.css";
import ApiCall from "../api/apiCall";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import fileIcon from "../../images/icons/file-icon.png";
import searchIcon from "../../images/icons/search.png";
import cross from "../../images/icons/cross.png";
import DropdownButton from "react-bootstrap/DropdownButton";
import ReactPaginate from "react-paginate";
import { sampleData } from "./sampleData";
import Cube from "../../images/icons/cube.png";
import ExportIcon from "../../images/icons/export.png";
import NoDataImage from "../../images/icons/noData.png";
import { BASE_URL } from "../../config";

import {
  InputGroup,
  Button,
  Dropdown,
  FormControl,
  Table,
  Modal,
} from "react-bootstrap";

const Section = (props) => {
  return (
    <>
      <section>{props.children}</section>
    </>
  );
};

const Container = (props) => {
  return (
    <>
      <div className="container search-dashboard p-2 rounded-5">
        {props.children}
      </div>
    </>
  );
};

const Row = (props) => {
  return (
    <>
      <div
        className={`row ${
          props.addClassName === undefined ? " " : props.addClassName
        }`}
      >
        {props.children}
      </div>
    </>
  );
};

const RecentSearchNLength = (props) => {
  // {displayLength}
  return (
    <>
      <div className="col-2">
        <p className="recent-list">Recent Searches For: </p>
      </div>
      <div className="col-2">
        <p className="results-number">{props.children}</p>
      </div>
    </>
  );
};

const ExportBtn = () => {
  return (
    <>
      <span
        onClick={() => window.open(`${BASE_URL}/exportCSV`, "_blank")}
        className="exportBtn"
      >
        <img
          src={ExportIcon}
          alt="export"
          style={{ width: 20, height: 20, opacity: 0.6 }}
        />
        Export
      </span>
    </>
  );
};

const SearchBtn = (props) => {
  // onClick={statedateRangeRender}
  return (
    <>
      <button onClick={props.clickSearch} className="date-search">
        Search
      </button>
    </>
  );
};

const SearchKeys = (props) => {
  return (
    <div
      onClick={props.renderSearchKey}
      className={`col search-key-terms ${props.showClass}`}
    >
      {props.children}
    </div>
  );
};

function SearchDashboard() {
  const [dateModal, setDateModal] = React.useState(false);
  const [searchResultsFor, setSearchResultsFor] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [state, setState] = React.useState({
    view: "log-in", // should be "log-in"
    searchResults: "",
    data: [],
    paginatedData: [],
    placeHolderText: "Seach By Name",
    // isLoading: false, // for spinning wheel
    searchBtnPressed: false,
    searchType: "name",
    beneficiaries: [],
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 10,
    dateRange: [
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ],
  });

  React.useEffect(() => {
    const endOffset = state.itemOffset + state.itemsPerPage;
    setState({
      ...state,
      paginatedData: state?.data?.slice(state.itemOffset, endOffset),
      pageCount: Math.ceil(state.data.length / state.itemsPerPage),
    });
  }, [state.itemOffset, state.itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * state.itemsPerPage) % state.data.length;

    setState({
      ...state,
      itemOffset: newOffset,
    });
  };

  const renderBen = (e) => {
    ApiCall.get(`/beneficiaries?caseId=${e.target.id}`)
      .then((res) => {
        setState({
          ...state,
          beneficiaries: res.data,
        });
      })
      .catch((e) => console.log(e));
  };

  const renderName = (e) => {
    setState({
      ...state,
      searchType: "name",
      searchBtnPressed: false,
      placeHolderText: "Search By Name",
    });
  };
  const renderNumber = (e) => {
    setState({
      ...state,
      searchType: "caseNumber",
      searchBtnPressed: false,
      placeHolderText: "Search By Case Number",
    });
  };
  console.log("DAA", state.paginatedData);

  const renderCourtName = (e) => {
    setState({
      ...state,
      searchType: "courtName",
      searchBtnPressed: false,
      placeHolderText: "Search By Court Name",
    });
  };
  const renderDateRange = (e) => {
    setState({
      ...state,
      searchType: "date_filed",
      searchBtnPressed: false,
      placeHolderText: "Search By Date Filed",
    });
    setDateModal(true);
  };
  const getSearchType = () => {
    switch (state.searchType) {
      case "name":
        return "Name";
      case "caseNumber":
        return "Case Number";
      case "courtName":
        return "Court Number";
      case "date_filed":
        return "Date Range";
      default:
        return "";
        break;
    }
  };
  const dateRangeRender = (e) => {
    const start = JSON.stringify(state.dateRange[0].startDate).slice(1, 11);
    const end = JSON.stringify(state.dateRange[0].endDate).slice(1, 11);
    // setState({ ...state, isLoading: true });
    setIsLoading(true);
    ApiCall.get(`/search?dateStart=${start}&dateEnd=${end}`)
      .then((res) => {
        const endOffset = state.itemOffset + state.itemsPerPage;
        setState({
          ...state,
          searchBtnPressed: true,
          data: res.data,
          paginatedData: res.data.slice(state.itemOffset, endOffset),
          pageCount: Math.ceil(res.data.length / state.itemsPerPage),
        });
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const searchResultsInput = (e) => {
    setState({ ...state, searchResults: e.target.value });
  };

  const renderSearchResult = (e) => {
    e.preventDefault();
    setSearchResultsFor(
      state.searchType === "date_filed"
        ? `Start Date: ${JSON.stringify(state.dateRange[0].startDate).slice(
            1,
            11
          )} ${dateRangeEndDate}`
        : state.searchResults
    );
    const endOffset = state.itemOffset + state.itemsPerPage;

    // setState({
    //   ...state,
    //   searchBtnPressed: true,
    //   data: sampleData,
    //   paginatedData: sampleData.slice(state.itemOffset, endOffset),
    //   pageCount: Math.ceil(sampleData.length / state.itemsPerPage),
    //   // isLoading: false,
    // });

    // setState({ ...state, searchResults: "" });
    // this works shows everythings
    if (state.searchResults === "") {
      // setState({ ...state, isLoading: true });
      setIsLoading(true);
      ApiCall.get("/search")
        .then((res) => {
          const endOffset = state.itemOffset + state.itemsPerPage;
          setState({
            ...state,
            searchBtnPressed: true,
            data: res.data,
            paginatedData: res.data.slice(state.itemOffset, endOffset),
            pageCount: Math.ceil(res.data.length / state.itemsPerPage),
          });
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
      // this works and put name
    } else if (state.searchType === "name") {
      // statesetState({ isLoading: true });
      setIsLoading(true);
      ApiCall.get(`/search?name=${state.searchResults}`)
        .then((res) => {
          const endOffset = state.itemOffset + state.itemsPerPage;
          setState({
            ...state,
            searchBtnPressed: true,
            data: res.data,
            paginatedData: res.data.slice(state.itemOffset, endOffset),
            pageCount: Math.ceil(res.data.length / state.itemsPerPage),
          });
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    }
    // this works and put caseNumber
    else if (state.searchType === "caseNumber") {
      // setState({ ...state, isLoading: true });
      setIsLoading(true);
      ApiCall.get(`/search?caseNumber=${state.searchResults}`)
        .then((res) => {
          const endOffset = state.itemOffset + state.itemsPerPage;
          setState({
            ...state,
            searchBtnPressed: true,
            data: res.data,
            paginatedData: res.data.slice(state.itemOffset, endOffset),
            pageCount: Math.ceil(res.data.length / state.itemsPerPage),
          });
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    }
    // this works and put courtName
    else if (state.searchType === "courtName") {
      // setState({ ...state, isLoading: true });
      setIsLoading(true);
      ApiCall.get(`/search?courtName=${state.searchResults}`)
        .then((res) => {
          const endOffset = state.itemOffset + state.itemsPerPage;
          setState({
            ...state,
            searchBtnPressed: true,
            data: res.data,
            paginatedData: res.data.slice(state.itemOffset, endOffset),
            pageCount: Math.ceil(res.data.length / state.itemsPerPage),
          });
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    }
  };

  let displayLength = state.data.length < 0 ? " " : state.data.length;
  const renderList = state.paginatedData;

  const ben = state.beneficiaries;
  const dateRangeEndDate =
    JSON.stringify(state.dateRange[0].endDate).slice(1, 11) === "ull"
      ? ""
      : ` and End Date: ${JSON.stringify(state.dateRange[0].endDate).slice(
          1,
          11
        )}`;
  let showClassName = state.searchType === "name" ? state.searchType : "non";
  let showClassNumber =
    state.searchType === "caseNumber" ? state.searchType : "non";
  let showClassCourtName =
    state.searchType === "courtName" ? state.searchType : "non";
  let showClassDateRange =
    state.searchType === "date_filed" ? state.searchType : "non";
  let showRenderBen = ben.map((data, i) => (
    <tr key={i}>
      <td scope="row">{data.beneficiary_name}</td>
      <td>{data.relation}</td>
      <td>{data.beneficiary_address}</td>
      <td>{data.beneficiary_city}</td>
      <td>{data.beneficiary_state}</td>
      <td>{data.beneficiary_zip}</td>
    </tr>
  ));
  let showrenderList = renderList.map((data) => (
    <tr key={data.case_number}>
      <td>{data.case_number}</td>
      <td>{data.decedent_name}</td>
      <td>{data.decedent_address}</td>
      <td>{data.decedent_state}</td>
      <td>{data.decedent_city}</td>
      <td>{data.decedent_zip}</td>
      <td>{data.date_filed}</td>
      <td className="download-file">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://api.datacse.com/exportPDF?caseId=${data.caseId}`}
        >
          <img
            id={`${data.caseId}`}
            className={`file-icon`}
            src={fileIcon}
            alt="file-icon"
          />
        </a>
      </td>
      <td>
        {/* // here is the dropdown menu */}
        <DropdownButton
          id={`${data.caseId}`}
          title={`Beneficiary List `}
          onClick={renderBen}
          className={`dropdown-btn`}
        >
          <Table
            responsive
            style={{ margin: "auto" }}
            className="mt-4 p-2 "
            bordered
          >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Relation</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Zip</th>
              </tr>
            </thead>
            <tbody>{showRenderBen}</tbody>
          </Table>
        </DropdownButton>
      </td>
      <th>
        <DropdownButton
          id={`${data.caseId}`}
          title={`Attorney Info`}
          className={`dropdown-btn`}
        >
          <p className="text-center">Attorney Information</p>
          <Table responsive className="table p-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Zip</th>
              </tr>
            </thead>
            <tbody>
              <td>{data.attorney_name}</td>
              <td>{data.attorney_address}</td>
              <td>{data.attorney_city}</td>
              <td>{data.attorney_state}</td>
              <td>{data.attorney_zip}</td>
            </tbody>
          </Table>
        </DropdownButton>
      </th>
    </tr>
  ));
  const showOfSearches = (
    <>
      <div className="col-6">
        <div className="row justify-content-start align-items-end text-center ">
          <SearchKeys
            showClass={`${showClassName}`}
            renderSearchKey={renderName}
          >
            Name
          </SearchKeys>

          <SearchKeys
            showClass={`${showClassNumber}`}
            renderSearchKey={renderNumber}
          >
            Case Number
          </SearchKeys>

          <SearchKeys
            showClass={` ${showClassCourtName}`}
            renderSearchKey={renderCourtName}
          >
            Court Name
          </SearchKeys>

          <SearchKeys
            showClass={`${showClassDateRange}`}
            renderSearchKey={renderDateRange}
          >
            Date Range
          </SearchKeys>
        </div>
      </div>
    </>
  );

  const showListOfSearchTitles = (
    <thead>
      <tr>
        <th style={{ padding: 20 }} scope="col">
          Case No.
        </th>
        <th style={{ padding: 20 }} scope="col">
          Decedent Name
        </th>
        <th style={{ padding: 20 }} scope="col">
          Decedent Address
        </th>
        <th style={{ padding: 20 }} scope="col">
          Decedent State
        </th>
        <th style={{ padding: 20 }} scope="col">
          Decedent City
        </th>
        <th style={{ padding: 20 }} scope="col">
          Decedent Zip
        </th>
        <th style={{ padding: 20 }} scope="col">
          Date Filed
        </th>
        <th style={{ padding: 20 }} scope="col">
          Download
        </th>
        <th style={{ padding: 20 }} scope="col">
          Beneficiary
        </th>
        <th style={{ padding: 20 }} scope="col">
          Attorney Info
        </th>
      </tr>
    </thead>
  );
  const noDataFound = (
    <div className="no-data-found-container">
      <div className="no-data-found">
        <img className="no-data-image" src={NoDataImage} />
      </div>
    </div>
  );

  const showForm = (
    <div className="search-main">
      <div className="search-back-card">
        <div>
          <img className="left-cube-image" src={Cube} />
          <img className="left-cube-image2" src={Cube} />
          <img className="left-cube-image3" src={Cube} />
          <img className="right-cube-image" src={Cube} />
          <img className="right-cube-image2" src={Cube} />
          <img className="right-cube-image3" src={Cube} />
        </div>
        <h1 className="search-back-card-text">Find Case Data</h1>
      </div>

      <div className="search-container">
        <div className="search">
          <div className="input-container">
            <div style={{ display: "flex", width: "100%" }}>
              <img
                style={{ marginLeft: "20px" }}
                className={`search-icon`}
                src={searchIcon}
                alt="file-icon"
              />
              <input
                value={state.searchResults}
                onChange={searchResultsInput}
                onClick={() =>
                  state.searchType === "date_filed" ? setDateModal(true) : null
                }
                className="input-search"
                aria-label="Text input with dropdown button"
                placeholder={state.placeHolderText}
              />
            </div>
          </div>
          <div className="search-buttons">
            <img
              onClick={() => setState({ ...state, searchResults: "" })}
              className={
                state.searchResults.length ? `cross-icon` : `cross-icon-hide`
              }
              src={cross}
              alt="cross-icon"
            />
            <div className="vertical-line" />

            <Dropdown>
              <Dropdown.Toggle
                className="dropdown-toggle"
                id="dropdown-autoclose-true"
              >
                <span style={{ fontWeight: "600" }}>{getSearchType()}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={renderName}>Name</Dropdown.Item>
                <Dropdown.Item onClick={renderNumber}>
                  Case Number
                </Dropdown.Item>
                <Dropdown.Item onClick={renderCourtName}>
                  Court Number
                </Dropdown.Item>
                <Dropdown.Item onClick={renderDateRange}>
                  Date Ranges
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              onClick={
                state.searchType === "date_filed"
                  ? dateRangeRender
                  : renderSearchResult
              }
              className="button-search"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      <Modal style={{ marginTop: "200px" }} show={dateModal}>
        <Modal.Body style={{ margin: "auto" }}>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setState({
                ...state,
                dateRange: [item.selection],
                searchResults: "",
              });

              // setDateModal(false);
            }}
            moveRangeOnFirstSelection={false}
            ranges={state.dateRange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setDateModal(false)} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  if (isLoading === true) {
    return (
      <div style={{ marginTop: "50px" }}>
        <Section>
          {/* <Row>{showOfSearches}</Row> */}
          <Row>{showForm}</Row>
          <div
            style={{
              width: "90%",
              margin: "auto",
              backgroundColor: "white",
              height: "300px",
              marginTop: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div id="loader" />
            </div>
          </div>
        </Section>
      </div>
    );
  } else if (
    state.searchType === "date_filed" &&
    state.searchBtnPressed === false
  ) {
    return (
      <div
        style={{ width: "100%", margin: "auto", backgroundColor: "#f3f3f3" }}
      >
        {showForm}
        {noDataFound}
      </div>
    );
  } else if (
    state.searchType === "date_filed" &&
    state.searchBtnPressed === true
  ) {
    return (
      <>
        {showForm}
        <div
          style={{ width: "90%", margin: "auto", backgroundColor: "#f3f3f3" }}
        >
          <Row addClassName="justify-content-between">
            <div className="col">
              {/* <hr /> */}
              <div className="upperTableRow">
                <h4>Search results for: {searchResultsFor}</h4>
                <ExportBtn />
              </div>
              <span className="borderBottom" />
              <Table responsive>
                {showListOfSearchTitles}
                <tbody>{showrenderList}</tbody>
              </Table>
            </div>
          </Row>
        </div>
      </>
    );
  } else if (state.searchBtnPressed === true) {
    return (
      <div style={{ marginTop: "50px" }}>
        <Section>
          <Row>{showForm}</Row>

          <Row>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                margin: "auto",
                marginTop: "30px",
              }}
            >
              <div className="upperTableRow">
                <h4>Search results for: {searchResultsFor} </h4>
                <ExportBtn />
              </div>
              <span className="borderBottom" />
              <Table
                responsive
                // bordered
                // hover
                className="table"
              >
                {showListOfSearchTitles}

                <tbody>{showrenderList}</tbody>
              </Table>

              <ReactPaginate
                nextLabel="Next >"
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageCount={state.pageCount}
                previousLabel="< Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </Row>
        </Section>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <Section>
        {/* <Row>{showOfSearches}</Row> */}
        <Row>{showForm}</Row>
        {noDataFound}
      </Section>
    </div>
  );
}

export default SearchDashboard;
