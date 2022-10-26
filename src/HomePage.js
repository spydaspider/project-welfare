import Navigation from "./nav";
import SecondNavigation from "./nav2";
import {useState} from 'react';
import useFetch from './useFetch.js';
import {Link} from 'react-router-dom';

const HomePage = () =>{
    const {data:members} = useFetch('http://localhost:8050/members');
    const [searchKey,setSearchKey] = useState('');
    const [showMembers,setShowMembers] = useState(null);
    const [filteredMembers,setFilteredMembers] = useState([]);
    const handleKeyUp = (keyChar) =>{
        if(members)
        {
    let filteredMembers = members.filter((member)=> member.staffNumber.toLowerCase().indexOf(keyChar.toLowerCase()) !== -1);
    setShowMembers(true);
    setFilteredMembers(filteredMembers);
    if(keyChar === '')
    {
        setShowMembers(null);
    }     
        }
        
    }

    
    return(
        <div className = "home">
            <SecondNavigation/>
            <Navigation/>
            <div className = "home-content">
            <input type = "search" onKeyUp = {(e)=>handleKeyUp(e.target.value)} placeholder = "Enter staff id"/>
            {
                showMembers &&
            <table>
                <thead>
                    <tr>
                        <th>Staff Number</th>
                        <th>Member Name</th>
                        <th>District</th>
                        <th>Monthly Savings</th>
                        <th>Telephone</th>
                    </tr>
                </thead>
                <tbody>
                   {filteredMembers && filteredMembers.map((filteredMember)=>(
                 
                       <tr>
                        <td>{filteredMember.staffNumber}</td>
                        <td>{filteredMember.appName}</td>
                        <td>{filteredMember.district}</td>
                        <td>{Number(filteredMember.monthlySavings).toFixed(2)}cedis</td>
                        <td>{filteredMember.telephone}</td>
                        <Link to = {`/members/${filteredMember.id}`}>
                        <button className = "details-button">details</button>
                        </Link>
                       </tr>

                       
                   ))}
                </tbody>
            </table>
}

            </div>
        </div>
    )
}
export default HomePage;