
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
                                <div className="vertical-stack">
                                    <a onClick={() => {navigate("/profile/" + _id)}} style={{fontWeight:"bold"}}>{name}</a>
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