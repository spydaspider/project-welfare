import HomePage from './HomePage';
import useFetch from './useFetch';
import LoanDeductions from './deductionPages/loanDeduction';
import SavingsDeductions from './deductionPages/savingsDeduction';
import CreateAccount from './createAccount.js';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Store from './helpers/storage';
import Login from './login.js';
import MemberDetails from './memberDetails.js';
import Membership from './membership.js';
import Loans from './loans.js';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import PrintLoan from './printPages/printLoan.js';
import Deductions from './deductions';
import PrintSavings from './printPages/printSavings';
import PrintLoanDeductions from './printPages/printLoanDeductions';

import Beneficiaries from './beneficiaries.js';
import Income from './helpers/income';
import HirePurchases from './hirePurchase';
function App() {
  const [loggedIn,setLoggedIn] = useState(false);
 
  let log = Store.getLocalStorage('log');

    const useLogin =()=>{
      useEffect(()=>{
      if(log.logged === false || (localStorage.getItem('log') === null))
      {
        
        setLoggedIn(false);
      }
      else 
      {
      
         setLoggedIn(true);
      }
    },[])
    }
    useLogin();
    
 
  
  

  return (
    <Router>
    <div className="App">
    <div className = "content">
    
        <Switch>
          <Route exact path = "/">
            <Login />

          </Route>
          <Route path = "/signup">
          
            <CreateAccount />
          </Route>
             <Route path = "/search">
              {loggedIn && <HomePage />}
             </Route>
             <Route path = "/membership">
              {loggedIn && <Membership />}
             </Route>
             <Route path = "/members/:id">
              {loggedIn && <MemberDetails/>}
             </Route>
             <Route path = "/loans">
              {loggedIn && <Loans/>}
             </Route>
        
             <Route path = "/printLoan">
              {loggedIn && <PrintLoan/>}
             </Route>
             <Route path = "/deductions">
              {loggedIn && <Deductions/>}
             </Route>
             <Route path = "/loanDeductions">
             {loggedIn && <LoanDeductions/>}

             </Route>
             <Route path = "/savingsDeductions">
             {loggedIn && <SavingsDeductions/>}

             </Route>
             <Route path = "/printSavings">
             {loggedIn && <PrintSavings/>}

             </Route>
             <Route path = "/printLoanDeductions">
             {loggedIn && <PrintLoanDeductions/>}

             </Route>
             <Route path = "/beneficiaries">
              {loggedIn && <Beneficiaries/>}
             </Route>
             <Route path = "/income">
              {loggedIn && <Income/>}
             </Route>
             <Route path = "/hirePurchase">
              {loggedIn && <HirePurchases/>}
             </Route>
        </Switch>
    </div>
    
    </div>
    
  </Router>
  );
}
 
export default App;
