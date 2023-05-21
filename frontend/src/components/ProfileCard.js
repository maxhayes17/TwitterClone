import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Post from "./Post";

export default function ProfileCard({ user, posts })
{
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user);

    // console.log(user);

    return(
        <div>
            {user && <div className="mainCard">
            <a onClick={() => navigate("/home")}><h1>{"<--"}</h1></a>
                <div style={{padding: "0 20px", textAlign:"inherit"}}>
                    <div className="inline">
                        <h3>{user.name}</h3>
                        {(user._id == currentUser._id ) 
                        ? 
                            <a onClick={() => navigate("/profile/" + user._id + "/edit")} 
                                className="button-round" 
                                    style={{border: "1px solid #333639"}}>Edit profile</a>
                        :
                            <a className="button-round" id="white">Follow</a>
                        }
                    </div>
                    <p style={{opacity:"70%"}}>@{user.username}</p>
                    <p>{user.bio}</p>
                    <p style={{opacity:"70%"}}>{ user.location ? user.location: ""} Joined {user.createdAt.slice(0,10)}</p>
                    <p>
                        <a style={{fontWeight:"bold"}}>{user.following.length}</a> Following 
                        <a style={{fontWeight:"bold"}}> {user.followers.length}</a> Followers</p>
                    <p>Tweets | Replies | Media | Likes</p>
                </div>
                {posts && posts.map(({_id, author, body, date}) => 
                <Post key={_id} id={_id} body={body} author={author} date={date} userProfile={user}/>)}
            </div>}
        </div>
    );
}