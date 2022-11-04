import Navigation from "./nav.js";
import SecondNavigation from "./nav2.js";
import {useHistory, useParams} from 'react-router-dom';
import useFetch from './useFetch.js';
import {useState,useEffect} from 'react';
import CreateMember from './helpers/createMember.js';
import CreateRequestedLoan from './helpers/createRequestedLoan.js';
const MemberDetails = () =>{
    const {id} = useParams();
    const {data:members} = useFetch('http://localhost:8050/members');

    const {data:member} = useFetch('http://localhost:8050/members/'+id);
    const {data:memberLoan} = useFetch('http://localhost:8050/requestedLoans/'+id);

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
    const handleRemove = () =>{
          fetch('http://localhost:8050/Members/'+id,{
            method: 'DELETE'
          }).then(()=>{
            history.push('/search');
          })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        let dateTime = new Date();
        let time = dateTime.toISOString().split('T')[1];
        let date = dateTime.toISOString().split('T')[0];
        let searchCounter = 0;
        console.log(members.length);
        if(members && members.length !== 0)
        {
           /*  members.forEach((member)=>{
                if(member.staffNumber.toLowerCase() === staffNumber.toLowerCase())
                {
                     searchCounter = searchCounter + 1;
                }
            }) */
            
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
        
           /*  else
            {
                setStaffNumberExists(true);
                setNegativeNumber(null);
                setError(null);
            } */
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
                setNewSavingsPopup(true);
            }
            const handleNewSavingsSubmit = (e) =>{
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
                
                    setNewSavingsPopup(false);
                    const memberLoan = new CreateRequestedLoan(applicantName,staffNumber,district,telephone,Number(savingsAmount)+(Number(savingsAmount)*(10/100)),installment,duration,date,time);
                    fetch(' http://localhost:8050/requestedLoans',{
                        method: 'POST',
                        headers: {'Content-type': 'Application/json'},
                        body: JSON.stringify(memberLoan)
                    }).then(()=>{
                        /* window.location.reload();
                        setSavingsAmount('');
                        setSAError(false); */
                    })  
                
                  
                }

            }
            const handlePayLoanSubmit = (e) =>{
                e.preventDefault();
                if(memberLoan)
                {
                    if(loanPayment === '' || Number(loanPayment)< 0)
                    {
                         setLoanPaymentAmountError(true);
                    }
                    else if(Number(loanPayment) > Number(memberLoan.loanAmount))
                    {
                        console.log("Change and owes zero");
                        setLoanPaymentAmountError(null);
                    }
                    else if(Number(loanPayment)<Number(memberLoan.loanAmount))
                    {
                        console.log("Substract and save");
                        setLoanPaymentAmountError(null);
                    }
                    else if(Number(loanPayment) === Number(memberLoan.loanAmount))
                    {
                        console.log("Owes zero");
                        setLoanPaymentAmountError(null);
                    }
                }
            }
            const handleClose = () =>{
                setNewSavingsPopup(false);
                setPayLoanPopup(false);
            }
   return (
    <div className = "membership-form">
            <SecondNavigation/>
            <Navigation />
            <h1>Member file.</h1>
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
                <div className = "button">
                <button className = "register-button">Edit</button>
                <button className = "register-button" onClick = {handleRemove}>Remove</button>
                </div>
            </form>
            <div className = "transactions">
                <h1>Transactions</h1>
                <button onClick = {handleNewSavings}>Request Loan</button>
                <button onClick = {handlePayLoan}>Pay Loan</button>
                <button>View Savings</button>
                <button>View Requested loans</button>
                <button>Hire Purchase</button>
                <button>View Hire Purchase</button>
                <button>Beneficiaries</button>
            </div>
            {
                newSavingsPopup &&
            <div className = "new-savings-bg">
            <div onClick = {handleClose} className = "close">
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                    </div>
                <div className = "new-savings">
                   
                <h2>Request Loan</h2>
                {SAError && <p className = "error">Enter valid values for all fields.</p>}
                <form onSubmit = {handleNewSavingsSubmit}>
                    <label>Applicant Name</label>
                   <input type = "text" value = {applicantName}/>
                   <label>Staff Number</label>
                   <input type = "text" value = {staffNumber}/>
                   <label>District</label>
                   <input type = "text" value = {district}/>
                   <label>Telephone</label>
                   <input type = "text" value = {telephone}/>
                   <input type = "number" value = {savingsAmount} onChange = {(e)=>setSavingsAmount(e.target.value)} placeholder = "loan amount"/>
                   <input type = "number" value = {installment} onChange = {(e)=> setInstallment(e.target.value)} placeholder = "installment amount"/>
                   <input type = "number" value = {duration} onChange = {(e)=>setDuration(e.target.value)} placeholder = "duration in months"/>
                   <div className = "new-savings-button">
                   <button>Save</button>

                   </div>
                </form>
                </div>
            </div>
            }
             {
                payLoanPopup &&
            <div className = "new-savings-bg">
            <div onClick = {handleClose} className = "close">
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                    </div>
                <div className = "new-savings">
                   
                <h2>Pay Loan</h2>
                {loanPaymentAmountError && <p className = "error">Enter a valid loan amount.</p>}
                <form onSubmit = {handlePayLoanSubmit}>
                    <label>Applicant's Name</label>
                   <input type = "text" value = {applicantName}/>
                   <label>Staff Number</label>
                   <input type = "text" value = {staffNumber}/>
                   <label>District</label>
                   <input type = "text" value = {district}/>
                   <label>Telephone</label>
                   <input type = "text" value = {telephone}/>
                   <label>Amount Owed</label>
                   <input type = "number" value = {memberLoan && memberLoan.loanAmount}/>
                   <label>Installment</label>
                   <input type = "number" value = {memberLoan && memberLoan.installment} />
                   <label>Duration</label>
                   <input type = "number" value = {memberLoan && memberLoan.duration}/>
                   <input type = "number" value = {loanPayment} onChange = {(e)=>setLoanPayment(e.target.value)} placeholder = "Enter amount"/>
                   <div className = "new-savings-button">
                   <button>pay loan</button>

                   </div>
                </form>
                </div>
            </div>
            }
        </div>
   )
}
export default MemberDetails;