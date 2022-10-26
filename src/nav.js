import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Navigation = () =>{
    
   return(

    <div className = "nav-bar">
        <h1>Project Welfare</h1>
        <div className = "links">
        <Link to = "/membership">Membership</Link>
        <Link to = "/search">Search</Link>
        <Link to = "/add">Beneficiaries</Link>
        <Link to = "/store">Savings</Link>
        <Link to = "/records">Loans</Link>
        <Link to = "/income">Income</Link>
        <Link to = "/deductions">Deductions</Link>
      
        </div>
        </div>
        
    
   )
}
export default Navigation;