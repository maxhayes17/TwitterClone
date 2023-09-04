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
        feedRef.current.focus();
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
        <div>
            <Navbar />
            <div className="mainCard">
                <div className="vertical-nav">
                    <h2>Home</h2>
                    <div className="btn-group">
                        <button onClick={getPosts} ref={feedRef}>Public</button>
                        {currentUser && <button onClick={getUserFeed}>Following</button>}
                    </div>
                </div>
                {feed && feed.map( ({_id, author, body, createdAt, likes, replies, picture_path}) => 
                    <Post key={_id} id={_id} author={author} body={body} createdAt={createdAt} likes={likes} replies={replies} picture_path={picture_path}/>)
                }
            </div>
            <ExploreCard />
        </div>
    );
}

export default Home;