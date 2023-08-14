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
                        <a onClick={() => navigate(-1)} style={{paddingRight:"20px"}}>
                            <h2>
                                {/* back button  */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                </svg> 
                            </h2>
                        </a>
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
                            <div className="image-avatar">
                                <img src={require("../image-avatar-blank.png")}></img>
                            </div>
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