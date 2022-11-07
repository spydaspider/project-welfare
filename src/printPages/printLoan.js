import { useEffect } from "react";
import useFetch from "../useFetch.js";
const PrintLoan = () =>{
    const {data: requestedLoans, isPending: isLoading, error} = useFetch('http://localhost:8050/requestedLoans');
     useEffect(()=>{
        if(requestedLoans)
        {
        window.print();
        }
     },[requestedLoans])
    return (
        <div className = "print-table">
             <div className = "print-loan-page">
      
            <h1>All requested loans.</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>STAFF NO</th>
                        <th>LOAN AMOUNT</th>
                        <th>INSTALLMENT</th>
                        <th>DURATION</th>
                        <th>COMMENCEMENT</th>
                        <th>END DATE</th>
                    </tr>
                </thead>
                <tbody>
                {requestedLoans && requestedLoans.map((requestedLoan)=>(
                    <tr>
                       
                            <td>{requestedLoan.appName}</td>
                            <td>{requestedLoan.staffNumber}</td>
                            <td>{requestedLoan.loanAmount}cedis</td>
                            <td>{requestedLoan.installment}cedis</td>
                            <td>{requestedLoan.duration}MONTHS</td>
                            <td>{requestedLoan.date}</td>
                            <td>{requestedLoan.time}</td>
                        </tr>
                       ))}
                </tbody>
            </table>
          

        </div>
        </div>

    )
}
export default PrintLoan;