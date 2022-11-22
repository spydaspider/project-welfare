import useFetch from '../useFetch.js';
import { useHistory } from "react-router-dom";
import {useEffect, useState} from 'react';
import CreateIncomes from "../helpers/createIncomes";
import SecondNavigation from '../nav2.js';
import Navigation from '../nav.js';
const SavingsDeductions = () =>{
  const [prompt,setPrompt] = useState(null);
  const [newInstallment,setNewInstallment] = useState('');
  const [checkboxError,setCheckboxError] = useState(null);
    const history = useHistory();
    const {data: members} = useFetch('http://localhost:8050/requestedLoans');
    const {data: incomes} = useFetch('http://localhost:8050/incomes');
      useEffect(()=>{
      if(members)
      {
       
         
      
        members.forEach((rl)=>{
             if(Number(rl.installment) >= Number(rl.loanAmount))
            {
              rl.installment = rl.loanAmount;
              setNewInstallment(rl.installment);
            }
            else
            {
              setNewInstallment(rl.installment);
            } 
            
        })
      }
     },[members])  
    const handlePrintDeductions = () =>{
        setPrompt(true);


    }
    const handleClose = () =>{
      setPrompt(null);
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      const check1 = document.getElementById('dP');
      const check2 = document.getElementById('p');
      if((check1.checked && check2.checked)||(!check1.checked && !check2.checked))
      {
        setCheckboxError(true);

      }
      else
      {
        setCheckboxError(null);
        if(check1.checked)
        {
          let dateTime = new Date();
          let time = dateTime.toISOString().split('T')[1];
          let date = dateTime.toISOString().split('T')[0];
          //After deduction there will be an income.
          let cumulativeSavings = 0;
          if(members)
          {
            let id = 1;
              for(let i = 0; i < members.length; i++)
              {
                
              members[i].loanAmount = Number(members[i].loanAmount)-Number(members[i].installment);
              fetch('http://localhost:8050/requestedLoans/'+id,{
                method: "PATCH",
                headers: {"Content-type": "Application/json"},
                body: JSON.stringify({
                  loanAmount: members[i].loanAmount
                })
              })

              id = id + 1;
             
            }
            
            
            members.forEach((member)=>{      
              cumulativeSavings = cumulativeSavings + Number(member.installment);
              
            })
            let income = new CreateIncomes(date,cumulativeSavings,time);
          
                
                let newIncome = Number(incomes[0].income)+Number(cumulativeSavings);
                fetch('http://localhost:8050/incomes/'+1,{
                   method: "PATCH",
                   headers: {"Content-type": "Application/json"},
                   body: JSON.stringify({
                   income: newIncome,
                   })
                }).then(()=>{
                  setPrompt(null);
                
                history.push('/printLoanDeductions');
                })
              
              

               
            
           
            
            
          }
        
          

        
        }
        else
        {
          history.push('/printOnlyLoan'); 
        }
      }
    }
   
    return (
        <div className = "loan-deductions-wrapper">
         <SecondNavigation/>
         <Navigation/>
{/*         {successPrompt && <SuccessPrompt message = "Monthly savings have been successfully deducted." handleSuccessClose = {handleSuccessClose}/>}
 */}        {prompt && <div className = "prompt-dialog-background">
            <div onClick = {handleClose} className = "prompt-dialog-close">
            <span className = "bar"></span>
            <span className = "bar"></span>
            <span className = "bar"></span>
                
            </div>
          <form onSubmit = {handleSubmit} className = "prompt-dialog">
            {checkboxError && <p className = "error">Please select one.</p>}
            <p className = "prompt-message">These operations cannot be reversed.</p>
            <div className = "c-box">
            <label>Deduct and Print</label>
             
            <input type = "checkbox" id = "dP"/>
            </div>
             <div className = "c-box">
             <label>Print-Only</label>

            <input type = "checkbox" id = "p"/>

            </div>
             <div class = "ok-flex">
            <button className = "ok">Ok</button>
            </div>
            </form>
        </div>
}
      <div className = "savings-deductions">
        <button onClick = {handlePrintDeductions} className = "print-deductions">Print Deductions</button>
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
                           <td>{member.installment}cedis</td>
                           
                           </tr>
                        ))}
                       
                    </tbody>
            </table>
          }
      </div>
      </div>
    )
  }
  export default SavingsDeductions;