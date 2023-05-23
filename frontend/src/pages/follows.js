import ExploreCard from "../components/ExploreCard";
import Navbar from "../components/Navbar";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Follows({isFollowers}){
    const { id } = useParams();
    const navigate = useNavigate();

    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <h1><a onClick={() => navigate("/profile/" + id)}>{"<--"}</a> {id} {isFollowers ? "followers" : "following"}</h1>
            </div>
            <ExploreCard />
        </div>
    );
}

export default Follows;