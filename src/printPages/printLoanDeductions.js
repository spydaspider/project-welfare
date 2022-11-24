import { useEffect,useState } from "react";
import Store from "../helpers/storage";
import useFetch from "../useFetch";
const PrintLoanDeductions = () =>{
    const {data: members, isPending: isLoading, error} = useFetch('http://localhost:8050/requestedLoans');
    const [filteredMembers,setFilteredMembers] = useState([]);
    useEffect(()=>{
      if(members)
      {
        
        
        
       
        
        let filtMembers = members.filter((member)=>member.loanAmount !== 0);
        setFilteredMembers(filtMembers);
       
      }
    
    },[members])
 
    return(
        <div className = "savings-deductions">
          {
            members && filteredMembers && <table>
                <thead>
                    <tr>
                        <th>STAFF ID</th>
                        <th>FULL NAME</th>
                        <th>INSTALLMENT</th>
                    </tr>
                   
                </thead>
                <tbody>
                        {filteredMembers.map((member)=>(
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