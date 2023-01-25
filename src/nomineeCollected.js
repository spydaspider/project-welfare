import useFetch from "./useFetch";
import {useState,useEffect} from "react";
const ShowNomineeCollected = ({staffNumber}) =>{
    const {data:individualSavings,error} = useFetch('http://localhost:8050/nomineesCollection');
     const [filteredIS,setFilteredIS] = useState([]);
     const [totalSavings,setTotalSavings] = useState('');
     useEffect(()=>{
        if(individualSavings)
        {
            let totalSavings = 0;
         let filteredIs = individualSavings.filter((is)=>is.staffNumber === staffNumber);
         setFilteredIS(filteredIs);
         filteredIS.forEach((fis)=>{
             totalSavings = totalSavings + Number(fis.amount);
         })
         setTotalSavings(totalSavings);
        }
     },[individualSavings])
return(
       
    <div className = "show-is">
       {individualSavings && filteredIS && <h1 className = "total-savings-title">Nominees collections.</h1>}
         <div className = "total-savings">
                        <span className = "tsa">Total: {Number(totalSavings).toFixed(2)}cedis</span>
                    </div>
    <table>
                        <thead>
                           <tr>
                    <th>Applicant Name</th>
                    <th>staff Number</th>
                    <th>District</th>
                    <th>Telephone</th>
                    <th>Nominee Name</th>
                    <th>Amount Given</th>
                    <th>Date</th>
                    <th>Time</th>
                           </tr>
                        </thead>
                        <tbody>
                            { individualSavings && filteredIS && filteredIS.map((bm)=>(
                                <tr key = {bm.id}>
                                <td>{bm.appName}</td>
                        <td>{bm.staffNumber}</td>
                        <td>{bm.district}</td>
                        <td>{bm.telephone}</td>
                        <td>{bm.nomineeName}</td>
                        <td>{Number(bm.amount).toFixed(2)}cedis</td>
                        <td>{bm.date}</td>
                        <td>{bm.time}</td>

                            </tr>
                            ))}

                        </tbody>
                    </table>
                   
    </div>
)
}
export default ShowNomineeCollected;