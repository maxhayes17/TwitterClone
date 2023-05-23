import ExploreCard from "../components/ExploreCard";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Follows({isFollowers}){

    useEffect(() => {
        getUserFollows();
    }, [])

    const [user, setUser] = useState(null);
    const [follows, setFollows] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);

    const getUserFollows = () => {
        console.log("http://localhost:3001/user/" + id + (isFollowers ? "/followers" : "/following"));
        fetch("http://localhost:3001/user/" + id + (isFollowers ? "/followers" : "/following"), {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUser(data.user);
            setFollows(data.follows)
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <Navbar />
            {user && <div className="mainCard">
                <h1><a onClick={() => navigate("/profile/" + id)}>{"<--"}</a> {user.name} {isFollowers ? "followers" : "following"}</h1>
                {follows.map(({_id, name, username}) =>
                    <div className="post">
                        <div className="inline">              
                            <a onClick={() => {navigate("/profile/" + _id)}} style={{fontWeight:"bold"}}>{name}</a>
                            <p style={{opacity:"70%"}}>@{username}</p>
                        </div>
                    </div>
                )}
            </div>}
            <ExploreCard />
        </div>
    );
}

export default Follows;