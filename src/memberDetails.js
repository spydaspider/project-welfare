import Navigation from "./nav.js";
import SecondNavigation from "./nav2.js";
import {useHistory, useParams} from 'react-router-dom';
import useFetch from './useFetch.js';
import {useState,useEffect} from 'react';
import CreateMember from './helpers/createMember.js';
import CreateRequestedLoan from './helpers/createRequestedLoan.js';
import CreateBeneficiaries from "./helpers/createBeneficiaries.js";
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
    const [pendingLoan,setPendingLoan] = useState(null);
    const [showBen,setShowBen] = useState(null);
    const [rank,setRank] = useState('');
    const [tickOne,setTickOne] = useState(null);
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
                if(memberLoan)
                {
                    if(Number(memberLoan.loanAmount) !== 0.0)
                    {
                        
                         setPendingLoan(true);
                    }
                    else{
                       setNewSavingsPopup(true);
                        }
                }
                else{
                    setNewSavingsPopup(true);
                    }
                
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
                    let year;
                    let month;
                    let day;
                    setNewSavingsPopup(false);
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
                
                    const memberLoan = new CreateRequestedLoan(applicantName,staffNumber,district,telephone,Number(savingsAmount)+(Number(savingsAmount)*(10/100)),installment,duration,date,endDate);
                    fetch(' http://localhost:8050/requestedLoans',{
                        method: 'POST',
                        headers: {'Content-type': 'Application/json'},
                        body: JSON.stringify(memberLoan)
                    }).then(()=>{
                         window.location.reload();
                        setSavingsAmount('');
                        setSAError(false); 
                    })   
                
                  
                }

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
                    console.log(benefit);

                }

                
    let benefitedMember = new CreateBeneficiaries(applicantName,staffNumber,district,telephone,rank,benefit,date,time);
        fetch('http://localhost:8050/beneficiaries',{
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(benefitedMember)
        }).then(()=>{
            setShowBen(null);
        })
            }
            const handleClose = () =>{
                setNewSavingsPopup(false);
                setShowBen(false);
            }
            const handleCloseErrorDialog = () =>{
                setPendingLoan(null);
            }
            const showBeneficiaries = () =>{
               setShowBen(true);
            }
   return (
    <div className = "membership-form-wrapper">
        <SecondNavigation/>
            <Navigation />
    <div className = "membership-form">
            
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
                <button>Hire Purchase</button>
                <button onClick ={showBeneficiaries}>Beneficiaries</button>
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