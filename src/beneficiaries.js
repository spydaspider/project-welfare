import SecondNavigation from "./nav2";
import useFetch from "./useFetch";
import Navigation from "./nav.js";
const Beneficiaries = () =>{
    const {data: benefitedMembers,isPending: isLoading, error} = useFetch('http://localhost:8050/beneficiaries');

    return(
        <div className = "loan-wrapper">
            <SecondNavigation/>
            <Navigation/>
            <div className = "loans">
                <h1><span>A</span>l<span>l</span> R<span>e</span>q<span>u</span>e<span>s</span>t<span>e</span>d <span>B</span>e<span>n</span>e<span>f</span>i<span>t</span>s</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className = "error">Database error, please restart the server and reload page.</p>}
            <table>
                <thead>
                    <tr>
                    <th>Applicant Name</th>
                    <th>staff Number</th>
                    <th>District</th>
                    <th>Telephone</th>
                    <th>Rank</th>
                    <th>Benefit</th>
                    <th>Date</th>
                    <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {benefitedMembers && benefitedMembers.map((bm)=>(

                    
                    <tr>
                        <td>{bm.appName}</td>
                        <td>{bm.staffNumber}</td>
                        <td>{bm.district}</td>
                        <td>{bm.telephone}</td>
                        <td>{bm.rank}</td>
                        <td>{bm.benefit}</td>
                        <td>{bm.date}</td>
                        <td>{bm.time}</td>

                    
                    </tr>
                    ))}
                      
                </tbody>

            </table>
            </div>
        </div>
    )

}
export default Beneficiaries;