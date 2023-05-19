import { useNavigate } from "react-router-dom";

export default function ProfileCard({ user })
{
    const navigate = useNavigate();
    return(
        <div>
        {user && <div className="mainCard">
            <h1>{"<-"}</h1>
            <div className="inline">
                <h3>{user.name}</h3>
                <a onClick={() => navigate("/profile/" + user._id + "/edit")}>Edit profile</a>
            </div>
            <p>@{user.username}</p>
            <p>{user.bio}</p>
            <p>Joined {user.createdAt.slice(0,10)}</p>
            <p>{user.following.length} Following {user.followers.length} Followers</p>
            <p>Tweets | Replies | Media | Likes</p>
        </div>
        }
        </div>
    );
}