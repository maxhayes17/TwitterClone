import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
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
    }, []);

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const {id} = useParams();
    
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
            getUserPosts();
        })
        .catch((err) => console.log(err));
    };
    const getUserPosts = () => {
        fetch("http://localhost:3001/posts/" + id + "/posts", {
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
                    <a onClick={() => navigate("/home")}><h1>{"<--"}</h1></a>

                    <div style={{padding: "0 20px", textAlign:"inherit"}}>
                        <div className="inline">
                            <h3>{user.name}</h3>
                            {(user._id == currentUser._id ) 
                            ? 
                                <a onClick={() => navigate("/profile/" + user._id + "/edit")} 
                                    className="button-round" 
                                        style={{border: "1px solid #333639"}}>Edit profile</a>
                            :
                                <a onClick={addFollower} className="button-round" id="white">{currentUser.following.includes(user._id) ? "Following" : "Follow"}</a>
                            }
                        </div>
                        <p style={{opacity:"70%"}}>@{user.username}</p>
                        <p>{user.bio}</p>
                        <p style={{opacity:"70%"}}>{ user.location ? user.location : ""} Joined {user.createdAt.slice(0,10)}</p>
                        <p>
                            <a onClick={() => navigate("/profile/" + user._id + "/following")} style={{fontWeight:"bold"}}>{user.following.length}</a> Following 
                            <a onClick={() => navigate("/profile/" + user._id + "/followers")} style={{fontWeight:"bold"}}> {user.followers.length}</a> Followers
                        </p>
                        <p>Posts| Replies | Media | Likes</p>
                    </div>
                    {posts && posts.map(({_id, author, body, date}) => 
                    <Post key={_id} id={_id} body={body} author={author} date={date} userProfile={user}/>)}
                </div>}
            {/* {posts && <ProfileCard user={user} posts={posts}/>} */}
            </div>}
            <ExploreCard />
        </div>
    );
}

export default Profile;