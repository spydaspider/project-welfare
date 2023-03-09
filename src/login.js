import useFetch from './useFetch';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateLog from './helpers/createLog';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Store from './helpers/storage';
import TopPrompt from './helpers/topPrompt';
const Login = () =>{
  const history = useHistory();
  const [userExists,setUserExists] = useState(true);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [logged,setLogged] = useState('false');
  const {data: users, isPending: isLoading, error} = useFetch('http://localhost:8050/users');
  const handleSignup =()=>{
     history.push("/signup");
  }
  const handleSubmit = e =>{
   e.preventDefault();

       let count = 0;
       let log = Store.getLocalStorage('log');
        if(log.logged === true)
       {
         setLogged(true);
         setUserExists(false);
       }
       else
       {
         setLogged(false);
         setUserExists(false);
         
       } 
       users.forEach((user)=>{
        if(user.username === username && user.password === password)
        {

           count += 1;
        }
       })
      
       if(count === 0)
       {
           setUserExists(false);
       }
 else
 {
   const log = new CreateLog(username,true);
   
     Store.addLocalStorage('log',log);  
     history.push("/search");
     window.location.reload();
 }
  }
   return (
    <div className = "login-container">

    <div className = "login-form">

      <h2 className = "login-title">Login</h2>
      {!userExists && <p className = "not-exist">Invalid username or password</p>}
     <form onSubmit = {handleSubmit}>
      <input type = "text" placeholder = "username" value = {username} onChange = {(e)=> setUsername(e.target.value)} required/>
      <input type = "password" placeholder = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)} required/>
      <button className = "login-button">Login</button>
      <button className = "signup-button" onClick = {handleSignup}>sign up</button>
      
     </form>
    </div>
    </div>

 
   )
}
export default Login;