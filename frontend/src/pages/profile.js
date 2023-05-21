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
    const {id} = useParams();
    
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
            // console.log(data);
            setPosts(data);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <Navbar />
            {edit && <ProfileForm userId={id} token={token} setUser={setUser}/>}
            {user && posts && <ProfileCard user={user} posts={posts}/>}
            <ExploreCard />
        </div>
    );
}

export default Profile;