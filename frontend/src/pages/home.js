import Navbar from "../components/Navbar";
import ExploreCard from "../components/ExploreCard";
import Post from "../components/Post";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../state";


function Home(){

    useEffect(() => {
        getPosts();
    }, []);

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);

    const getPosts = () => {
        fetch("http://localhost:3001/posts/", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch(
                setPosts({
                    posts: data
                })
            );
        })
        .catch((err) => console.log(err));
    };

    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <h1>Home</h1>
                {posts.map( ({_id, author, body, date}) => <Post key={_id} author={author} body={body} date={date}/>)}
            </div>
            <ExploreCard />
        </div>
    );
}

export default Home;