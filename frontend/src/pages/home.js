import Navbar from "../components/Navbar";
import ExploreCard from "../components/ExploreCard";
import Post from "../components/Post";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts, setUsers } from "../state";


function Home(){

    useEffect(() => {
        getPosts();
        getUsers();
        // feedRef.current.focus();
    }, [setPosts]);

    const [feed, setFeed] = useState(null);

    const feedRef = useRef(null);

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);

    const getPosts = () => {
        fetch("http://localhost:3001/posts/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch(
                setPosts({
                    posts: data
                })
            );
            setFeed(data);
        })
        .catch((err) => console.log(err));
    };

    const getUsers = () => {
        fetch("http://localhost:3001/user/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dispatch(
                setUsers({
                    users: data
                })
            );
        })
    }
    const getUserFeed = () => {
        fetch(`http://localhost:3001/user/${currentUser._id}/feed`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setFeed(data);
        })
        .catch((err) => console.log(err));
    };

    return(
        <div className="flex flex-row bg-red-500 w-screen h-screen">
            <Navbar />
            <div className="w-5/12 h-full overflow-scroll bg-black text-left">

                <div className="w-full sticky top-0 z-10 bg-black-rgba backdrop-blur-sm border border-onyx">
                    <h1 className="p-5 text-left text-xl font-bold">Home</h1>
                    <div className="flex flex-row justify-around">
                        <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 hover:bg-raisin-black" onClick={getPosts} ref={feedRef}>Public</button>
                        {currentUser && 
                        <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 hover:bg-raisin-black" onClick={getUserFeed}>Following</button>}
                    </div>
                </div>
                {feed && feed.map( ({_id, author, body, createdAt, likes, replies, picture_path}) => 
                    <Post key={_id} id={_id} author={author} body={body} createdAt={createdAt} likes={likes} replies={replies} picture_path={picture_path}/>)
                }
            </div>
            {/* <ExploreCard /> */}
        </div>
    );
}

export default Home;