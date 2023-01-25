import {useState} from 'react';
import useFetch from './useFetch.js';
import {Link} from 'react-router-dom';
import SecondNavigation from './nav2.js';
import Navigation from './nav.js';


const HomePage = () =>{
    const {data:members,isPending:isLoading, error} = useFetch('http://localhost:8050/members');
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
        <div className = "home-content">
           <SecondNavigation/>
           <Navigation/>
            <div className = "home">
            {error && <p className = "error">Server error, restart database servers.</p>}

            <input className = "search" type = "search" onKeyUp = {(e)=>handleKeyUp(e.target.value)} placeholder = "Enter staff id"/>
            {isLoading && <p className = "loading">Loading...</p>}
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
                        <button className = "details-button">Member File</button>
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