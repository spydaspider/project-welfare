import useFetch from "./useFetch";
import {useState,useEffect} from "react";
const ShowBenefits = ({staffNumber}) =>{
    const {data:individualSavings,error} = useFetch('http://localhost:8050/beneficiaries');
     const [filteredIS,setFilteredIS] = useState([]);
     const [totalSavings,setTotalSavings] = useState('');
     useEffect(()=>{
        if(individualSavings)
        {
            let totalSavings = 0;
         let filteredIs = individualSavings.filter((is)=>is.staffNumber === staffNumber);
         setFilteredIS(filteredIs);
         filteredIS.forEach((fis)=>{
             totalSavings = totalSavings + Number(fis.benefitAmount);
         })
         setTotalSavings(totalSavings);
        }
     },[individualSavings])
return(
       
    <div className = "show-is">
       {individualSavings && filteredIS && <h1 className = "total-savings-title">All benefits enjoyed by the applicant.</h1>}
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
                    <th>Rank</th>
                    <th>Benefit</th>
                    <th>Benefit Amount</th>
                    <th>Date</th>
                           </tr>
                        </thead>
                        <tbody>
                            { individualSavings && filteredIS && filteredIS.map((bm)=>(
                                <tr key = {bm.id}>
                                <td>{bm.appName}</td>
                        <td>{bm.staffNumber}</td>
                        <td>{bm.district}</td>
                        <td>{bm.telephone}</td>
                        <td>{bm.rank}</td>
                        <td>{bm.benefit}</td>
                        <td>{Number(bm.benefitAmount).toFixed(2)}cedis</td>
                        <td>{bm.date}</td>

                            </tr>
                            ))}

                        </tbody>
                    </table>
                   
    </div>
)
}
export default ShowBenefits;