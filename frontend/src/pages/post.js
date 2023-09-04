import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ExploreCard from "../components/ExploreCard";
import Post from "../components/Post";

function ViewPost({reply}){

    useEffect(() => {
        getPostInfo();
    }, []);

    const [post, setPost] = useState(null);
    const [replies, setReplies] = useState(null);

    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.user);
    const {id} = useParams();
    const replyRef = useRef(null);

    const getPostInfo = () => {
        fetch(`http://localhost:3001/posts/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setPost(data);
            getPostReplies();
            
            // Focus on reply field
            if(reply)
                replyRef.current.focus();
        })
        .catch((err) => console.log(err));
    }

    const getPostReplies = () => {
        fetch(`http://localhost:3001/posts/${id}/replies`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setReplies(data);
        })
        .catch((err) => console.log(err));
    }


    const composeReply = (form) => {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());
        formJSON["author"] = currentUser._id;

        fetch(`http://localhost:3001/posts/${id}/reply`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"},
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
            
        }).catch((err) => console.log(err));

        form.target.reset();
    }

    return(
        <div>
            <Navbar />
            {post && <div className="mainCard">

                <div className="vertical-nav">
                    <div className="inline">
                        <a onClick={() => navigate(-1)}>
                            <h2>
                                {/* back button  */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                                </svg> 
                            </h2>
                        </a>
                        <h2 style={{marginBlock: "auto", marginLeft:"10px"}}>Post</h2>

                    </div>
                </div>
            
                <Post key={post._id} id={post._id} author={post.author} body={post.body} createdAt={post.createdAt} likes={post.likes} replies={post.replies} tags={post.tags} picture_path={post.picture_path}/>

                <div className="inline" style={{paddingBottom:"10px", borderBottom: "1px solid #333639"}}>
                    <p><a style={{fontWeight: "bold", marginLeft:"10px"}}>{post.likes.length}</a> {post.likes.length == 1 ? "like" : "likes"}</p>
                </div>
                <form onSubmit={composeReply} className="replyForm">
                    <input placeholder="Reply to this post!" name="body" autoComplete="off" type="text" ref={replyRef}/>
                    <button type="submit" className="button-round" id="blue">Reply</button>
                </form>

                {replies && replies.map( ({_id, author, body, createdAt, likes, replies, picture_path}) => 
                    <Post key={_id} id={_id} author={author} body={body} createdAt={createdAt} likes={likes} replies={replies} picture_path={picture_path}/>)
                }
            </div>}
            <ExploreCard />
        </div>
    );
}

export default ViewPost;