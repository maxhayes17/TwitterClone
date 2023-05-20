import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Post({author, body, date, userProfile}){

    useEffect(() => {
        console.log(userProfile);
        // If viewing a user's profile, do not need to search for author of each post
        if (userProfile){
            setUser(userProfile);
        }
        else{
            getUserInfo();
        }
    }, [])
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);

    const navigate = useNavigate();

    const getUserInfo = () => {
        console.log(author);
        fetch("http://localhost:3001/user/" + author, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setUser(data);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            {user && <div className="post">
                <div className="inline">
                    <a onClick={() => navigate("/profile/" + user._id)}><h3>{user.name}</h3></a>
                    <p>@{user.username}</p>
                </div>
                <p>{body}</p>
                <p>{date.slice(0,10)}</p>
            </div>}
        </div>
    );
}