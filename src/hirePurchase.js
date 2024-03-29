import Navigation from "./nav"
import SecondNavigation from "./nav2"
import useFetch from "./useFetch";
const HirePurchases = () =>{
    const {data: hirePurchases, isPending: isLoading, error} = useFetch('http://localhost:8050/hirePurchases');
    return(
        <div className = "hirePurchase-wrapper">
            <SecondNavigation/>
            <Navigation/>
            <div className = "hire-purchase">
               <h1>P<span>u</span>r<span>c</span>h<span>a</span>s<span>e</span>s</h1>
               <table>
                <thead>
                   <tr>
                    <th>Name</th>
                    <th>Staff Number</th>
                    <th>District</th>
                    <th>Telephone</th>
                    <th>Item</th>
                    <th>Installment</th>
                    <th>Total Amt</th>
                    <th>Brand</th>
                    <th>Qty</th>
                    <th>Duration</th>
                    <th>Start Date</th>
                    <th>End Date</th>


                   </tr>
                </thead>
                <tbody>
                    {hirePurchases && hirePurchases.map((hp)=>(
                         <tr key = {hp.id}>
                            <td>{hp.appName}</td>
                            <td>{hp.staffNumber}</td>
                            <td>{hp.district}</td>
                            <td>{hp.telephone}</td>
                            <td>{hp.itemName}</td>
                            <td>{Number(hp.installment).toFixed(2)}cedis</td>
                            <td>{Number(hp.totalAmount).toFixed(2)}cedis</td>
                            <td>{hp.itemBrand}</td>
                            <td>{hp.quantity}</td>
                            <td>{hp.duration}</td>
                            <td>{hp.startDate}</td>
                            <td>{hp.endDate}</td>
                         </tr>
                    ))
                    
                      }

                </tbody>
               </table>
            </div>
        </div>
    )
}
export default HirePurchases;