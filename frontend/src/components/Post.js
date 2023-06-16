import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUserInfo } from "../state";

export default function Post({id, author, body, root, createdAt, userProfile}){

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
    const currentUser = useSelector((state) => state.user);


    const dispatch = useDispatch();
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
            setUser(data);
        })
        .catch((err) => console.log(err));
    }

    const addLike = () => {
        fetch("http://localhost:3001/posts/" + id + "/like", {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: currentUser._id,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dispatch(
                setUserInfo({user: data.user})
            );
        })
        .catch((err) => console.log(err));
    };


    return(
        <div>
            {user && <div className="post" onClick={() => navigate("/post/" + (root && root != id ? root : id))}>
                <div className="inline">
                    <a onClick={(event) => {
                        // So click on elements inside div don't act as clicks on div
                        event.stopPropagation()
                        navigate("/profile/" + user._id)}} style={{fontWeight:"bold"}}>{user.name}</a>
                    <p style={{opacity:"70%"}}>@{user.username} • {createdAt.slice(0,10)}</p>
                </div>
                <p>{body}</p>

                {currentUser && <div className="inline">
                    <a onClick={(event) => {
                        event.stopPropagation()
                        addLike();
                    }} className="likeBtn"
                    style={{color: currentUser.liked_posts.includes(id) ? "#f91880" : "white"}}
                    >Like</a>
                </div>}

            </div>}
        </div>
    );
}