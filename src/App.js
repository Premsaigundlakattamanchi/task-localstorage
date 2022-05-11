import React, { Component } from 'react'
import "./App.css"
import MaterialTable from 'material-table'
import moment from "moment";
// import {v4 as uuidv4} from 'uuid'


import tableIcons from './components/icons'
//import Results from './components/Results'
export default class App  extends Component {
  state={
  
    name : "",
    startDate :null,
    endDate :null,
    startTime :"",
    endTime :"",
     tDate:new Date(),
    status:"",
    detailsEvent:[]
  }

   onChangeName=(event)=>{
    this.setState({name:event.target.value})
   }

   onChangeStartDate=(event)=>{
     this.setState({startDate:event.target.value})
   }

   onChangeEndDate=(event)=>{
     this.setState({endDate:event.target.value})
   } 

   onChangeStartTime=(event)=>{
     this.setState({startTime:event.target.value})
   }

   onChangeEndTime=(event)=>{
     this.setState({endTime:event.target.value})
   }

   componentDidMount() {

    const {startDate,endDate}=this.state
    
    //  const tdDate=(moment(tDate).format("YYYY-MM-DD"))

    
   console.log(startDate)
   console.log(endDate)
   

  // if((startDate<tdDate)&&(endDate<=tdDate)){
  //    this.setState({status:"Completed"})
  //    console.log("1")
  // }else if((startDate<tdDate)&&(endDate<=tdDate)){
  //   this.setState({status:"Completed"})
  //   console.log("2")
  // }else if((startDate===tdDate)&&(endDate===tdDate)){
  //   this.setState({status:"Completed"})
  //   console.log("3")
  // }else if((startDate<=tdDate)&&(endDate>tdDate)){
  //   this.setState({status:"Ongoing"})
  //   console.log("4")
  // }else if((startDate>tdDate)){
  //   this.setState({status:"Upcoming"})
  //   console.log("5")
  // }


  if (
    moment(new Date(startDate)).format("YYYY-MM-DD") <=
      moment(new Date()).format("YYYY-MM-DD") &&
    moment(new Date(endDate)).format("YYYY-MM-DD") >=
      moment(new Date()).format("YYYY-MM-DD")
  ) {

    this.setState({status:"Ongoing"})
  } else if (new Date(startDate) > new Date(endDate)) {
   this.setState({endDate:startDate})
  } else if (
    moment(new Date(startDate)).format("YYYY-MM-DD") <
      moment(new Date()).format("YYYY-MM-DD") &&
    moment(new Date(endDate)).format("YYYY-MM-DD") <
      moment(new Date()).format("YYYY-MM-DD")
  ) {
  this.setState({status:"Completed"})
  } else if (
    moment(new Date(startDate)).format("YYYY-MM-DD") >
      moment(new Date()).format("YYYY-MM-DD") &&
    moment(new Date(endDate)).format("YYYY-MM-DD") >
      moment(new Date()).format("YYYY-MM-DD")
  ) {
    this.setState({status:"Upcoming"})
  }
  

  // if((startDate<tdDate)&&(endDate<=tdDate)){
  //   this.setState({status:"Completed"})
  //          console.log("Completed")
  //       }
  //     if((startDate<tdDate)&&(endDate<=tdDate)){
  //   this.setState({status:"Completed"})
  //   console.log("Completed")
  //       }
  //     if((startDate===tdDate)&&(endDate===tdDate)){
  //       this.setState({status:"Completed"})
  //       console.log("Completed")
  //       }
  //     if((startDate<=tdDate)&&(endDate>tdDate)){
  //       this.setState({status:"Ongoing"})
  //       console.log("Ongoing")
  //       }
  //     if((startDate>tdDate)){
  //       this.setState({status:"Upcoming"})
  //       console.log("Upcoming")
  //       }

    const details = JSON.parse(localStorage.getItem("details") || "[]");
    //console.log(details);
    this.setState({ details: details });
  }
   

  onSubmit=(event)=>{
   event.preventDefault()
   const {name,startDate,endDate,startTime,endTime,status}=this.state

   const details = JSON.parse(localStorage.getItem("details") || "[]");
    
   const data = {
     
      name: name,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      status:status,
      
      
    };
    
    details.push(data);
    localStorage.setItem("details", JSON.stringify(details));
    this.componentDidMount();
     this.setState(details)
    //console.log(details)
    
  }


  // deleteItem=(id)=>{
  //    const {details}=this.state
  //    const filteredDetails = details.filter(
  //     each => each.id !== id,
  //   )

  //   this.setState({
  //     details:filteredDetails
  //   })
    
  //    localStorage.setItem("details",JSON.stringify(filteredDetails))
  //   // const {results}=this.state
  //   // console.log(results)

  // }
  

  
  // statusCheck=()=>{
  //   const {details}=this.state 
  //   const {startDate,endDate}=details
  //   console.log(startDate)
  //   const tDate=new Date()
  //   let status;
  //   if((startDate <= tDate)&&(endDate >= tDate)){
  //     this.setState({status:"Ongoing"})
  //   }if ((startDate <= tDate)&&(endDate <= tDate)) {
  //     this.setState({status:"Completed"})
    
  //   } else {

  //     this.setState({status:"Upcoming"})
  //   }
    
  //   return status

  // }


  render() {
  
 const results=JSON.parse(localStorage.getItem("details"))
//  console.log(results)



    return (
         <div className='bgContainer'>
           <h1 className='heading'>Enter Event Details</h1>
           <form  onSubmit={this.onSubmit} className="formContainer">
             
           <label className='formControl'>Enter   event name:
              <input type="text"  value={this.state.name} onChange={this.onChangeName} className="input "/>
            </label>

            <label className='formControl'>Enter  start date :
              <input type="date"   onChange={this.onChangeStartDate} className="input"/>
            </label>

            <label className='formControl'>Enter end date :
              <input type="date"  onChange={this.onChangeEndDate} className="input" min={this.state.startDate}/>
            </label>

            <label className='formControl'>Enter start time :
              <input type="time" value={this.state.startTime} onChange={this.onChangeStartTime} className="input"/>
            </label>

            <label className='formControl'>Enter end time :
              <input type="time" value={this.state.endTime} onChange={this.onChangeEndTime} className="input"/>
            </label>


            <button type="submit" className='btn'>
              submit
            </button>

           </form>

           
           <h1>Details</h1>
           <div className='dataContainer'>
             
           {/* <Table  class="table table-bordered table-striped table-hover table-condensed  text-center" >
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody >
              {details &&
                details.map((each) => (
                   
                   <Results details={each} 
                   key={each.id}
                   deleteItem={this.deleteItem}
                   editItem={this.updateItem}
                   status={this.statusCheck}
                   />
               ))}
            </tbody>
          </Table> */}
             <MaterialTable
     icons={tableIcons}
     editable={{
      onRowDelete: (selectedRow) =>
        new Promise((resolve, reject) => {
          const index = selectedRow.tableData.id;
          console.log(index);
          const updatedRows = [...results];
          updatedRows.splice(index, 1);
         this.setState({detailsEvent:[...this.state.detailsEvent,...updatedRows]})
          localStorage.setItem("details", JSON.stringify(updatedRows));
          resolve();
        }),
      onRowUpdate: (updatedRow, oldRow) =>
        new Promise((resolve, reject) => {
          const index = oldRow.tableData.id;
          console.log(index);
          const updatedRows = [...results];
          updatedRows[index] = updatedRow;
          console.log(updatedRows);
          this.setState({detailsEvent:[...this.state.detailsEvent,...updatedRows]})
          localStorage.setItem("details", JSON.stringify(updatedRows));
          resolve();
        }),
    }}
          columns={[
            { title: 'Event Name', field: 'name' },
            { title: 'Start Date', field: 'startDate' },
            { title: 'End Date', field: 'endDate' },
            { title: 'Start Time', field: 'startTime' },
            { title: 'End Time', field: 'endTime' },
            {title:"Status",field: "status"}
         
          ]}
          
          data={results?results:[]}
          title="Event Details"
          options={{
            search: false
          }}
        />
           </div>
         </div>
    )
  }
}
