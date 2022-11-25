import Navigation from "../nav"
import SecondNavigation from "../nav2"
import useFetch from "../useFetch";
import {useState} from 'react';
import {useEffect} from 'react';

const Income = () =>{
    const {data: stepIncomes, isPending: isLoading, error} = useFetch('http://localhost:8050/stepIncomes');
    const {data: incomes} = useFetch('http://localhost:8050/incomes');

    const [totalGrossIncome,setTotalGrossIncome] = useState('');
    const [dateKey,setDateKey]= useState('');
    const [filteredStepIncomes,setFilteredStepIncomes] = useState([]);
    const [netIncome, setNetIncome] = useState('');
    const [showTable, setShowTable] = useState(null);
    
    const handleSubmit = (e) =>{
          e.preventDefault();
          let grossIncome = 0;
          if(dateKey === '')
          {
            setShowTable(null);
          }
          else
          {
          if(stepIncomes)
          {
            let filteredSI = stepIncomes.filter((si)=>si.date.indexOf(dateKey)!== -1);
            setFilteredStepIncomes(filteredSI);
            
            stepIncomes.forEach((income)=>{
                grossIncome = grossIncome + Number(income.income);
             })
             setTotalGrossIncome(grossIncome);
             if(incomes)
             {
                setNetIncome(incomes[0].income);
                
             }
          }
           setShowTable(true);
        }   
    }
  


    
    return(
        <div className = "income-wrapper">
            <SecondNavigation/>
            <Navigation/>
            <div className = "incomes">
                <form onSubmit = {handleSubmit}>
                <input type = "search"  onChange = {(e)=>setDateKey(e.target.value)} placeholder = "Enter date"/>
                </form>
                {filteredStepIncomes && showTable && <div className = "flex-two-row">
                    <p className = "income"><span className = "income-label">Gross Income:</span> {Number(totalGrossIncome).toFixed(2)}cedis</p>
                    <p className = "income"><span className = "income-label">Net Income:</span>{Number(netIncome).toFixed(2)}cedis</p>
                    </div>}

                {showTable && filteredStepIncomes && <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Income</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        filteredStepIncomes.map((fsi)=>(
                            <tr key = {fsi.id}>
                                <td>{fsi.date}</td>
                                <td>{fsi.time}</td>
                                <td>{fsi.income.toFixed(2)}cedis</td>
                            </tr>

                        ))
                    }
                    </tbody>
                </table>}
            </div>
        </div>
    )
    }
export default Income;