import {useHistory, useParams} from 'react-router-dom';
import useFetch from './useFetch.js';
import {useState,useEffect} from 'react';
import CreateMember from './helpers/createMember.js';
import CreateRequestedLoan from './helpers/createRequestedLoan.js';
import CreateBeneficiaries from "./helpers/createBeneficiaries.js";
import CreateHirePurchase from "./helpers/createHirePurchase.js";
import SecondNavigation from './nav2.js';
import Navigation from './nav.js';
import CreateIncomes from './helpers/createIncomes.js';
import Store from './helpers/storage.js';
import CreateMLLength from './helpers/createMLLength.js';
import ShowIndividualSavings from './showIndividualSavings.js';
import graIcon from './images/gra.png';
import jsPDF from 'jspdf';

const MemberDetails = () =>{
    const {id} = useParams();
    const {data:members} = useFetch('http://localhost:8050/members');

    const {data:member} = useFetch('http://localhost:8050/members/'+id);
    const {data:memberLoan} = useFetch('http://localhost:8050/requestedLoans/'+id);
    const {data:memberLoans} = useFetch('http://localhost:8050/requestedLoans');
    const {data: incomes} = useFetch('http://localhost:8050/incomes'); 
    const {data: individualSavings} = useFetch('http://localhost:8050/individualSavings');


    const [applicantName,setApplicantName] = useState('');
    const [staffNumber,setStaffNumber] = useState('');
    const [district,setDistrict] = useState('');
    const [telephone, setTelephone] = useState('');
    const [monthlySavings,setMonthlySavings] = useState('');
    const [witnessName, setWitnessName] = useState('');
    const [witnessContact, setWitnessedContact] = useState('');
    const [nomineeName1,setNomineeName1] = useState('');
    const [nomineeName2,setNomineeName2] = useState('');
    const [nomineeName3,setNomineeName3] = useState('');
    const [nRelationship1,setNRelationship1] = useState('');
    const [nRelationship2,setNRelationship2] = useState('');
    const [nRelationship3, setNRelationship3] = useState('');
    const [nPercentage1,setNPercentage1] = useState('');
    const [nPercentage2,setNPercentage2] = useState('');
    const [nPercentage3,setNPercentage3] = useState('');
    const [negativeNumber,setNegativeNumber] = useState(null);
    const [error,setError] = useState(null);
    const [membershipNumber,setMembershipNumber] = useState('');
    const [showNewSavings, setShowNewSavings] = useState(null);
    const [savingsAmount,setSavingsAmount] = useState('');
    const [newSavingsPopup,setNewSavingsPopup] = useState(false);
    const [SAError,setSAError] = useState(false);
    const [installment,setInstallment] = useState('');
    const [duration, setDuration] = useState('');
    const history = useHistory();
    const [payLoanPopup, setPayLoanPopup] = useState(null);
    const [loanPayment,setLoanPayment] = useState('');
    const [loanPaymentAmountError,setLoanPaymentAmountError] = useState(null);
    const [pendingLoan,setPendingLoan] = useState(null);
    const [showBen,setShowBen] = useState(null);
    const [rank,setRank] = useState('');
    const [tickOne,setTickOne] = useState(null);
    const [showHirePurchase, setShowHirePurchase] = useState(null);
    const [nameOfItem, setNameOfItem] = useState('');
    const [itemBrand,setItemBrand] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [interest,setInterest] = useState('');
    const [totalAmount,setTotalAmount] = useState('');
    const [quantity,setQuantity] = useState('');
    const [itemDuration, setItemDuration] = useState('');
    const [lessThanZero,setLessThanZero] = useState('');
    const [noIncome,setNoIncome] = useState(null);
    const [lowIncome,setLowIncome] = useState(null);
    const [showIS, setShowIS] = useState(null);
    const [balance,setBalance] = useState(0);
    const [benefitAmount, setBenefitAmount] = useState(0);
    const [transactionId,setTransactionId] = useState('');
    useEffect(
        ()=>{
             if(member)
             {
                setApplicantName(member.appName);
                setStaffNumber(member.staffNumber);
                setDistrict(member.district);
                setTelephone(member.telephone);
                setMonthlySavings(member.monthlySavings);
                setWitnessName(member.witnessName);
                setWitnessedContact(member.witnessContact);
                setNomineeName1(member.nomineeName1);
                setNomineeName2(member.nomineeName2);
                setNomineeName3(member.nomineeName3);
                setNPercentage1(member.nPercentage1);
                setNPercentage2(member.nPercentag2);
                setNPercentage3(member.nPercentage3);
                setNRelationship1(member.nRelationship1);
                setNRelationship2(member.nRelationship2);
                setNRelationship3(member.nRelationship3);
                setMembershipNumber(member.membershipNumber);
 



                
                
             }
        },[member]
    )
    const handlePayLoan = () =>{
        setPayLoanPopup(true);
    }
    const handleRemove = (e) =>{
        let totalIS = 0;
        let balance = 0;
        e.preventDefault();
          if(individualSavings)
          {
           individualSavings.forEach((is)=>{
            if(is.staffNumber === staffNumber)
            {
                
            totalIS = totalIS + Number(is.pledge);
            }
           })
           if(totalIS > 300)
           {
            balance = totalIS - 300; 
           }
           //substract the balance from the income.
           let income = Number(incomes[0].income);
           let newBalancedIncome;
           if(income > balance)
           {
             newBalancedIncome = income - balance;
           }
           setBalance(balance);
            fetch('http://localhost:8050/incomes/'+1,{
            method: "PATCH",
            headers: {"Content-type":"Application/json"},
            body: JSON.stringify({
                income:newBalancedIncome
            })
           }).then(()=>{
            fetch('http://localhost:8050/Members/'+id,{
                method: 'DELETE'
              }).then(()=>{
             // history.push('/search');
              })
           })
          } 
         
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let dateTime = new Date();
        let time = dateTime.toISOString().split('T')[1];
        let date = dateTime.toISOString().split('T')[0];
        let searchCounter = 0;
        if(members && members.length !== 0)
        {
          
            
                if(nPercentage1 < 0 || nPercentage2 < 0 || nPercentage3 < 0 || monthlySavings < 0)
                {
                    setNegativeNumber(true);
                }
                else{
                //save member
                setNegativeNumber(null);
                setError(null);
                const member = new CreateMember(membershipNumber,applicantName,staffNumber,district,telephone,monthlySavings,witnessName,witnessContact,nomineeName1,nomineeName2,nomineeName3,nRelationship1,nRelationship2,nRelationship3,nPercentage1,nPercentage2,nPercentage3,date,time);
        
                //send to the database.
                fetch('http://localhost:8050/Members/'+id,{
                    method: 'PUT',
                    headers: {"Content-type": "Application/json"},
                    body: JSON.stringify(member)
                }).then(()=>{
                    window.location.reload();
                }).catch((err)=>{
                    setError(err.message);
                })
                }
        
           
            }
            else{
                if(nPercentage1 < 0 || nPercentage2 < 0 || nPercentage3 < 0 || monthlySavings < 0)
                {
                    setNegativeNumber(true);
                }
                else
                {
                    setNegativeNumber(null);
                    setError(null);
                    const member = new CreateMember(membershipNumber,applicantName,staffNumber,district,telephone,monthlySavings,witnessName,witnessContact,nomineeName1,nomineeName2,nomineeName3,nRelationship1,nRelationship2,nRelationship3,nPercentage1,nPercentage2,nPercentage3,date,time);
        
                    fetch('http://localhost:8050/Members/'+id,{
                        method: 'PUT',
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify(member)
                    }).then(()=>{
                        window.location.reload();
                    }).catch((err)=>{
                        setError(err.message);
        
                    })
                
                }
            }
              
            }
            const handleNewSavings = () =>{
                let mlFound = 0; 
                    setNewSavingsPopup(true);
            
                
                
            }
            const handlePop = (e) =>{
                e.preventDefault();
               console.log("Popper");
            }
            const handleNewSavingsSubmit = (e) =>{
                e.preventDefault();
            

                 let dateTime = new Date();
                let time = dateTime.toISOString().split('T')[1];
                let date = dateTime.toISOString().split('T')[0];
                e.preventDefault();
                if(savingsAmount === '' || savingsAmount < 0)
                {
                    setSAError(true);
                }
                else if(installment === '' || installment < 0 || duration === '' || duration < 0)
                {
                    setSAError(true);
                }
                else
                {
                    let year;
                    let month;
                    let day;
                    year = Number(date.substring(0,4));
                    month = Number(date.substring(5,7));
                    day = Number(date.substring(8,10));
                    let endDate;
                    for(let i = 0; i < Number(duration); i++)
                    {
                        if(month === 12)
                        {
                            year = year+1
                            month = 1;
                        }
                        else
                        {
                            month = month+1;
                        }

                    }
                    let strMonth;
                    if((month < 10)&&(day < 10))
                    {
                        endDate = year+"-"+"0"+month+"-"+"0"+day;
                    }
                    else
                    {
                        endDate = year+"-"+month+"-"+day;
                    }
                    if(incomes && incomes.length === 0)
                    {
                        setNoIncome(true);
                        setLowIncome(null);
                        setSAError(null);

                    }
                    else if(Number(incomes[0].income) < Number(savingsAmount))
                    {
                        setLowIncome(true);
                        setNoIncome(null);
                        setSAError(null);
                    }
                    else{
                        setLowIncome(null);
                        setNoIncome(null);

                    const memberLoan = new CreateRequestedLoan(applicantName,staffNumber,district,telephone,Number(savingsAmount)+(Number(savingsAmount)*(10/100)),installment,duration,transactionId,date,endDate);
                    fetch(' http://localhost:8050/requestedLoans',{
                        method: 'POST',
                        headers: {'Content-type': 'Application/json'},
                        body: JSON.stringify(memberLoan)
                    }).then(()=>{
                         window.location.reload();
                        setSavingsAmount('');
                        setSAError(false);
                       
                         setNewSavingsPopup(false);
 
                        //Send the size to the localStorage
                        if(memberLoans)
   {
                        let mLLength = new CreateMLLength(memberLoans.length+1);
       Store.addLocalStorage('requestedLoans',mLLength);
   }
                        //subtract it from the income.
                        let newIncome = Number(incomes[0].income)-Number(savingsAmount);
                        
                         let income = new CreateIncomes(newIncome);
                        fetch('http://localhost:8050/incomes/'+1,{
                            method: "PUT",
                            headers: {"Content-type": "Application/json"},
                            body: JSON.stringify(income)
                        })  
                    })   
                    }
                  
                } 
                

            }
            const handlePrintLoanReceipt = (e) =>{
                e.preventDefault();
                 const doc = new jsPDF("p","pt","a4");
                doc.html(document.querySelector('.new-savings-inner'),{
                  callback: function(pdf){
                    pdf.save("loan receipt.pdf");
                  }
                }
                )
            }
            const handleBeneficiariesSubmit = (e) =>{
                e.preventDefault();
                let dateTime = new Date();
                let time = dateTime.toISOString().split('T')[1];
                let date = dateTime.toISOString().split('T')[0];
                let dos = document.getElementById('dos');
                let pi = document.getElementById('pi');
                let dop = document.getElementById('dop');
                let doc = document.getElementById('doc');
                let mom = document.getElementById('mom');
                let hos = document.getElementById('hos');
                let res = document.getElementById('res');
                let acc = document.getElementById('acc');
                let chb = document.getElementById('chb');
                let nat = document.getElementById('nat');
                let benefit;
              
                if(!dos.checked && !pi.checked && !dop.checked && !doc.checked && !mom.checked && !hos.checked && !res.checked && !acc.checked && !chb.checked && !nat.checked)
                {
                        setTickOne(true);
                }
                else{
                    setTickOne(null);
                    if(dos.checked)
                    {
                        benefit = dos.value;
                    }
                    else if(pi.checked)
                    {
                        benefit = pi.value;
                    }
                    else if(dop.checked)
                    {
                        benefit = dop.value;
                    }
                    else if(doc.checked)
                    {
                        benefit = doc.value;
                    }
                    else if(mom.checked)
                    {
                        benefit = mom.value;
                    }
                    else if(hos.checked)
                    {
                        benefit = hos.value;
                    }
                    else if(res.checked)
                    {
                        benefit = res.value;
                    }
                    else if(acc.checked)
                    {
                        benefit = acc.value;
                    }
                    else if(chb.checked)
                    {
                        benefit = chb.value;
                    }
                    else if(nat.checked)
                    {
                        benefit = nat.value;
                    }

                }
           
                
    let benefitedMember = new CreateBeneficiaries(applicantName,staffNumber,district,telephone,rank,benefit,date,time);
        fetch('http://localhost:8050/beneficiaries',{
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(benefitedMember)
        }).then(()=>{
            setShowBen(null);
            setRank('');
        })
            }
            const handleClose = () =>{
                setNewSavingsPopup(false);
                setShowBen(false);
                setShowHirePurchase(false);
                setShowIS(null);
            }
            const showIndividualSaving = () =>{
                setShowIS(true);
            }
            const handleCloseErrorDialog = () =>{
                setPendingLoan(null);
            }
            const showBeneficiaries = () =>{
               setShowBen(true);
            }
            const handleHirePurchase = () =>{
                setShowHirePurchase(true);
            }
            const handleHirePurchaseSubmit = (e) =>{
                e.preventDefault();
                if(unitPrice < 0 || interest < 0 || quantity < 0 || duration < 0 ||totalAmount < 0)
                {
                    setLessThanZero(true);

                }
                else
                {
                    setLessThanZero(null);
                    let dateTime = new Date();
                    let time = dateTime.toISOString().split('T')[1];
                    let date = dateTime.toISOString().split('T')[0];
                    let hirePurchase = new CreateHirePurchase(applicantName,staffNumber,district,telephone,nameOfItem,itemBrand,unitPrice,interest,totalAmount,quantity,itemDuration,date,time);
                    fetch('http://localhost:8050/hirePurchases',{
                        method: "POST",
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify(hirePurchase)
                    }).then(()=>{
                        setShowHirePurchase(null);
                        setItemBrand('');
                        setNameOfItem('');
                        setQuantity('');
                        setItemDuration('');
                        setInterest('');
                        setUnitPrice('');
                    })
                }

            }
   return (
    <div className = "membership-form-wrapper">
        <SecondNavigation/>
        <Navigation/>
    <div className = "membership-form">
            
            <h1>M<span>em</span>be<span>r Fi</span>le</h1>
            {error && <p className = "error">{error}</p>}
            {negativeNumber&&<p className = "error">Negative number detected.</p>}
            <form onSubmit = {handleSubmit}>                
                <fieldset className = "field-set">
                    <legend className = "header-2">Applicant</legend>
                    <label className = "label-style">Applicants Name</label>
                    <input type = "text" value = {applicantName} onChange = {(e)=>setApplicantName(e.target.value)} required/>
                    <label className = "label-style">Staff Number</label>
                    <input type = "text" value = {staffNumber} onChange = {(e)=>setStaffNumber(e.target.value)} required/>
                    <label className = "label-style">District/Station</label>
                    <input type = "text" value = {district} onChange = {(e)=>setDistrict(e.target.value)} required/>
    
                    <label className = "label-style">Telephone</label>
                    <input type = "text" value = {telephone} onChange = {(e)=>setTelephone(e.target.value)} required/>
            
                    <label className = "label-style">Monthly Savings Amount</label>
                    <input type = "number" value = {monthlySavings} onChange = {(e)=>setMonthlySavings(e.target.value)}/>
                </fieldset>
                <fieldset className = "nominee-field">

                <legend className = "header-2">Nominee</legend>
                <table>
                    <thead>
                    <tr>
                    <th>S/No</th>
                    <th>Name</th>
                    <th>Relationship</th>
                    <th>Percentage</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1.</td>
                        <td><input type = "text" value = {nomineeName1} onChange = {(e)=>setNomineeName1(e.target.value)} required/></td>
                        <td><input type = "text" value = {nRelationship1} onChange = {(e)=>setNRelationship1(e.target.value)} required/></td>
                        <td><input type = "number" value = {nPercentage1} onChange = {(e)=>setNPercentage1(e.target.value)} required/></td>
                    </tr>
                    <tr>
                    <td>2.</td>
                        <td><input type = "text" value = {nomineeName2} onChange = {(e)=>setNomineeName2(e.target.value)}/></td>
                        <td><input type = "text" value = {nRelationship2} onChange = {(e)=>setNRelationship2(e.target.value)}/></td>
                        <td><input type = "number" value = {nPercentage2} onChange = {(e)=>setNPercentage2(e.target.value)}/></td>
                    </tr>
                    <tr>
                    <td>3.</td>
                        <td><input type = "text" value = {nomineeName3} onChange = {(e)=>setNomineeName3(e.target.value)}/></td>
                        <td><input type = "text" value = {nRelationship3} onChange = {(e)=>setNRelationship3(e.target.value)}/></td>
                        <td><input type = "number" value = {nPercentage3} onChange = {(e)=>setNPercentage3(e.target.value)}/></td>
                    </tr>
                    </tbody>
                
                </table>
                
                    <label>Witnessed Name</label>
                    <input type = "text" value = {witnessName} onChange = {(e)=>setWitnessName(e.target.value)} required/>
                
                    <label>Witness Contact</label>
                    <input type = "text" value = {witnessContact} onChange = {(e)=>setWitnessedContact(e.target.value)} required/>

                </fieldset>
                {balance && <p class = "error">The withdrawing Applicant will receive a balance of {Number(balance).toFixed(2)}cedis</p>}
                <div className = "button">
                <button className = "register-button r-b-left">Edit</button>
                <button className = "register-button" onClick = {handleRemove}>Remove</button>
                </div>
            </form>
            <div className = "transactions">
                <h1>Tr<span>a</span>ns<span>a</span>ct<span>io</span>ns</h1>
                <div className = "file-buttons">
                <button onClick = {handleNewSavings} className = "file-button">Request Loan</button>
                <button onClick = {handleHirePurchase} className = "file-button">Hire Purchase</button>
                <button onClick ={showBeneficiaries} className = "file-button">Beneficiaries</button>
                </div>
                <div className = "fbd">
                <button onClick = {showIndividualSaving} className = "file-button">View Individual Savings</button>
                 </div>
            </div>
            {pendingLoan && <div className = "pending-loan">
                        
                            <div className = "top-bar">
                    <div onClick = {handleCloseErrorDialog}className = "close-error-dialog">
                        <span className = "bar-l"></span>
                        <span className = "bar-l"></span>
                        <span className = "bar-l"></span>
                     </div>
                            </div>
                            <div className = "error-message">
                       <p>Sorry, applicant has a loan arrears to pay and therefore cannot request for new loan.</p>
                       </div>
                    </div>}
            {
                newSavingsPopup &&
            <div className = "new-savings-bg">
            <div onClick = {handleClose} className = "close">
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                    </div>
                <div className = "new-savings">
                    <div className = "new-savings-inner">
                   <img className = "request-loan-gra-icon" src = {graIcon} alt = "graIcon"/>
                   
                <h2>Loan Receipt</h2>
                {lowIncome && <p className = "error">The loan amount is greater than the income.</p>}
                {noIncome && <p className = "error">There is no income yet.</p>}
                {SAError && <p className = "error">Enter valid values for all fields.</p>}
                <form>
                    <label>Applicant Name</label>
                   <input type = "text" value = {applicantName} />
                   <label>Staff Number</label>
                   <input type = "text" value = {staffNumber}/>
                   <label>District</label>
                   <input type = "text" value = {district}/>
                   <label>Telephone</label>
                   <input type = "text" value = {telephone}/>
                   <label>Loan Amount</label>
                   <input type = "number" value = {savingsAmount} onChange = {(e)=>setSavingsAmount(e.target.value)}/>
                   <label>Installment Amount</label>

                   <input type = "number" value = {installment} onChange = {(e)=> setInstallment(e.target.value)}/>
                   <label>Duration</label>

                
                   <input type = "number" value = {duration} onChange = {(e)=>setDuration(e.target.value)}/>
                  <label>Transaction Id if any</label>
                  <input type = "text" value = {transactionId} onChange = {(e)=> setTransactionId(e.target.value)}/>

                  
                </form>
                </div>
                <div className = "new-savings-button">
                     <button onClick = {handlePrintLoanReceipt} className = "loan-print">Print</button>
                  <button onClick = {handleNewSavingsSubmit}>Save</button>

                   </div>
                </div>
            </div>
            }
            {
                  showHirePurchase &&
                  <div className = "new-savings-bg">
                  <div onClick = {handleClose} className = "close">
                              <span className = "bar"></span>
                              <span className = "bar"></span>
                              <span className = "bar"></span>
                          </div>
                      <div className = "new-savings">
                         
                      <h2>Goods Received Form</h2>
                      {loanPaymentAmountError && <p className = "error">Enter a valid loan amount.</p>}
                      <form onSubmit = {handleHirePurchaseSubmit}>
                          <label>Applicant's Name</label>
                         <input type = "text" value = {applicantName}/>
                         <label>Staff Number</label>
                         <input type = "text" value = {staffNumber}/>
                         <label>District</label>
                         <input type = "text" value = {district}/>
                         <label>Telephone</label>
                         <input type = "text" value = {telephone}/>
                         <label>Name Of Item</label>
                         <input type = "text" value = {nameOfItem} onChange = {(e)=>setNameOfItem(e.target.value)} required/>
                         <label>Brand</label>
                         <input type = "text" value = {itemBrand} onChange = {(e)=>setItemBrand(e.target.value)} required/>
                         <label>Unit Price</label>
                         <input type = "number" value = {unitPrice} onChange = {(e)=>setUnitPrice(e.target.value)} required/>
                         <label>Interest On Item</label>
                         <input type = "number" value = {interest} onChange = {(e)=>setInterest(e.target.value)} required/>
                         <label>Total Amount</label>
                         <input type = "number" value = {totalAmount} onChange = {(e)=>setTotalAmount(e.target.value)} required/>
                         <label>Quantity</label>
                         <input type = "number" value = {quantity} onChange = {(e)=>setQuantity(e.target.value)} required/>
                         <label>Duration</label>
                         <input type = "text" value = {itemDuration} onChange = {(e)=>setItemDuration(e.target.value)}required/>

                         {lessThanZero && <p className = "error">Please enter a valid number in the number fields</p>}

                         <div className = "new-savings-button">
                         <button>submit</button>
                        
      
                         </div>
                      </form>
                      </div>
                  </div>
            }
            {
                showIS && <div className = "show-individual-savings-bg">
                      <div onClick = {handleClose}className = "close">
                        <span className = "bar-l"></span>
                        <span className = "bar-l"></span>
                        <span className = "bar-l"></span>
                     </div>
                    <ShowIndividualSavings staffNumber = {staffNumber}/>
                    </div>
            }
             {
                showBen &&
            <div className = "new-savings-bg">
            <div onClick = {handleClose} className = "close">
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                    </div>
                <div className = "new-savings">
                   
                <h2>Benefit Form</h2>
                {loanPaymentAmountError && <p className = "error">Enter a valid loan amount.</p>}
                <form onSubmit = {handleBeneficiariesSubmit}>
                    <label>Applicant's Name</label>
                   <input type = "text" value = {applicantName}/>
                   <label>Staff Number</label>
                   <input type = "text" value = {staffNumber}/>
                   <label>District</label>
                   <input type = "text" value = {district}/>
                   <label>Telephone</label>
                   <input type = "text" value = {telephone}/>
                   <label>Rank</label>
                   <input type = "text" value = {rank} onChange = {(e)=>setRank(e.target.value)} required/>
                   <label>Amount</label>
                   <input type = "text" value = {benefitAmount} onChange = {(e)=>setBenefitAmount(e.target.value)} required/>
                   <h3>Section B</h3>
                   {tickOne && <p className = "error">Please select one</p>}
                   <p>CATEGORIES OF ENTILMENTS/BENEFITS</p>
                   <div className = "categories">
                    <div className = "cat">
                   <label>DEATH OF SPOUSE</label>
                   <input type = "checkbox" value = "death of spouse" id = "dos"/>
                   </div>
                   <div className = "cat-right">
                   <label>PROTRACTED ILLNESS</label>
                   <input type = "checkbox" value = "protracted illness" id = "pi"/>
                   </div>
                   <div className = "cat">
                   <label>DEATH OF PARENT</label>
                   <input type = "checkbox" value = "death of parent" id = "dop"/>
                   </div>
                   <div className = "cat-right">
                   <label>DEATH OF CHILD</label>
                   <input type = "checkbox" value = "death of child" id = "doc"/>
                   </div>
                   <div className = "cat">
                   <label>MARRIAGE OF MEMBER</label>
                   <input type = "checkbox" value = "marriage of member" id = "mom"/>
                   </div>
                   <div className = "cat-right">
                   <label>HOSPITALIZATION</label>
                   <input type = "checkbox" value = "hospitalization" id = "hos"/>
                   </div>
                   <div className = "cat">
                   <label>RESIGNATION</label>
                   <input type = "checkbox" value = "resignation" id = "res"/>
                   </div>
                   <div className = "cat-right">
                   <label>ACCIDENT</label>
                   <input type = "checkbox" value = "accident" id = "acc"/>
                   </div>
                   <div className = "cat">
                   <label>CHILD BIRTH</label>
                   <input type = "checkbox" value = "child birth" id = "chb"/>
                   </div>
                   <div className = "cat-right">
                   <label>NATURAL DISASTER</label>
                   <input type = "checkbox" value ="natural disaster" id = "nat"/>
                   </div>



                   </div>
                  
                   <div className = "new-savings-button">
            
                   <button>submit</button>
                  

                   </div>
                </form>
                </div>
            </div>
            }
        </div>
        </div>
   )
}
export default MemberDetails;