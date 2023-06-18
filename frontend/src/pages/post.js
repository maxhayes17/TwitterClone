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
    const [replies, setReplies] = useState(null);

    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.user);
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
            getPostReplies();
        })
        .catch((err) => console.log(err));
    }

    const getPostReplies = () => {
        fetch("http://localhost:3001/posts/" + id + "/replies", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setReplies(data);
        })
        .catch((err) => console.log(err));
    }


    const composeReply = (form) => {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());
        formJSON["author"] = currentUser._id;
        console.log(formJSON);

        fetch("http://localhost:3001/posts/" + id + "/reply", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"},
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
        }).catch((err) => console.log(err));

        form.target.reset();
    }

    return(
        <div>
            <Navbar />
            {post && <div className="mainCard">

                <div className="vertical-nav">
                    <h2><a onClick={() => navigate(-1)}>{"<"}</a> Post</h2>
                </div>
            
                <Post key={post._id} id={post._id} author={post.author} body={post.body} createdAt={post.createdAt}/>

                <div className="inline" style={{paddingBottom:"10px", borderBottom: "1px solid #333639"}}>
                    <p><a style={{fontWeight: "bold", marginLeft:"10px"}}>{post.likes.length}</a> {post.likes.length == 1 ? "like" : "likes"}</p>
                </div>
                <form onSubmit={composeReply} className="replyForm">
                    <input placeholder="Reply to this post!" name="body" autoComplete="off" type="text"/>
                    <button type="submit" className="button-round" id="blue">Reply</button>
                </form>

                {replies && replies.map( ({_id, author, body, createdAt}) => <Post key={_id} id={_id} author={author} body={body} createdAt={createdAt}/>)}
            </div>}
            <ExploreCard />
        </div>
    );
}

export default ViewPost;