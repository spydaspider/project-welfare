import useFetch from '../useFetch.js';
import { useHistory } from "react-router-dom";
import {useState} from 'react';
import CreateIncomes from "../helpers/createIncomes";
import Navigation from '../nav.js';
import SecondNavigation from '../nav2.js';
import CreateStepIncomes from '../helpers/createStepIncomes.js';
const SavingsDeductions = () =>{
  const [prompt,setPrompt] = useState(null);
  const [checkboxError,setCheckboxError] = useState(null);
    const history = useHistory();
    const {data: members} = useFetch('http://localhost:8050/members');
    const {data: incomes} = useFetch('http://localhost:8050/incomes');

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
            members.forEach((member)=>{      
              cumulativeSavings = cumulativeSavings + Number(member.monthlySavings);

            })
           if(incomes.length === 0)
           {
            let income = new CreateIncomes(cumulativeSavings);
              fetch('http://localhost:8050/incomes',{
               method: "POST",
               headers: {"Content-type": "Application/json"},
               body: JSON.stringify(income)
             }).then(()=>{
                 setPrompt(null);
                  history.push('/printSavings');  
                 
 
                
             }) 
           }
           else
           {
                  let existingIncome = 0;
                  incomes.forEach((income)=>{
                    existingIncome = existingIncome + Number(income.income);
                  })
                  let overallIncome = cumulativeSavings + existingIncome;
                  let income = new CreateIncomes(overallIncome);

                   fetch('http://localhost:8050/incomes/'+1,{
              method: "PUT",
              headers: {"Content-type": "Application/json"},
              body: JSON.stringify(income)
            }).then(()=>{
                setPrompt(null);
                
                history.push('/printSavings'); 

               
            }) 
           }
           let stepIncome = new CreateStepIncomes(date,time,cumulativeSavings);
           fetch('http://localhost:8050/stepIncomes',{
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(stepIncome)
           }) 
            
            
          }
        
          

        
        }
        else
        {
          history.push('/printSavings'); 

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
                        <th>AMOUNT</th>
                    </tr>
                   
                </thead>
                <tbody>
                        {members.map((member)=>(
                            <tr>
                            <td>{member.staffNumber}</td>
                            <td>{member.appName}</td>
                            <td>{member.monthlySavings}cedis</td>
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