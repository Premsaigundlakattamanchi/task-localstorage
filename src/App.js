import React, { Component } from "react";
import "./App.css";
import MaterialTable from "material-table";
import moment from "moment";
// import {v4 as uuidv4} from 'uuid'

import tableIcons from "./components/icons";
//import Results from './components/Results'
export default class App extends Component {
  state = {
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    tDate: new Date(),
    detailsEvent: [],
    status: "",
  };

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onChangeStartDate = (event) => {
    this.setState({ startDate: event.target.value });
  };

  onChangeEndDate = (event) => {
    this.setState({ endDate: event.target.value });
  };

  onChangeStartTime = (event) => {
    this.setState({ startTime: event.target.value });
  };

  onChangeEndTime = (event) => {
    this.setState({ endTime: event.target.value });
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("details"));
    data &&
      data.map((event) => {
        if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") >
          moment(new Date(event.endDate)).format("YYYY-MM-DD")
        ) {
          event.endDate = event.startDate;
          window.location.reload();
        } else if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") <=
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.endDate)).format("YYYY-MM-DD") >=
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.status = "In Progress";
        } else if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.endDate)).format("YYYY-MM-DD") <
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.status = "Event Completed";
        } else if (
          moment(new Date(event.startDate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD") &&
          moment(new Date(event.endDate)).format("YYYY-MM-DD") >
            moment(new Date()).format("YYYY-MM-DD")
        ) {
          event.status = "Upcoming Event";
        } else {
          // setstatus("");
        }
      });
    localStorage.setItem("details", JSON.stringify(data));
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { name, startDate, endDate, startTime, endTime, status } = this.state;

    const data = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      status: status,
    };

    const details = JSON.parse(localStorage.getItem("details") || "[]");
    details.push(data);
    localStorage.setItem("details", JSON.stringify(details));

    this.componentDidMount();
    // this.setState({ name: "" });
    // this.setState({ startDate: "" });
    // this.setState({ endDate: "" });
    // this.setState({ startTime: "" });
    // this.setState({ endTime: "" });
    window.location.reload();
  };

  render() {
    const results = JSON.parse(localStorage.getItem("details"));
    //  console.log(results)

    return (
      <div className="bgContainer">
        <h1 className="heading">Enter Event Details</h1>
        <form onSubmit={this.onSubmit} className="formContainer">
          <label className="formControl">
            Enter event name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
              className="input "
            />
          </label>

          <label className="formControl">
            Enter start date :
            <input
              type="date"
              value={this.state.startDate}
              onChange={this.onChangeStartDate}
              className="input"
            />
          </label>

          <label className="formControl">
            Enter end date :
            <input
              type="date"
              onChange={this.onChangeEndDate}
              className="input"
              min={this.state.startDate}
              value={this.state.endDate}
            />
          </label>

          <label className="formControl">
            Enter start time :
            <input
              type="time"
              value={this.state.startTime}
              onChange={this.onChangeStartTime}
              className="input"
            />
          </label>

          <label className="formControl">
            Enter end time :
            <input
              type="time"
              value={this.state.endTime}
              onChange={this.onChangeEndTime}
              className="input"
            />
          </label>

          <button type="submit" className="btn">
            submit
          </button>
        </form>

        <h1>Details</h1>
        <div className="dataContainer">
          <MaterialTable
            icons={tableIcons}
            editable={{
              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  const index = selectedRow.tableData.id;
                  console.log(index);
                  const updatedRows = [...results];
                  updatedRows.splice(index, 1);
                  this.setState({
                    detailsEvent: [...this.state.detailsEvent, ...updatedRows],
                  });
                  localStorage.setItem("details", JSON.stringify(updatedRows));
                  resolve();
                }),

              onRowUpdate: (updatedRow, oldRow) =>
                new Promise((resolve, reject) => {
                  const data = JSON.parse(localStorage.getItem("details"));
                  const index = oldRow.tableData.id;
                  console.log("u", updatedRow);
                  console.log("o", oldRow);
                  console.log("i", index);
                  const updatedrows = [...data];
                  updatedrows[index] = updatedRow;
                  console.log("uu", updatedrows);
                  this.componentDidMount();
                  // setRowsData([...rowsdata, ...updatedrows]);
                  // this.setState({ details: updatedrows });
                  localStorage.setItem("details", JSON.stringify(updatedrows));
                  window.location.reload();
                  resolve();
                }),
            }}
            columns={[
              { title: "Event Name", field: "name" },
              { title: "Start Date", field: "startDate" },
              { title: "End Date", field: "endDate" },
              { title: "Start Time", field: "startTime" },
              { title: "End Time", field: "endTime" },
              { title: "Status", field: "status" },
            ]}
            data={results ? results : []}
            title="Event Details"
            options={{
              search: false,
            }}
          />
        </div>
      </div>
    );
  }
}
