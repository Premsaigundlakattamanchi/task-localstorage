import {GrEdit} from "react-icons/gr"
import {AiTwotoneDelete} from "react-icons/ai"

const Results=(props)=>{
    const {details,deleteItem,editItem,}=props
    const {id,name,startDate,endDate,startTime,endTime,tDate}=details 
    
    let status;
    if ((startDate > tDate)&(endDate>tDate)){
        status=""
    }if ((startDate<tDate)&(endDate<tDate)) {
        status="Completed"
    } if ((startDate<tDate)&(endDate>tDate)) {
        status="Upcoming"
    } else {
        
    }

    const onDelete=()=>{
        deleteItem(id);
    };

    const onEdit=()=>{
         editItem(id);
    }
   

    return(
    
        <tr >
          <td>{name}</td>
          <td>{startDate}</td>
          <td>{endDate}</td>
          <td>{startTime}</td>
          <td>{endTime}</td>
          <td><AiTwotoneDelete onClick={onDelete}/></td>
          <td><GrEdit onClick={onEdit}/></td>
          <td>{status}</td>
        </tr>
      
    )

}

export default Results