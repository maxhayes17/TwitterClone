import ExploreCard from "../components/ExploreCard";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../state";

function Follows({isFollowers}){

    useEffect(() => {
        getUserFollows();
    }, [])

    const [user, setUser] = useState(null);
    const [follows, setFollows] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.user);

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
            // console.log(data);
            setUser(data.user);
            setFollows(data.follows)
        })
        .catch((err) => console.log(err));
    }

    const addFollower = () => {

    }

    return(
        <div>
            <Navbar />
            {user && <div className="mainCard">

                <div className="vertical-nav">
                    <div className="inline">
                        <a onClick={() => navigate("/profile/" + id)} style={{paddingRight:"20px"}}><h2>{"<"}</h2></a>
                        <div className="vertical-stack">
                            <h3>{user.name}</h3>
                            <p style={{opacity:"70%"}}>@{user.username}</p>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button onClick={() => navigate("/profile/" + id + "/followers")}>Followers</button>
                        <button onClick={() => navigate("/profile/" + id + "/following")}>Following</button>
                    </div>
                </div>

                {follows.map(({_id, name, username, bio}) =>
                    <div className="profile-list-element">
                        <div className="inline"> 
                            <div className="vertical-stack">
                                <a onClick={() => {navigate("/profile/" + _id)}} style={{fontWeight:"bold"}}>{name}</a>
                                <p style={{opacity:"70%"}}>@{username}</p>
                                <p>{bio}</p>
                            </div>             
                            {currentUser._id != _id && <a onClick={addFollower} className="button-round" id={currentUser.following.includes(_id) ? "border" : "white"}>{currentUser.following.includes(_id) ? "Following" : "Follow"}</a>}
                        </div>
                    </div>
                )}
            </div>}
            <ExploreCard />
        </div>
    );
}

export default Follows;