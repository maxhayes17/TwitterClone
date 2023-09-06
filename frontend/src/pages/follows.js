import ExploreCard from "../components/ExploreCard";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../state";

function Follows({isFollowers}){

    useEffect(() => {
        isFollowers ? getUserFollowers() : getUserFollowing();
    }, [])

    const [user, setUser] = useState(null);
    const [follows, setFollows] = useState(null);

    const followersRef = useRef(null);
    const followingRef = useRef(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const token = useSelector((state) => state.token);
    const currentUser = useSelector((state) => state.user);

    const getUserFollowers = () => {
        fetch(`http://localhost:3001/user/${id}/followers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data.user);
            setFollows(data.follows)

            // Set focus to followers tab
            followersRef.current.focus();
        })
        .catch((err) => console.log(err));
    };

    const getUserFollowing = () => {
        fetch(`http://localhost:3001/user/${id}/following`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data.user);
            setFollows(data.follows)
            
            // Set focus to following tab
            followingRef.current.focus();
        })
        .catch((err) => console.log(err));
    };

    return(
        <div className="flex flex-row w-screen h-screen">
            <Navbar />
            {user && <div className="w-5/12 h-full overflow-auto bg-black text-left">

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
                                <p className="text-sm text-neutral-400">@{user.username}</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-around">
                        <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 hover:bg-raisin-black"onClick={getUserFollowers} ref={followersRef}>Followers</button>
                        <button className="text-md font-bold p-5 focus:border-b-twitter-blue focus:border-b-4 hover:bg-raisin-black" onClick={getUserFollowing} ref={followingRef}>Following</button>
                    </div>
                </div>



                <div className="flex flex-col">
                    {follows && follows.map(({_id, name, username, bio, picture_path}) =>
                        <div className="py-2 px-4 bg-black hover:bg-black-semitransparent hover:cursor-pointer text-left" key={_id} onClick={() => {navigate(`/profile/${_id}`)}}>
                            <div className="flex flex-row">
                                <div className="w-fit shrink-0 mr-3">
                                    <img className="w-14 h-14 rounded-full object-cover mx-auto" src={`http://localhost:3001/uploads/${picture_path ? picture_path : "image-avatar-blank.png"}`}></img>
                                </div>

                                <div className="flex flex-col text-left">
                                    <a className="text-md text-white font-bold hover:underline hover:underline-offset-2 hover:decoration-white hover:opacity-100">{name}</a>
                                    <a className="text-md text-neutral-400">@{username}</a>
                                    <p>{bio}</p>
                                </div>

                                <div 
                                    className={currentUser.following.includes(_id) 
                                        ? "bg-black px-4 py-2 ml-auto h-fit rounded-full text-white font-bold border border-onyx hover:opacity-70 hover:cursor-pointer" 
                                        : "bg-white px-4 py-2 ml-auto h-fit rounded-full text-black font-bold hover:opacity-70 hover:cursor-pointer"}>
                                    {currentUser.following.includes(_id) ? "Following" : "Follow"}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>}
            <ExploreCard />
        </div>
    );
}

export default Follows;