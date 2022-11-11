import { useEffect } from "react";
import useFetch from "../useFetch";
const PrintLoanDeductions = () =>{
    const {data: members, isPending: isLoading, error} = useFetch('http://localhost:8050/requestedLoans');
    useEffect(()=>{
        if(members)
        {
         window.print();
        }
    },[members])
    return(
        <div className = "savings-deductions">
          {
            members && <table>
                <thead>
                    <tr>
                        <th>STAFF ID</th>
                        <th>FULL NAME</th>
                        <th>INSTALLMENT</th>
                    </tr>
                   
                </thead>
                <tbody>
                        {members.map((member)=>(
                            <tr>
                            <td>{member.staffNumber}</td>
                            <td>{member.appName}</td>
                            <td>{member.installment}</td>
                           </tr>
                        ))}
                       
                    </tbody>
            </table>
          }
      </div>
    )
}
export default PrintLoanDeductions;