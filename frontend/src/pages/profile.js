import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../state";

import reactStringReplace from 'react-string-replace';

import ExploreCard from "../components/ExploreCard";
import Post from "../components/Post";


function Profile(){

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
        fetch(`http://localhost:3001/user/${id}`, {
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
    };
    const getUserPosts = () => {
        fetch(`http://localhost:3001/user/${id}/posts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
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
        fetch(`http://localhost:3001/user/${id}/replies`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
        })
        .catch((err) => console.log(err));
    };

    const getUserLiked = () => {
        fetch(`http://localhost:3001/user/${id}/liked`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
        })
        .catch((err) => console.log(err));
    };

    const getUserMedia = () => {
        fetch(`http://localhost:3001/user/${id}/media`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
        })
        .catch((err) => console.log(err));
    };

    const addFollower = () => {
        fetch(`http://localhost:3001/user/${user._id}/follow`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                followerId: currentUser._id,
                followeeId: user._id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch(
                setUserInfo({user: data.follower})
            );
            navigate(`/profile/${data.followee._id}`);
        })
        .catch((err) => console.log(err));
    };

    return(
        <div className="flex flex-row w-screen h-screen">
            <Navbar />
            <div className="w-5/12 h-full overflow-auto bg-black text-left">
                {user && posts && <div>
                    <div className="w-full sticky top-0 z-10 py-1 bg-black-rgba backdrop-blur-sm">
                        <div className="flex flex-row space-x-5">
                            <div onClick={() => navigate(-1)} className="ml-1 my-auto">
                                {/* back button  */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 p-2 rounded-full hover:bg-raisin-black hover:cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                            </div>
                            <div className="flex flex-col justify-around text-left">
                                <h1 className="text-xl font-extrabold">{user.name}</h1>
                                <p className="text-sm text-neutral-400">{user.posts.length} {user.posts.length == 1 ? "Post" : "Posts"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col text-left mx-5 mt-8">
                        <div className="flex flex-row justify-between items-end ">
                            <div className="w-fit shrink-0 mr-3">
                                <img className="w-32 h-32 rounded-full object-cover mx-auto hover:cursor-pointer hover:opacity-80 border-4 border-onyx" src={`http://localhost:3001/uploads/${user.picture_path ? user.picture_path : "image-avatar-blank.png"}`}></img>
                            </div>
                            {(user._id == currentUser._id ) 
                            ? 
                                <div onClick={() => navigate(`/profile/${user._id}/edit`)} 
                                    className="bg-black px-4 py-2 rounded-full text-white font-bold border border-onyx hover:opacity-70 hover:cursor-pointer" >Edit profile</div>
                            :
                                <div onClick={addFollower} 
                                    className={currentUser.following.includes(user._id) 
                                        ? "bg-black px-4 py-2 rounded-full text-white font-bold border border-onyx hover:opacity-70 hover:cursor-pointer" 
                                        : "bg-white px-4 py-2 rounded-full text-black font-bold hover:opacity-70 hover:cursor-pointer"}>
                                    {currentUser.following.includes(user._id) ? "Following" : "Follow"}
                                </div>
                            }
                        </div>
                        <div className="flex flex-col my-3 text-left">
                            <h1 className="text-xl font-extrabold">{user.name}</h1>
                            <p className="opacity-70 text-sm">@{user.username}</p>
                        </div>
                        <p>
                            {reactStringReplace(user.bio, /#(\w+)/g, (match, i) => (
                                <a key={i} 
                                className="text-twitter-blue hover:underline hover:underline-offset-2 hover:opacity-100"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(`/explore/${match}`)}}
                                >#{match}</a>
                            ) )}
                        </p>
                        <div className="flex flex-row items-start space-x-3 text-neutral-400">
                            {user.location && <p>{user.location}</p>}
                            <p>Joined {user.createdAt.slice(0,10)}</p>
                        </div>
                        {user.website && <a className="text-twitter-blue hover:underline hover:underline-offset-2 hover:cursor-pointer hover:opacity-100" href={user.website}>{user.website}</a>}
                        <div className="flex flex-row space-x-4 text-neutral-400">
                            <p className="hover:underline hover:underline-offset-2 hover:decoration-white hover:cursor-pointer">
                                <a onClick={() => navigate(`/profile/${user._id}/following`)} className="font-extrabold text-white">{user.following.length}</a> Following
                            </p>
                            <p className="hover:underline hover:underline-offset-2 hover:decoration-white hover:cursor-pointer">
                                <a onClick={() => navigate(`/profile/${user._id}/followers`)} className="font-extrabold text-white opacity-100"> {user.followers.length}</a> Followers
                            </p>
                        </div>
                        <div className="flex flex-row justify-around mt-5">
                            <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 focus:outline-none hover:bg-raisin-black" onClick={getUserPosts} ref={feedRef}>Posts</button>
                            <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 focus:outline-none hover:bg-raisin-black" onClick={getUserReplies}>Replies</button>
                            <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 focus:outline-none hover:bg-raisin-black" onClick={getUserMedia}>Media</button>
                            <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 focus:outline-none hover:bg-raisin-black" onClick={getUserLiked}>Likes</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                    {posts && posts.map(({_id, author, body, root, createdAt, likes, replies, picture_path}) => 
                        <Post key={_id} id={_id} body={body} author={author} root={root} createdAt={createdAt} likes={likes} replies={replies} picture_path={picture_path}/>)
                    }
                    </div>
                </div>}
            </div>
            <ExploreCard />
        </div>
    );
}

export default Profile;