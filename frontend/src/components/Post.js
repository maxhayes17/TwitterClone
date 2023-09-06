import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUserInfo } from "../state";
import reactStringReplace from 'react-string-replace';


export default function Post({id, author, body, root, createdAt, userProfile, likes, replies, tags, picture_path}){

    useEffect(() => {
        // console.log(userProfile);
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
        <div className="">
            {user && <div className="flex flex-row px-4 pt-5 border-y border-onyx bg-black hover:bg-black-semitransparent hover:cursor-pointer" onClick={() => navigate(`/post/${(root & root != id ? root : id)}`)}>
                    <div className="w-fit shrink-0 mr-3">
                        <img className="w-12 h-12 rounded-full object-cover mx-auto" src={`http://localhost:3001/uploads/${user.picture_path ? user.picture_path : "image-avatar-blank.png"}`}></img>
                    </div>
                    <div className="flex flex-col w-full">

                        <div className="flex flex-row text-md text-neutral-400">
                            <a onClick={(event) => {
                            // So click on elements inside div don't act as clicks on div
                            event.stopPropagation()
                            navigate(`/profile/${user._id}`)}} 
                            className="text-md text-white font-bold mr-3 my-auto hover:underline hover:underline-offset-2 hover:decoration-white hover:opacity-100">{user.name}
                            </a>
                            <a onClick={(event) => {
                            // So click on elements inside div don't act as clicks on div
                            event.stopPropagation()
                            navigate(`/profile/${user._id}`)}}
                            className="text-neutral-400 my-auto mr-1">@{user.username} • </a>
                            <p>{createdAt.slice(0,10)}</p>
                        </div>

                        <p className="text-left">
                            {reactStringReplace(body, /#(\w+)/g, (match, i) => (
                                <a key={i} 
                                className="text-twitter-blue hover:underline hover:underline-offset-2 hover:opacity-100"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(`/explore/${match}`)}}
                                >#{match}</a>
                            ) )}
                        </p>
                        
                        {picture_path && 
                            <img className="max-w-full mt-2 rounded-xl border border-onyx"src={`http://localhost:3001/uploads/${picture_path}`}></img>
                        }

                        {currentUser && <div className="flex flex-row justify-start space-x-6">
                            {/* like Button */}
                            <div onClick={(event) => {
                                event.stopPropagation()
                                addLike();
                            }}>
                                <div className="group flex flex-row p-2 hover:text-pink-600 pl-0">
                                    {currentUser.liked_posts.includes(id) 
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9 text-pink-600 p-2 rounded-full group-hover:bg-pink-600 group-hover:bg-opacity-20">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>

                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-9 h-9 p-2 rounded-full group-hover:bg-pink-600 group-hover:bg-opacity-20">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>

                                    }
                                    <p className="my-auto ml-1">{likes && likes.length}</p>
                                </div>
                            </div>
                            {/* comment Button */}
                            <div onClick={(event) => {
                                event.stopPropagation()
                                navigate(`/post/${(root & root != id ? root : id)}/reply`)}}>
                                <div className="group flex flex-row p-2 hover:text-twitter-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9 p-2 rounded-full group-hover:bg-twitter-blue group-hover:bg-opacity-20">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                    </svg>

                                    <p className="my-auto ml-1">{replies && replies.length}</p>
                                </div>
                            </div>
                        </div>}
                    </div>
            </div>}
        </div>
    );
}