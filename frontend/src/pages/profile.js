import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


import ProfileCard from "../components/ProfileCard";
import ExploreCard from "../components/ExploreCard";
import ProfileForm from "../components/ProfileForm";

function Profile({edit}){

    useEffect(() => {
        getUserInfo();
    }, []);

    const [user, setUser] = useState(null);
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
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <Navbar />
            {edit && <ProfileForm userId={userId} token={token} setUser={setUser}/>}
            {user && <ProfileCard user={user}/>}
            <ExploreCard />
        </div>
    );
}

export default Profile;