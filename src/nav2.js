import {Link} from 'react-router-dom';
import Store from './helpers/storage';
import {useHistory} from 'react-router-dom';

const SecondNavigation = () =>{
    const history = useHistory();
 
    const handleLogin=()=>{
        let log = Store.getLocalStorage('log');
        if(log.logged === 'true')
        {
        
        }
        else
        {
        
       history.push('/');
        }
    }
    const handleLogout =()=>{
        let logData = Store.getLocalStorage('log');
        logData.logged = false;
        localStorage.setItem('log',JSON.stringify(logData));
        history.push('/');
       /*  window.location.reload(); */
    }
   return(
    <div className = "second-navigation">
        <div className = "second-links">
    <span onClick = {handleLogout} className = "log-style">logout</span>
   </div>
   </div>
   )
}
export default SecondNavigation;