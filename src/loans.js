import useFetch from "./useFetch";
import {useHistory} from 'react-router-dom';
import SecondNavigation from "./nav2";
import Navigation from "./nav";
const Loans = () =>{
    const {data: requestedLoans, isPending: isLoading, error} = useFetch('http://localhost:8050/requestedLoans');
    const history = useHistory();
    const handlePrintLoan = () =>{
           history.push('/printLoan');
    }
    return(
        <div className = "loan-wrapper">
            <SecondNavigation/>
            <Navigation/>
        <div className = "loans">
        <div className = "print-loans">
            <button onClick = {handlePrintLoan}>print</button>
            </div>
            <h1>Al<span>l re</span>qu<span>est</span>e<span>d l</span>o<span>an</span>s.</h1>
            
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
export default Loans;