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
import ShowPurchased from './showPurchased.js';
import ShowBenefits from './showBenefits.js';
import CreateNominee from './helpers/createNominee.js';
import ShowNomineeCollected from './nomineeCollected.js';


const MemberDetails = () =>{
    const {id} = useParams();
    const {data:members} = useFetch('http://localhost:8050/members');

    const {data:member} = useFetch('http://localhost:8050/members/'+id);
    const {data:memberLoan} = useFetch('http://localhost:8050/requestedLoans/'+id);
    const {data:memberLoans} = useFetch('http://localhost:8050/requestedLoans');
    const {data: incomes} = useFetch('http://localhost:8050/incomes'); 
    const {data: individualSavings} = useFetch('http://localhost:8050/individualSavings');
    const {data: beneficiaries} = useFetch('http://localhost:8050/beneficiaries');
    const {data: hirePurchases} = useFetch('http://localhost:8050/hirePurchases');
    const {data: nomineesCollection} = useFetch('http://localhost:8050/nomineesCollection');


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
    const [benefitAmount, setBenefitAmount] = useState('');
    const [transactionId,setTransactionId] = useState('');
    const [showPurchased,setShowPurchased] = useState('');
    const [showBenefits,setShowBenefits] = useState(null);
    const [notEnoughFunds,setNotEnoughFunds] = useState(null);
    const [lowBenefitIncome,setLowBenefitIncome] = useState(null);
    const [negativeBenefitAmount,setNegativeBenefitAmount] = useState(null);
    const [itemPaymentInstallment,setItemPaymentInstallment] = useState(null);
    const [checkboxError,setCheckboxError] = useState(null);
    const [clearApplicantPrompt,setClearApplicantPrompt] = useState(null);
    const [prompt,setPrompt] = useState(null);
    const [nomineesCollectionPopup,setNomineesCollectionPopup] = useState(null);
    const [percentageAmount1,setPercentageAmount1] = useState(null);
    const [percentageAmount2, setPercentageAmount2] = useState(null);
    const [percentageAmount3, setPercentageAmount3] = useState(null);
    const [nomineeAmountGiven,setNomineeAmountGiven] = useState(null);
    const [nomineeName,setNomineeName] = useState(null);
    const [nomineeNotFound, setNomineeNotFound] = useState(null);
    const [percentageAmountNotFound,setPercentageAmountNotFound] = useState(null);
    const [showNomineeCollected,setShowNomineeCollected] = useState(null);
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
                setNPercentage2(member.nPercentage2);
                setNPercentage3(member.nPercentage3);
                setNRelationship1(member.nRelationship1);
                setNRelationship2(member.nRelationship2);
                setNRelationship3(member.nRelationship3);
                setMembershipNumber(member.membershipNumber);
                if(individualSavings)
                {
                    let totalSavings = 0;
                    individualSavings.forEach((is)=>{
                        if(is.staffNumber === staffNumber)
                        {
                               totalSavings = totalSavings + Number(is.pledge);
                        }
                        
                    })
                    let amount1,amount2,amount3;
                    amount1 = (Number(nPercentage1)/100)*totalSavings;
                    amount2 = (Number(nPercentage2)/100)*totalSavings;
                    amount3 = (Number(nPercentage3)/100)*totalSavings;
                    setPercentageAmount1(amount1);
                    setPercentageAmount2(amount2);
                    setPercentageAmount3(amount3);



                }
                  }
        },[member]
    )
    const handleNomineeCollected = () =>{
        setShowNomineeCollected(true);
    }
    const handleNomineeCollectionSubmit = (e) =>{
        e.preventDefault();
        let dateTime = new Date();
        let time = dateTime.toISOString().split('T')[1];
        let date = dateTime.toISOString().split('T')[0];
        if(nomineeName)
        {
            if((nomineeName !== nomineeName1)&&(nomineeName !== nomineeName2)&&(nomineeName !== nomineeName3))
            {
                setNomineeNotFound(true);
                setPercentageAmountNotFound(null);
                setLowIncome(null);
                setNoIncome(null);

            } 
            else if((Number(nomineeAmountGiven) !== Number(percentageAmount1) )&&(Number(nomineeAmountGiven) !== Number(percentageAmount2))&&(Number(nomineeAmountGiven) !== Number(percentageAmount3)))
            {
                setPercentageAmountNotFound(true);
                setNomineeNotFound(null);
                setLowIncome(null);
                setNoIncome(null);

            }
            else{
                   setPercentageAmountNotFound(null);
                   setNomineeNotFound(null);
                   setLowIncome(null);
                   setNoIncome(null);
                   if(incomes && incomes.length === 0)
                   {
                       setNoIncome(true);
                       setLowIncome(null);
                       setPercentageAmountNotFound(null);
                       setNomineeNotFound(null);

                   }
                   else if(Number(incomes[0].income) < Number(savingsAmount))
                   {
                       setLowIncome(true);
                       setNoIncome(null);
                       setPercentageAmountNotFound(null);
                       setNomineeNotFound(null);
                   }
                   else{
                   //send to database.
                   let nominee = new CreateNominee(applicantName,staffNumber,district,telephone,nomineeName,nomineeAmountGiven,date,time);
                    fetch('http://localhost:8050/nomineesCollection',{
                    method: "POST",
                     headers: {"Content-type": "Application/json"},
                   body: JSON.stringify(nominee)
                   }).then(()=>{
                      setNomineeAmountGiven('');
                      setNomineeName('');
                      setNomineesCollectionPopup(null);
                   })
                   let newIncome = Number(incomes[0].income) - Number(nomineeAmountGiven);
                        
                   let income = new CreateIncomes(newIncome);
                  fetch('http://localhost:8050/incomes/'+1,{
                      method: "PUT",
                      headers: {"Content-type": "Application/json"},
                      body: JSON.stringify(income)
                  })  
                }
                   
                }
        }
        
    }
    const handleClearApplicant = (e) =>{
        e.preventDefault(e);
       setClearApplicantPrompt(true);

    }
    const handlePrompt = (e) =>{
        e.preventDefault();
        setPrompt(true);
    }
    const handleDeferment = (e) =>{
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
            balance = (20/100)*totalIS; 
           
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
                method: "PATCH",
                headers: {"Content-type":"Application/json"},
                body: JSON.stringify({
                    dropout: true
                })
              }).then(()=>{
                       setPrompt(null);
              })
           })  
           
          } 
         
    }
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
           
            balance = (60/100)*totalIS; 
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
            method: "PATCH",
            headers: {"Content-type": "Application/json"},    
            body: JSON.stringify({
                    dropout: true
                })
            }).then(()=>{
                  setPrompt(null);
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
                    if(memberLoans && memberLoans.length !== 0)
                    {
                    fetch('http://localhost:8050/requestedLoans/'+id,{
                        method: 'PATCH',
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify({
                            staffNumber: staffNumber
                        })
                    })

                    }
                    if(individualSavings && individualSavings.length !== 0)
                    {
                    fetch('http://localhost:8050/individualSavings/'+id,{
                        method: 'PATCH',
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify({
                            staffNumber: staffNumber
                        })
                    })

                    }
                    if(beneficiaries && beneficiaries.length !== 0)
                    {
                    fetch('http://localhost:8050/beneficiaries/'+id,{
                        method: 'PATCH',
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify({
                            staffNumber: staffNumber
                        })
                    })

                    }
                    if(hirePurchases && hirePurchases.length !== 0)
                    {
                    fetch('http://localhost:8050/hirePurchases/'+id,{
                        method: 'PATCH',
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify({
                            staffNumber: staffNumber
                        })
                    })

                    }
                    if(nomineesCollection && nomineesCollection.length !== 0)
                    {
                    fetch('http://localhost:8050/nomineesCollection/'+id,{
                        method: 'PATCH',
                        headers: {"Content-type": "Application/json"},
                        body: JSON.stringify({
                            staffNumber: staffNumber
                        })
                    })

                    }
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
                        if(memberLoans && memberLoans.length !== 0)
                        {
                        fetch('http://localhost:8060/requestedLoans/'+id,{
                            method: 'PATCH',
                            headers: {"Content-type": "Application/json"},
                            body: JSON.stringify({
                                staffNumber: staffNumber
                            })
                        })
    
                        }
                        if(individualSavings && individualSavings.length !== 0)
                        {
                        fetch('http://localhost:8060/individualSavings/'+id,{
                            method: 'PATCH',
                            headers: {"Content-type": "Application/json"},
                            body: JSON.stringify({
                                staffNumber: staffNumber
                            })
                        })
    
                        }
                        if(beneficiaries && beneficiaries.length !== 0)
                        {
                        fetch('http://localhost:8060/beneficiaries/'+id,{
                            method: 'PATCH',
                            headers: {"Content-type": "Application/json"},
                            body: JSON.stringify({
                                staffNumber: staffNumber
                            })
                        })
    
                        }
                        if(hirePurchases && hirePurchases.length !== 0)
                        {
                        fetch('http://localhost:8060/hirePurchases/'+id,{
                            method: 'PATCH',
                            headers: {"Content-type": "Application/json"},
                            body: JSON.stringify({
                                staffNumber: staffNumber
                            })
                        })
    
                        }
                        if(nomineesCollection && nomineesCollection.length !== 0)
                        {
                        fetch('http://localhost:8060/nomineesCollection/'+id,{
                            method: 'PATCH',
                            headers: {"Content-type": "Application/json"},
                            body: JSON.stringify({
                                staffNumber: staffNumber
                            })
                        })
    
                        }
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
              
                if(!dos.checked &&!pi.checked && !dop.checked && !doc.checked && !mom.checked && !hos.checked && !res.checked && !acc.checked && !chb.checked && !nat.checked)
                {
                        setTickOne(true);
                        setLowBenefitIncome(null);
                        setNegativeBenefitAmount(null);

                }
                else{
                    setTickOne(null);
                    setLowBenefitIncome(null);
                    setNegativeBenefitAmount(null);

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
 
             if(incomes)
             {               
             let income = Number(incomes[0].income);
             if(benefitAmount > income)
             {
                setLowBenefitIncome(true);
                setTickOne(false);
                setNegativeBenefitAmount(null);

             }
             else if(benefitAmount < 0)
             {
                setNegativeBenefitAmount(true);
                setTickOne(false);
                setLowBenefitIncome(null);
             }
             else
             {
                setNegativeBenefitAmount(null);
                setTickOne(null);
                setLowBenefitIncome(null); 
                let benefitIncome = income - benefitAmount;
                let newBenefitIncome = new CreateIncomes(benefitIncome);
                
                
     let benefitedMember = new CreateBeneficiaries(applicantName,staffNumber,district,telephone,rank,benefit,benefitAmount,date,time);
        fetch('http://localhost:8050/beneficiaries',{
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(benefitedMember)
        }).then(()=>{
            setShowBen(null);
            setRank('');
            setBenefitAmount('');
            fetch('http://localhost:8050/incomes/'+1,{
                method: 'PUT',
                headers: {'Content-type': 'Application/json'},
                body: JSON.stringify(newBenefitIncome)
            })
        }) 
    }
    }
    }
            }
            const handleClose = () =>{
                setNewSavingsPopup(false);
                setShowBen(false);
                setShowHirePurchase(false);
                setShowIS(null);
                setShowPurchased(null);
                setShowBenefits(null);
                setPrompt(null);
                setClearApplicantPrompt(null);
                setNomineesCollectionPopup(null);
                setShowNomineeCollected(null);
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
            const handleRequestedLoans = () =>{
                setShowHirePurchase(true);
            }
            const handleRequestedBenefits = () =>{
                setShowBenefits(true);

            }
            const handlePurchased = () =>{
                setShowPurchased(true);

            }
            const handleNomineeCollection = () =>{
                 setNomineesCollectionPopup(true);
            }
            const handleHirePurchaseSubmit = (e) =>{
                e.preventDefault();
                let totalAmountField = document.getElementById('total-amount');
                let totalAmt = Number(totalAmountField.value);
             if(unitPrice < 0 || interest < 0 || quantity < 0 || duration < 0 ||totalAmt < 0)
                {
                    setLessThanZero(true);
                    setNotEnoughFunds(null);
                  
                }
                else
                {
                    setLessThanZero(null);
                    let dateTime = new Date();
                    let time = dateTime.toISOString().split('T')[1];
                    let date = dateTime.toISOString().split('T')[0];
                    let yearPurchase;
                    let monthPurchase;
                    let dayPurchase;
                    yearPurchase = Number(date.substring(0,4));
                    monthPurchase = Number(date.substring(5,7));
                    dayPurchase = Number(date.substring(8,10));
                    let purchaseEndDate;
                    for(let i = 0; i < Number(itemDuration); i++)
                    {
                        if(monthPurchase === 12)
                        {
                            yearPurchase = yearPurchase+1
                            monthPurchase = 1;
                        }
                        else
                        {
                            monthPurchase = monthPurchase+1;
                        }

                    }
                    let strMonth;
                    if((monthPurchase < 10)&&(dayPurchase < 10))
                    {
                        purchaseEndDate = yearPurchase+"-"+"0"+monthPurchase+"-"+"0"+dayPurchase;
                    }
                    else
                    {
                        purchaseEndDate = yearPurchase+"-"+monthPurchase+"-"+dayPurchase;
                    }
            
                    //get the income and do substractions.
                    if(incomes)
                    {
                       let totalIncome = Number(incomes[0].income);
                       if(totalAmt > totalIncome)
                       {
                           setNotEnoughFunds(true);
                           setLessThanZero(null);
                         

                       }
                       else{
                                     
                        setNotEnoughFunds(null);
                        setLessThanZero(null);
                        let newPurchaseIncome = totalIncome - totalAmt;
                        let purchaseIncome = new CreateIncomes(newPurchaseIncome);
                    
                    let hirePurchase = new CreateHirePurchase(applicantName,staffNumber,district,telephone,nameOfItem,itemBrand,unitPrice,interest,totalAmt,quantity,itemDuration,itemPaymentInstallment,date,purchaseEndDate,time);
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
                        setItemPaymentInstallment('');
                        fetch('http://localhost:8050/incomes/'+1,{
                            method: 'PUT',
                            headers: {'Content-type':'Application/json'},
                            body: JSON.stringify(purchaseIncome)
                        }) 
                    })  
                }
            }
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
            
                    <label className = "label-style">Monthly Dues</label>
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
            
                {balance && <p className = "balance-style">The withdrawing Applicant will receive a balance of {Number(balance).toFixed(2)}cedis</p>}
                <div className = "c-e-r">
                <button className = "r-b-left">Edit</button>
                <button className = "r-b-right" onClick = {handlePrompt}>Remove</button>
               
                </div>
             
            </form>
            <div className = "transactions">
                <h1>Possible Tr<span>a</span>ns<span>a</span>ct<span>io</span>ns</h1>
                <div className = "file-buttons">
                <button onClick = {handleNewSavings} className = "file-button">Request Loan</button>
                <button onClick = {handleHirePurchase} className = "file-button">Purchase</button>
                <button onClick ={showBeneficiaries} className = "file-button">Beneficiaries</button>
                </div>
                <div className = "file-buttons">
                <button onClick = {showIndividualSaving} className = "file-button">Saved</button>

                <button onClick = {handlePurchased} className = "file-button">Purchased</button>

                <button onClick ={handleRequestedBenefits} className = "file-button">Benefited</button>
                </div>
                <div className = "fbd">
                       <button onClick = {handleNomineeCollection} className = "file-button f-w">Nominees Collection</button>
                       <button onClick = {handleNomineeCollected} className = "file-button f-w">Nominees Collected</button>

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
                 nomineesCollectionPopup &&
            <div className = "new-savings-bg">
            <div onClick = {handleClose} className = "close">
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                        <span className = "bar"></span>
                    </div>
                <div className = "new-savings">
                    <div className = "new-savings-inner">
                   
                <h2>Nominees Collection</h2>
                {lowIncome && <p className = "error">Low income, cannot proceed with this action.</p>}
                {noIncome && <p className = "error">No income yet.</p>}

                {percentageAmountNotFound && <p className = "error">Enter the correct amount for the nominee.</p>}
                {nomineeNotFound && <p className = "error">Enter the correct nominee.</p>}
                {SAError && <p className = "error">Enter valid values for all fields.</p>}
                <form className = "nominees-collection">
                    <label>Applicant Name</label>
                   <input type = "text" value = {applicantName} />
                   <label>Staff Number</label>
                   <input type = "text" value = {staffNumber}/>
                   <label>District</label>
                   <input type = "text" value = {district}/>
                   <label>Telephone</label>
                   <input type = "text" value = {telephone}/>
                   <label>List of Nominees</label>
                   <table>
                    <thead>
                        <tr>
                            <th>Nominee Name</th>
                            <th>Percentage</th>
                            <th>Amount</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            percentageAmount1 &&
                        <tr>
                            <td><input type = "text" value = {nomineeName1}/></td>
                            <td><input type = "text" value = {nPercentage1}/></td>
                            <td><input type = "text" value = {Number(percentageAmount1).toFixed(2)+"cedis"}/></td>
                        </tr>
                          }
                          {
                            percentageAmount2 &&
                        <tr>
                            <td><input type = "text" value = {nomineeName2}/></td>
                            <td><input type = "text" value = {nPercentage2}/></td>
                            <td><input type = "text" value = {Number(percentageAmount2).toFixed(2)+"cedis"}/></td>
                        </tr>
                            }
                            {
                            percentageAmount3 &&
                        <tr>
                            <td><input type = "text" value = {nomineeName3}/></td>
                            <td><input type = "text" value = {nPercentage3}/></td>
                            <td><input type = "text" value = {Number(percentageAmount3).toFixed(2)+"cedis"}/></td>
                        </tr>
                            }
                    </tbody>
                   </table>
                   <label>Nominee Name</label> 

                  <input type = "text" value = {nomineeName} onChange = {(e)=>setNomineeName(e.target.value)} required/>
                  <label>Amount given to Nominee</label> 

<input type = "number" value = {nomineeAmountGiven} onChange = {(e)=>setNomineeAmountGiven(e.target.value)} required/>
                     <div className = "new-savings-button">
                     <button onClick = {handleNomineeCollectionSubmit}>Save</button>

                     </div>

                {/*    <input type = "number" value = {installment} onChange = {(e)=> setInstallment(e.target.value)}/>
                   <label>Duration</label>

                
                   <input type = "number" value = {duration} onChange = {(e)=>setDuration(e.target.value)}/>
                  <label>Transaction Id if any</label>
                  <input type = "text" value = {transactionId} onChange = {(e)=> setTransactionId(e.target.value)}/>
 */}
                  
                </form>
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
                         <input id = "total-amount" type = "number" value = {Number(unitPrice)+Number(interest)}/>
                        

                         <label>Quantity</label>
                         <input type = "number" value = {quantity} onChange = {(e)=>setQuantity(e.target.value)} required/>
                         <label>Duration</label>
                         <input type = "text" value = {itemDuration} onChange = {(e)=>setItemDuration(e.target.value)}required/>
                         <label>Installment</label>
                         <input type = "text" value = {itemPaymentInstallment} onChange = {(e)=>setItemPaymentInstallment(e.target.value)}required/>
                         {notEnoughFunds && <p className = 'error'>Not enough funds to purchase the item.</p> }

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
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                     </div>
                    <ShowIndividualSavings staffNumber = {staffNumber}/>
                    </div>
            }
             {
                showPurchased && <div className = "show-individual-savings-bg">
                      <div onClick = {handleClose}className = "close">
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                     </div>
                    <ShowPurchased staffNumber = {staffNumber}/>
                    </div>
            }
             {
                showBenefits && <div className = "show-individual-savings-bg">
                      <div onClick = {handleClose}className = "close">
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                     </div>
                    <ShowBenefits staffNumber = {staffNumber}/>
                    </div>
            }
             {
                showNomineeCollected && <div className = "show-individual-savings-bg">
                      <div onClick = {handleClose}className = "close">
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                        <span className = "bar-w"></span>
                     </div>
                    <ShowNomineeCollected staffNumber = {staffNumber}/>
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
                   <input type = "number" value = {benefitAmount} onChange = {(e)=>setBenefitAmount(e.target.value)} required/>
                   <h3>Section B</h3>
                   {tickOne && <p className = "error">Please select one</p>}
                   {lowBenefitIncome && <p className = "error">Low on income, cannot proceed with the transaction</p>}
                   {negativeBenefitAmount && <p className = "error">Negative amount value detected in amount field</p>}
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
              {prompt && <div className = "prompt-dialog-background">
          <div onClick = {handleClose} className = "prompt-dialog-close">
            <span className = "bar"></span>
            <span className = "bar"></span>
            <span className = "bar"></span>

            </div>
              <form className = "prompt-dialog">
            {checkboxError && <p className = "error">Please select one.</p>}
            <p className = "prompt-message">These operation can hardly be reversed, however contact the developer if reversal is needed.</p>
             <div class = "ok-flex-around">
            <button onClick = {handleDeferment} className = "ok">Deferment from Savings</button>
            <button onClick = {handleRemove} className = "ok">Retirement</button>
            </div>
            </form>
            </div>
            }


        </div>
        </div>
   )
}
export default MemberDetails;