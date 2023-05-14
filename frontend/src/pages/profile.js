import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


import ProfileCard from "../components/ProfileCard";
import ExploreCard from "../components/ExploreCard";

function Profile(){

    useEffect(() => {
        getUserInfo();
    }, []);

    const [user, setUser] = useState(null);

    const userId = useParams();
    // console.log(userId.id);
    const token = useSelector((state) => state.token);

    const getUserInfo = () => {
        // console.log("http://localhost:3001/user/" + userId.id);
        fetch("http://localhost:3001/user/" + userId.id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
            console.log(data);
            console.log(user.username);
            console.log(user.createdAt);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <Navbar />
            {user && <ProfileCard username={user.username} createdAt={user.createdAt}/>}
            <ExploreCard />
        </div>
    );
}

export default Profile;