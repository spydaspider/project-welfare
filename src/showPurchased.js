import useFetch from "./useFetch";
import {useState,useEffect} from "react";
const ShowPurchased = ({staffNumber}) =>{
    const {data:individualSavings,error} = useFetch('http://localhost:8050/hirePurchases');
     const [filteredIS,setFilteredIS] = useState([]);
     const [totalSavings,setTotalSavings] = useState('');
     useEffect(()=>{
        if(individualSavings)
        {
            let totalSavings = 0;
         let filteredIs = individualSavings.filter((is)=>is.staffNumber === staffNumber);
         setFilteredIS(filteredIs);
         filteredIS.forEach((fis)=>{
             totalSavings = totalSavings + Number(fis.totalAmount);
         })
         setTotalSavings(totalSavings);
        }
     },[individualSavings])
return(
       
    <div className = "show-is">
       {individualSavings && filteredIS && <h1 className = "total-savings-title">All items purchased by the applicant.</h1>}
         <div className = "total-savings">
                        <span className = "tsa">Total: {Number(totalSavings).toFixed(2)}cedis</span>
                    </div>
    <table>
                        <thead>
                           <tr>
                    <th>Name</th>
                    <th>Staff No.</th>
                    <th>District</th>
                    <th>Telephone</th>
                    <th>Item</th>
                    <th>Installment</th>
                    <th>Total Amt</th>
                    <th>Brand</th>
                    <th>Qty</th>
                    <th>Duration</th>
                    <th>Start Date</th>
                    <th>End Date</th>

                           </tr>
                        </thead>
                        <tbody>
                            { individualSavings && filteredIS && filteredIS.map((hp)=>(
                                <tr key = {hp.id}>
                                 <td>{hp.appName}</td>
                            <td>{hp.staffNumber}</td>
                            <td>{hp.district}</td>
                            <td>{hp.telephone}</td>
                            <td>{hp.itemName}</td>
                            <td>{Number(hp.unitPrice).toFixed(2)}cedis</td>
                            <td>{Number(hp.totalAmount).toFixed(2)}cedis</td>
                            <td>{hp.itemBrand}</td>
                            <td>{hp.quantity}</td>
                            <td>{hp.duration}</td>
                            <td>{hp.startDate}</td>
                            <td>{hp.endDate}</td>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                   
    </div>
)
}
export default ShowPurchased;