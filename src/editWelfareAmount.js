import Navigation from "./nav";
import SecondNavigation from "./nav2";
import { useState,useEffect } from 'react';
import useFetch from './useFetch';
const EditWelfareAmount = ()=>{
    const [oldSavingsAmount,setOldSavingsAmount] = useState('');
    const [newSavingsAmount,setNewSavingsAmount] = useState('');
    const [amountError,setAmountError] = useState(null);
    const [amountChanged, setAmountChanged] = useState(null);
    const { data: members, isPending: isLoading, error} = useFetch('http://localhost:8050/members');
    useEffect(()=>{
          if(members)
          {
          setOldSavingsAmount(members[0].monthlySavings);
          }
    },[members])
    const handleNewSavingsAmount = () =>{
        if(newSavingsAmount === ''||newSavingsAmount === '0')
        {
            setAmountError(true);
        }
        else
        {
            setAmountError(null);
            let id = 1;
         for(let idCtr = 0; idCtr < members.length; idCtr++ )
        {
        fetch('http://localhost:8050/members/'+id,{
            method: 'PATCH',
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify({
                monthlySavings:newSavingsAmount
            })
        }).then(()=>{
            setNewSavingsAmount('');
            setAmountChanged(true);
            setTimeout(()=>{
                setAmountChanged(false);
            },5000)
            
        })
        id = id+1;
    }
        }  
        
    }
    return(
        <div className = "edit-welfare-wrapper">
            <SecondNavigation/>
            <Navigation/>
            <div className = "edit-welfare">
                <div className = "old-new">
                    {amountChanged && <div className = "success-sc">Savings amount changed successfully.</div>}
                    {amountError && <div className = "error">Enter a valid savings amount</div>}
                <span className = "old">Old Savings Amount: {oldSavingsAmount}cedis</span>
                <input placeholder = "Enter a new savings amount" type = "number" value = {newSavingsAmount} onChange = {(e)=>setNewSavingsAmount(e.target.value)}/>
                <div className = "old-new-but">
                <button onClick = {handleNewSavingsAmount}>proceed</button>
                </div>
                </div>
            </div>
        </div>
    )

}
export default EditWelfareAmount;