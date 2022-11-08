import Navigation from "./nav";
import SecondNavigation from "./nav2";
import {useHistory} from 'react-router-dom';
const Deductions =()=>{
    const history = useHistory();
    const handleSavingsDeduction = () =>{
         history.push('/savingsDeductions');
    }
    const handleLoanDedution = () =>{
        history.push('/loanDeductions');
    }
   return(
    <div className = "deductions-wrapper">
        <Navigation/>
        <SecondNavigation/>
    <div className = "deductions">
        <div className = "deduction-buttons">
        <button onClick = {handleLoanDedution}>Loan Deduction</button>
        <button onClick = {handleSavingsDeduction}>Monthly Savings Deduction</button>
        </div>
    </div>
    </div>
   )
}
export default Deductions;