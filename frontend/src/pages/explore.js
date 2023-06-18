import Navbar from "../components/Navbar";
import ExploreCard from "../components/ExploreCard";
function Explore(){
    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <div className="vertical-nav">
                    <h2>Explore</h2>
                    <div className="btn-group">
                        <button>For you</button>
                        <button>Trending</button>
                        <button>News</button>
                        <button>Sports</button>
                    </div>
                </div>
            </div>
            <ExploreCard />
        </div>
    );
}

export default Explore;