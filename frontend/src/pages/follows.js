import ExploreCard from "../components/ExploreCard";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../state";

function Follows({isFollowers}){

    useEffect(() => {
        isFollowers ? getUserFollowers() : getUserFollowing();
    }, [])

    const [user, setUser] = useState(null);
    const [follows, setFollows] = useState(null);

    const followersRef = useRef(null);
    const followingRef = useRef(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.user);

    const getUserFollowers = () => {
        // console.log("http://localhost:3001/user/" + id + );
        fetch("http://localhost:3001/user/" + id + "/followers", {
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
            followersRef.current.focus();
        })
        .catch((err) => console.log(err));
    };

    const getUserFollowing = () => {
        fetch("http://localhost:3001/user/" + id + "/following", {
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
            followingRef.current.focus();
        })
        .catch((err) => console.log(err));
    };

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
                        <button onClick={getUserFollowers} ref={followersRef}>Followers</button>
                        <button onClick={getUserFollowing} ref={followingRef}>Following</button>
                    </div>
                </div>

                {follows && follows.map(({_id, name, username, bio}) =>
                    <div className="profile-list-element" onClick={() => {navigate("/profile/" + _id)}}>
                        <div className="inline"> 
                            <div className="vertical-stack">
                                <a onClick={() => {navigate("/profile/" + _id)}} style={{fontWeight:"bold"}}>{name}</a>
                                <p style={{opacity:"70%"}}>@{username}</p>
                                <p>{bio}</p>
                            </div>             
                            {currentUser._id != _id && <a className="button-round" id={currentUser.following.includes(_id) ? "border" : "white"}>{currentUser.following.includes(_id) ? "Following" : "Follow"}</a>}
                        </div>
                    </div>
                )}
            </div>}
            <ExploreCard />
        </div>
    );
}

export default Follows;