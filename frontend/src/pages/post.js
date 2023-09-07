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
        <div className="flex flex-row w-screen h-screen">
            <Navbar />
            {post && <div className="w-5/12 h-full overflow-auto bg-black text-left">
                <div className="w-full sticky top-0 z-10 py-1 bg-black-rgba backdrop-blur-sm">
                    <div className="flex flex-row space-x-5 p-1">
                        <div onClick={() => navigate(-1)} className="ml-1 my-auto">
                            {/* back button  */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 p-2 rounded-full hover:bg-raisin-black hover:cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <h1 className="my-auto text-xl font-extrabold">Post</h1>
                    </div>
                </div>

                <div className="flex flex-col">
                    <Post key={post._id} id={post._id} author={post.author} body={post.body} createdAt={post.createdAt} likes={post.likes} replies={post.replies} tags={post.tags} picture_path={post.picture_path}/>

                    <div className="border-b border-onyx text-left px-5 py-3">
                        <p><a className="font-bold">{post.likes.length}</a> {post.likes.length == 1 ? "like" : "likes"}</p>
                    </div>

                    <form onSubmit={composeReply} className="flex flex-row w-full my-5 justify-around">
                        <input className="w-3/4 my-auto" placeholder="Reply to this post!" name="body" autoComplete="off" type="text" ref={replyRef}/>
                        <button type="submit" className="w-fit h-fit my-auto px-4 py-2 rounded-full text-white font-bold bg-twitter-blue hover:opacity-70 hover:cursor-pointer">Reply</button>
                    </form>

                    {replies && replies.map( ({_id, author, body, createdAt, likes, replies, picture_path}) => 
                        <Post key={_id} id={_id} author={author} body={body} createdAt={createdAt} likes={likes} replies={replies} picture_path={picture_path}/>)
                    }
                </div>
            </div>}
            <ExploreCard />
        </div>
    );
}

export default ViewPost;