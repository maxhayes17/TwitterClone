import Navbar from "../components/Navbar";
import ExploreCard from "../components/ExploreCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../components/Post";
function Explore(){

    useEffect(() => {
        getPostsWithTag();
    }, [])

    const [feed, setFeed] = useState(null);
    const token = useSelector((state) => state.token);
    const {tag} = useParams();


    const getPostsWithTag = () => {
        fetch("http://localhost:3001/posts/tags/" + tag, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setFeed(data);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <div className="vertical-nav">
                    <h2>Explore</h2>
                {tag ? <div className="btn-group">
                        <button>Popular</button>
                        <button>Latest</button>
                    </div> 
                    : <div className="btn-group">
                        <button>For you</button>
                        <button>Trending</button>
                        <button>News</button>
                        <button>Sports</button>
                    </div>
                }
                </div>

                {feed && feed.map( ({_id, author, body, createdAt, likes, replies}) => <Post key={_id} id={_id} author={author} body={body} createdAt={createdAt} likes={likes} replies={replies}/>)}
            </div>
            <ExploreCard />
        </div>
    );
}

export default Explore;