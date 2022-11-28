import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import graIcon from './images/gra.png';
const Navigation = () =>{
    
   return(

    <div className = "nav-bar">
       <Link to = "/search"> <img className = "gra-icon" src = {graIcon} alt = "gra icon"/></Link>
        <div className = "links">
        <Link to = "/membership">Membership</Link>
        <Link to = "/search">Search</Link>
        <Link to = "/beneficiaries">Beneficiaries</Link>
        <Link to = "/loans">Loans</Link>
        <Link to = "/income">Income</Link>
        <Link to = "/deductions">Deductions</Link>
        <Link to = "/hirePurchase">Purchase</Link>
      
        </div>
        </div>
        
    
   )
}
export default Navigation;