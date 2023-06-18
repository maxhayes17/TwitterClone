import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../state";

import ProfileCard from "../components/ProfileCard";
import ExploreCard from "../components/ExploreCard";
import ProfileForm from "../components/ProfileForm";
import Post from "../components/Post";


function Profile({edit}){

    useEffect(() => {
        getUserInfo();
        getUserPosts();
    }, []);

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const {id} = useParams();

    const feedRef = useRef(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const getUserInfo = () => {
        fetch("http://localhost:3001/user/" + id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
            // getUserPosts();
        })
        .catch((err) => console.log(err));
    };
    const getUserPosts = () => {
        fetch("http://localhost:3001/user/" + id + "/posts", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
            feedRef.current.focus();
        })
        .catch((err) => console.log(err));
    };

    const getUserReplies = () => {
        fetch("http://localhost:3001/user/" + id + "/replies", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
        })
        .catch((err) => console.log(err));
    };

    const getUserLiked = () => {
        fetch("http://localhost:3001/user/" + id + "/liked", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
        })
        .catch((err) => console.log(err));
    };

    const getUserMedia = () => {
        setPosts([]);
    }

    const addFollower = () => {
        fetch("http://localhost:3001/user/" + user._id + "/follow", {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                followerId: currentUser._id,
                followeeId: user._id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dispatch(
                setUserInfo({user: data.follower})
            );
            navigate("/profile/" + data.followee._id);
        })
        .catch((err) => console.log(err));
    };

    return(
        <div>
            <Navbar />
            {user && <div>
            {edit && (user._id == currentUser._id) && <ProfileForm token={token} setUser={setUser}/>}
            
                {posts && <div className="mainCard">


                    <div className="vertical-nav">
                        <div className="inline">
                            <a onClick={() => navigate(-1)} style={{paddingRight:"20px"}}><h2>{"<"}</h2></a>
                            <div className="vertical-stack">
                                <h3>{user.name}</h3>
                                <p style={{opacity:"70%"}}>{user.posts.length} {user.posts.length == 1 ? "Post" : "Posts"}</p>
                            </div>
                        </div>
                    </div>


                    <div style={{padding: "0 20px", textAlign:"inherit"}}>

                        <div className="inline">
                            <div className="vertical-stack">
                                <h3>{user.name}</h3>
                                <p style={{opacity:"70%"}}>@{user.username}</p>
                            </div>
                            
                            {(user._id == currentUser._id ) 
                            ? 
                                <a onClick={() => navigate("/profile/" + user._id + "/edit")} 
                                    className="button-round" 
                                        id="border">Edit profile</a>
                            :
                            <a onClick={addFollower} className="button-round" id={currentUser.following.includes(user._id) ? "border" : "white"}>{currentUser.following.includes(user._id) ? "Following" : "Follow"}</a>
                            }
                        </div>

                        <p>{user.bio}</p>
                        <p style={{opacity:"70%"}}>{ user.location ? user.location : ""} Joined {user.createdAt.slice(0,10)}</p>

                        <p>
                            <a onClick={() => navigate("/profile/" + user._id + "/following")} style={{fontWeight:"bold"}}>{user.following.length}</a> Following 
                            <a onClick={() => navigate("/profile/" + user._id + "/followers")} style={{fontWeight:"bold"}}> {user.followers.length}</a> Followers
                        </p>
                        
                        {posts && <div className="btn-group">
                            <button onClick={getUserPosts} ref={feedRef}>Posts</button>
                            <button onClick={getUserReplies}>Replies</button>
                            <button onClick={getUserMedia}>Media</button>
                            <button onClick={getUserLiked}>Likes</button>
                        </div>}

                    </div>
                    {posts && posts.map(({_id, author, body, root, createdAt, likes, replies}) => 
                    <Post key={_id} id={_id} body={body} author={author} root={root} createdAt={createdAt} likes={likes} replies={replies}/>)}
                </div>}
            </div>}
            <ExploreCard />
        </div>
    );
}

export default Profile;