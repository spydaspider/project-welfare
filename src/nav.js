import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import graIcon from './images/gra.png';
const Navigation = () =>{
    const navLinkStyles = ({ isActive }) =>{
      return{
         backgroundColor: isActive ? 'blue':'',
         textDecoration: isActive ? 'underline':'none',
      }
    }    
   return(

    <div className = "nav-bar">
       <NavLink to = "/search"> <img className = "gra-icon" src = {graIcon} alt = "gra icon"/></NavLink>
        <div className = "links">
        <NavLink style = {navLinkStyles} to = "/membership">Membership</NavLink>
        <NavLink style = {navLinkStyles} to = "/search">Search</NavLink>
        <NavLink style = {navLinkStyles} to = "/beneficiaries">Beneficiaries</NavLink>
        <NavLink style = {navLinkStyles} to = "/loans">Loans</NavLink>
        <NavLink style = {navLinkStyles} to = "/income">Income</NavLink>
        <NavLink style = {navLinkStyles} to = "/deductions">Deductions</NavLink>
        <NavLink style = {navLinkStyles} to = "/hirePurchase">Purchase</NavLink>
        <NavLink style = { navLinkStyles } to = "/generalEdit" className = "general-edit"> ESA</NavLink>
        </div>
        </div>
        
    
   )
}
export default Navigation;