import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ExploreCard from "../components/ExploreCard";
import Post from "../components/Post";

function ViewPost(){

    useEffect(() => {
        getPostInfo();
    }, []);

    const [post, setPost] = useState(null);

    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const {id} = useParams();

    const getPostInfo = () => {
        fetch("http://localhost:3001/posts/" + id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setPost(data);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <h1><a onClick={() => navigate("/")}>{"<--"}</a> Post</h1>
                {post && <Post key={post._id} id={post._id} author={post.author} body={post.body} date={post.date}/>}
            </div>
            <ExploreCard />
        </div>
    );
}

export default ViewPost;