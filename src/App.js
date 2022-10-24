import HomePage from './HomePage';
import useFetch from './useFetch';
import CreateAccount from './createAccount.js';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Store from './helpers/storage';
import Login from './login.js';
import Membership from './membership.js';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Navigation from './nav';

function App() {
  const [loggedIn,setLoggedIn] = useState(false);
 
  const {data: items, isPending: isLoading, error} = useFetch('http://localhost:8050/items');
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
      <Navigation />
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
              <HomePage />
             </Route>
             <Route path = "/membership">
              <Membership />
             </Route>
        </Switch>
    </div>
    
    </div>
    
  </Router>
  );
}
 
export default App;
