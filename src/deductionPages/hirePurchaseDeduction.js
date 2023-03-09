import useFetch from '../useFetch.js';
import { useHistory } from "react-router-dom";
import {useEffect, useState} from 'react';
import CreateIncomes from "../helpers/createIncomes";
import SecondNavigation from '../nav2.js';
import Navigation from '../nav.js';
import jsPDF from 'jspdf';
import graLogo from '../images/gra.png';
const HirePurchaseDeduction = () =>{
  const [prompt,setPrompt] = useState(null);
  const [newInstallment,setNewInstallment] = useState('');
  const [checkboxError,setCheckboxError] = useState(null);
  const [date,setDate] = useState('');
    const history = useHistory();
    const {data: members} = useFetch('http://localhost:8050/hirePurchases');
    const {data: incomes} = useFetch('http://localhost:8050/incomes');
    const [filteredMembers,setFilteredMembers] = useState('');
    const [numberLoaners,setNumberLoaners] = useState('');
    const [totalLoanAmount,setTotalLoanAmount] = useState('');
      useEffect(()=>{
      if(members)
      {
       
         
        let dateTime = new Date();
let time = dateTime.toISOString().split('T')[1];
let date = dateTime.toISOString().split('T')[0];
let filtMembers = members.filter((member)=>member.loanAmount !== 0);
setFilteredMembers(filtMembers);
setNumberLoaners(filtMembers.length);
let totalLoanAmount = 0;
members.forEach((member)=>{
  totalLoanAmount = totalLoanAmount + Number(member.totalAmount);
}
)
setTotalLoanAmount(totalLoanAmount);
setDate(date);
        members.forEach((rl)=>{
             if(Number(rl.installment) >= Number(rl.totalAmount))
            {
              rl.installment = rl.totalAmount;
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
      /*   setPrompt(true); */
      const doc = new jsPDF("p","pt","a4");
      doc.html(document.querySelector('.savings-deductions'),{
        callback: function(pdf){
          pdf.save("HirePurchaseDeductions.pdf");
        }
      }
      );
      let dateTime = new Date();
      let time = dateTime.toISOString().split('T')[1];
      let date = dateTime.toISOString().split('T')[0];
      //After deduction there will be an income.
      let cumulativeSavings = 0;
      if(members)
      {
        let id = 1;
        let length
          for(let i = 0; i < members.length; i++)         
          {
          
            members[i].totalAmount = Number(members[i].totalAmount)-Number(members[i].installment);
            fetch('http://localhost:8050/hirePurchases/'+id,{
            method: "PATCH",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify({
              totalAmount: members[i].totalAmount
            })
          })

        
      
        id = id+1;
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
              
            })
          
          

           
        
       
        
        
      }
    
      

    

    }
    const handlePrintDeductionsOnly = () =>{
      /*   setPrompt(true); */
      const doc = new jsPDF("p","pt","a4");
      doc.html(document.querySelector('.savings-deductions'),{
        callback: function(pdf){
          pdf.save("loanDeductions.pdf");
        }
      }
      );


    }
    const handleClose = () =>{
      setPrompt(null);
      window.location.reload();

    }
    const handlePrompt = () =>{
      setPrompt(true);
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
          
        }//stop
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
            <p className = "prompt-message">This operation can hardly be reversed, however contact the developer if reversal is needed.</p>
             <div class = "ok-flex">
            <button onClick = {handlePrintDeductions} className = "ok">Ok</button>
            </div>
            </form>
        </div>
}

      <button onClick = {handlePrompt} className = "print-deductions">Generate PDF and Deduct</button>
      <button onClick = {handlePrintDeductionsOnly} className = "print-deductions">Generate PDF only</button>

      <div className = "savings-deductions">
         <img className = "gra-logo" src = {graLogo} alt = "gra-icon"/>
          <h2 className = "loan-deduction-header">ALL COST CENTERS HIRE PURCHASE DEDUCTION DETAIL {date}</h2>
     {           members && <table id = "loan-deduction-table">
                <thead> 
                    <tr>
                        <th>STAFF ID</th>
                        <th>FULL NAME</th>
                        <th>INSTALLMENT</th>
                    </tr>
                   
                </thead>
                <tbody>
                        {members && filteredMembers && filteredMembers.map((member)=>(
                            <tr>
                            <td>{member.staffNumber}</td>
                            <td>{member.appName}</td>
                           <td>{member.installment}cedis</td>
                           
                           </tr>
                        ))}
                       
                    </tbody>
            </table>
            
          }
          <div className = "row-flex">
          <strong>Total:</strong>
          <p className = "loaners">{numberLoaners}</p>
          <p className = "total-amount">{totalLoanAmount}cedis</p>
          </div>

      </div>
      </div>
    )
  }
  export default HirePurchaseDeduction;