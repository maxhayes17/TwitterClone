
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
            <div className="search">
                <form>
                    <input type="text" placeholder="Search" 
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
                                    <img src={require("../image-avatar-blank.webp")}></img>
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
                <p>@foo</p>
                <p>@bar</p>
                <p>@baz</p>
            </div>
        </div>
    )
}