import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUserInfo } from "../state";
import reactStringReplace from 'react-string-replace';


export default function Post({id, author, body, root, createdAt, userProfile, likes, replies, tags}){

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
        fetch(`http://localhost:3001/user/${author}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
        })
        .catch((err) => console.log(err));
    }

    const addLike = () => {
        fetch(`http://localhost:3001/posts/${id}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: currentUser._id,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch(
                setUserInfo({user: data.user})
            );
        })
        .catch((err) => console.log(err));
    };


    return(
        <div>
            {user && <div className="post" onClick={() => navigate(`/post/${(root & root != id ? root : id)}`)}>
                <div className="inline">
                    <div className="image-avatar">
                        <img src={require("../image-avatar-blank.png")}></img>
                    </div>
                    <a onClick={(event) => {
                        // So click on elements inside div don't act as clicks on div
                        event.stopPropagation()
                        navigate(`/profile/${user._id}`)}} style={{fontWeight:"bold", marginBlock:"auto"}}>{user.name}</a>
                    <p style={{opacity:"70%"}}>@{user.username} • {createdAt.slice(0,10)}</p>
                </div>
                

                {/* use reactStringReplace to find/replace hashtags with links */}
                <p>
                    {reactStringReplace(body, /#(\w+)/g, (match, i) => (
                        <a key={i} 
                        className="hashtag"
                        onClick={(event) => {
                            event.stopPropagation();
                             navigate(`/explore/${match}`)}}
                        >#{match}</a>
                    ) )}
                </p>

                {currentUser && <div className="inline">


                    {/* like Button */}
                    <a onClick={(event) => {
                        event.stopPropagation()
                        addLike();
                    }} className="likeBtn"
                    style={{color: currentUser.liked_posts.includes(id) ? "#f91880" : "#ffffffba"}}
                    >
                        <div className="inline">
                            {currentUser.liked_posts.includes(id) 
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg> 
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                            }
                            <p style={{marginBlock:"auto", marginRight:"25px"}}>{likes && likes.length}</p>
                        </div>
                    </a>
                    {/* comment Button */}
                    <a className="commentBtn" onClick={(event) => {
                        event.stopPropagation()
                        navigate(`/post/${(root & root != id ? root : id)}/reply`)
                    }}>
                        <div className="inline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                            </svg>
                            <p style={{marginBlock:"auto", marginRight:"25px"}}>{replies && replies.length}</p>
                        </div>
                    </a>
                </div>}

            </div>}
        </div>
    );
}