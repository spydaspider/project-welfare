import Navigation from "./nav";
import SecondNavigation from "./nav2";
const HomePage = () =>{
    return(
        <div className = "home">
            <SecondNavigation/>
            <Navigation/>
            <h1>Home</h1>
        </div>
    )
}
export default HomePage;