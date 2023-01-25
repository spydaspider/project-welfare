import useFetch from '../useFetch.js';
import { useHistory } from "react-router-dom";
import {useState,useEffect} from 'react';
import CreateIncomes from "../helpers/createIncomes";
import Navigation from '../nav.js';
import SecondNavigation from '../nav2.js';
import CreateStepIncomes from '../helpers/createStepIncomes.js';
import jsPDF from 'jspdf';
import CreateIndividualSavings from '../helpers/createIndividualSavings.js';
import graLogo from '../images/gra.png';
const SavingsDeductions = () =>{
  const [prompt,setPrompt] = useState(null);
  const [checkboxError,setCheckboxError] = useState(null);
  const [date,setDate] = useState('');
  const [numberSavings,setNumberSavings] = useState('');
  const [totalSavingsAmount,setTotalSavingsAmount] = useState('');
    const history = useHistory();
    const {data: members} = useFetch('http://localhost:8050/members');
    const {data: incomes} = useFetch('http://localhost:8050/incomes');
     useEffect(()=>{
      let dateTime = new Date();
      let time = dateTime.toISOString().split('T')[1];
      let date = dateTime.toISOString().split('T')[0];
      if(members)
      {
      setNumberSavings(members.length);
let totalSavingsAmount = 0;
members.forEach((member)=>{
  totalSavingsAmount = totalSavingsAmount + Number(member.monthlySavings);
}
)
setTotalSavingsAmount(totalSavingsAmount);
      }
      setDate(date);
     },[members])
     const handlePrompt = () =>{
         setPrompt(true);
     }
   /*  const handleIndividualSavings = () =>{
      if(members)
      {
        members.forEach((member)=>{
          console.log(member);
           fetch('http://localhost:8050/individualSavings',{
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(member)
           })   
        })
     
      }
    } */
    const handlePrintDeductionsOnly = () =>{
      const doc = new jsPDF("p","pt","a4");
      doc.html(document.querySelector('.savings-deductions'),{
        callback: function(pdf){
          pdf.save("SavingsDeductions.pdf");
        }
      }
      );

    }
    const handlePrintDeductions = (e) =>{
      e.preventDefault();
       const doc = new jsPDF("p","pt","a4");
      doc.html(document.querySelector('.savings-deductions'),{
        callback: function(pdf){
          pdf.save("SavingsDeductions.pdf");
        }
      }
      ) ; 
      let dateTime = new Date();
      let time = dateTime.toISOString().split('T')[1];
      let date = dateTime.toISOString().split('T')[0];
      //After deduction there will be an income.
      let cumulativeSavings = 0;
      if(members)
      {
         
          members.forEach((member)=>{
              let is = new CreateIndividualSavings(member.appName,member.staffNumber,member.district,member.telephone,member.monthlySavings,date,time);
             
              fetch('http://localhost:8050/individualSavings',{
              method: "POST",
              headers: {"Content-type": "Application/json"},
              body: JSON.stringify(is)
             })   
          })
       
        
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
         
            
             }) 
           
          let stepIncome = new CreateStepIncomes(date,time,cumulativeSavings);
       fetch('http://localhost:8050/stepIncomes',{
        method: "POST",
        headers: {"Content-type": "Application/json"},
        body: JSON.stringify(stepIncome)
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
             //Set individual savings.
            
            
                  
          
           
        })
      
         let stepIncome = new CreateStepIncomes(date,time,cumulativeSavings);
       fetch('http://localhost:8050/stepIncomes',{
        method: "POST",
        headers: {"Content-type": "Application/json"},
        body: JSON.stringify(stepIncome)
       })   
       }
       
        
        
      }
    
      

     
    }
    const handleClose = () =>{
      setPrompt(null);
      window.location.reload();
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
           <form className = "prompt-dialog" onSubmit = {handlePrintDeductions}>
            {checkboxError && <p className = "error">Please select one.</p>}
            <p className = "prompt-message">This operation can be hardly reversed. However, quickly contact developer if reversal is needed.</p>
            
             <div className = "ok-flex">
          
            <button className = "ok">Ok</button>
            </div>
            </form>  
        </div>
}
<button onClick = {handlePrompt} className = "print-deductions">Generate PDF and Deduct</button>
<button onClick = {handlePrintDeductionsOnly} className = "print-deductions">Generate PDF Only</button>


      <div className = "savings-deductions">
      <img className = "gra-logo" src = {graLogo} alt = "gra-icon"/>

      <h2 className = "loan-deduction-header">CLEANERS WELFARE ASSOCIATION SAVINGS {date}</h2>

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
          <div className = "row-flex-savings">
          <strong>Total:</strong>
          <p className = "savers">{numberSavings}</p>
          <p className = "total-savings-amount">{totalSavingsAmount}cedis</p>
          </div>
      </div>
      </div>
    )
  }
  export default SavingsDeductions;