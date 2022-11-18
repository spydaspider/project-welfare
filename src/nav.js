import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Navigation = () =>{
    
   return(

    <div className = "nav-bar">
        <h1>Project Welfare</h1>
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