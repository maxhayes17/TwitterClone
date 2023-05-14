import Navbar from "../components/Navbar";
import ExploreCard from "../components/ExploreCard";
function Home(){
    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <h1>Home</h1>
            </div>
            <ExploreCard />
        </div>
    );
}

export default Home;