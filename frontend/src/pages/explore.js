import Navbar from "../components/Navbar";
import ExploreCard from "../components/ExploreCard";
function Explore(){
    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <h1>Explore</h1>
            </div>
            <ExploreCard />
        </div>
    );
}

export default Explore;