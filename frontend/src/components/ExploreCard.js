
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
                            console.log(users);
                            let result = users.filter((user) => {
                                return user.username.toLowerCase().includes(e.target.value.toLowerCase())
                            });
                            // console.log(result);
                            setResults(result);
                        }}                 
                    />
                </form>
                {results && results.length < users.length 
                && results.map(({_id, name, username, bio}) =>
                        <div className="profile-list-element" onClick={() => {navigate("/profile/" + _id)}}>
                            <div className="inline"> 
                                <div className="image-avatar">
                                    <img src={require("../image-avatar-blank.png")}></img>
                                </div>
                                <div className="vertical-stack">
                                    <a onClick={() => {navigate("/profile/" + _id)}} style={{fontWeight:"bold"}}>{name}</a>
                                    <p style={{opacity:"70%"}}>@{username}</p>
                                    <p>{bio}</p>
                                </div>
                            </div>
                        </div>
                )}
            </div>
            <div className="vertical-stack" id="grey" style={{marginInline:"50px", marginBlock:"20px", paddingInline:"20px", paddingBlock:"5px",borderRadius:"2ex"}}>
                <h3>Trending</h3>
                <p>aaaa</p>
                <p>bbb</p>
                <p>cccc</p>
            </div>
            <div className="vertical-stack" id="grey" style={{marginInline:"50px", marginBlock:"20px", paddingInline:"20px", paddingBlock:"5px",borderRadius:"2ex"}}>
                <h3>Recommended accounts</h3>
                <div className="profile-list-element" onClick={() => {navigate("/profile/")}} style={{marginLeft:"-20px"}}>
                            <div className="inline"> 
                                <div className="image-avatar">
                                    <img src={require("../image-avatar-blank.png")}></img>
                                </div>
                                <div className="vertical-stack">
                                    <a onClick={() => {navigate("/profile/")}} style={{fontWeight:"bold"}}>foo</a>
                                    <p style={{opacity:"70%"}}>@foo</p>
                                </div>
                            </div>
                </div>
                <div className="profile-list-element" onClick={() => {navigate("/profile/")}} style={{marginLeft:"-20px"}}>
                            <div className="inline"> 
                                <div className="image-avatar">
                                    <img src={require("../image-avatar-blank.png")}></img>
                                </div>
                                <div className="vertical-stack">
                                    <a onClick={() => {navigate("/profile/")}} style={{fontWeight:"bold"}}>bar</a>
                                    <p style={{opacity:"70%"}}>@bar</p>
                                </div>
                            </div>
                </div>
                <div className="profile-list-element" onClick={() => {navigate("/profile/")}} style={{marginLeft:"-20px"}}>
                            <div className="inline"> 
                                <div className="image-avatar">
                                    <img src={require("../image-avatar-blank.png")}></img>
                                </div>
                                <div className="vertical-stack">
                                    <a onClick={() => {navigate("/profile/")}} style={{fontWeight:"bold"}}>baz</a>
                                    <p style={{opacity:"70%"}}>@baz</p>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    )
}