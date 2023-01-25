import useFetch from "./useFetch";
import {useState,useEffect} from "react";
const ShowIndividualSavings = ({staffNumber}) =>{
    const {data:individualSavings,error} = useFetch('http://localhost:8050/individualSavings');
     const [filteredIS,setFilteredIS] = useState([]);
     const [totalSavings,setTotalSavings] = useState('');
     useEffect(()=>{
        if(individualSavings)
        {
            let totalSavings = 0;
         let filteredIs = individualSavings.filter((is)=>is.staffNumber === staffNumber);
         setFilteredIS(filteredIs);
         filteredIS.forEach((fis)=>{
             totalSavings = totalSavings + Number(fis.pledge);
         })
         setTotalSavings(totalSavings);
        }
     },[individualSavings])
return(
       
    <div className = "show-is">
       {individualSavings && filteredIS && <h1 className = "total-savings-title">Total Savings made by applicant</h1>}
         <div className = "total-savings">
                        <span className = "tsa">Total Savings Amount: {Number(totalSavings).toFixed(2)}cedis</span>
                    </div>
    <table>
                        <thead>
                           <tr>
                            <th>Applicant Name</th>
                            <th>Staff Number</th>
                            <th>District</th>
                            <th>Telephone</th>
                            <th>Monthly Savings</th>
                            <th>Date</th>
                            <th>Time</th>

                           </tr>
                        </thead>
                        <tbody>
                            { individualSavings && filteredIS && filteredIS.map((fis)=>(
                                <tr key = {fis.id}>
                                <td>{fis.appName}</td>
                                <td>{fis.staffNumber}</td>
                                <td>{fis.district}</td>
                                <td>{fis.telephone}</td>
                                <td>{Number(fis.pledge).toFixed(2)}cedis</td>
                                <td>{fis.date}</td>
                                <td>{fis.time}</td>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                   
    </div>
)
}
export default ShowIndividualSavings;