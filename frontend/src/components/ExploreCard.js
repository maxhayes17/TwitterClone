
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ExploreCard(){

    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    useEffect(() => {
        setResults([]);
    }, []);

    return(
        <div className="exploreCard">
            <div className="search" style={{borderBottom: results && results.length > 0 ? "1px solid #333639" : "none"}}>
                <form>
                    <input type="text" placeholder="Search TwitClone" 
                        onChange={e => {
                            let result = users.filter((user) => {
                                return user.username.toLowerCase().includes(e.target.value.toLowerCase())
                            });
                            setResults(result);
                        }}                 
                    />
                </form>
                {results && results.length < users.length 
                && results.map(({_id, name, username, bio, picture_path}) =>
                        <div className="profile-list-element" key={_id} onClick={() => {navigate(`/profile/${_id}`)}}>
                            <div className="inline"> 
                                <div className="image-avatar">
                                    <img src={`http://localhost:3001/uploads/${picture_path ? picture_path : "image-avatar-blank.png"}`}></img>
                                </div>
                                <div className="vertical-stack">
                                    <a onClick={() => {navigate(`/profile/${_id}`)}} style={{fontWeight:"bold"}}>{name}</a>
                                    <p style={{opacity:"70%"}}>@{username}</p>
                                    <p>{bio}</p>
                                </div>
                            </div>
                        </div>
                )}
            </div>
        </div>
    )
}