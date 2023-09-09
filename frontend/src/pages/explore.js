import Navbar from "../components/Navbar";
import ExploreCard from "../components/ExploreCard";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
function Explore(){

    useEffect(() => {
        getPostsWithTag();
    }, [])

    const [feed, setFeed] = useState(null);
    const token = useSelector((state) => state.token);
    const { tag } = useParams();

    const feedRef = useRef(null);



    const getPostsWithTag = () => {
        fetch(`http://localhost:3001/posts/tags/${tag}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setFeed(data);
            feedRef.current.focus();
        })
        .catch((err) => console.log(err));
    }

    return(
        <div className="flex flex-row w-screen h-screen">
            <Navbar />
            <div className="w-5/12 h-full overflow-auto bg-black text-left">

                <div className="w-full sticky top-0 z-10 bg-black-rgba backdrop-blur-sm border-b border-onyx">
                    
                    {feed && tag
                        ? <div className="flex flex-col justify-around p-5 text-left">
                            <h1 className="text-xl font-extrabold">#{tag}</h1>
                            <p className="text-sm text-neutral-400">{feed.length} {feed.length == 1 ? "Post" : "Posts"}</p>
                        </div>
                        : <h1 className="p-5 text-left text-xl font-bold">Explore</h1>
                    }
                    <div className="flex flex-row justify-around">
                        <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 focus:outline-none hover:bg-raisin-black" ref={feedRef}>Latest</button>
                        <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 focus:outline-none hover:bg-raisin-black">Popular</button>
                    </div>
                </div>
                <div className="flex flex-col">
                    {feed && feed.map( ({_id, author, body, createdAt, likes, replies, picture_path}) => <Post key={_id} id={_id} author={author} body={body} createdAt={createdAt} likes={likes} replies={replies} picture_path={picture_path}/>)}
                </div>
            </div>
            <ExploreCard />
        </div>
    );
}

export default Explore;