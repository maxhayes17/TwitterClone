import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


import ProfileCard from "../components/ProfileCard";
import ExploreCard from "../components/ExploreCard";
import ProfileForm from "../components/ProfileForm";
import Post from "../components/Post";

function Profile({edit}){

    useEffect(() => {
        getUserInfo();
        // getUserPosts();
    }, []);

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const userId = useParams();
    
    const token = useSelector((state) => state.token);

    const getUserInfo = () => {
        fetch("http://localhost:3001/user/" + userId.id, {
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
        fetch("http://localhost:3001/posts/" + userId.id + "/posts", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setPosts(data);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <Navbar />
            {edit && <ProfileForm userId={userId} token={token} setUser={setUser}/>}
            {user && posts && <ProfileCard user={user} posts={posts}/>}
            {/* {posts && posts.map(({_id, author, body, date}) => 
            <Post key={_id} body={body} author={author} date={date} userProfile={user}/>)} */}
            <ExploreCard />
        </div>
    );
}

export default Profile;