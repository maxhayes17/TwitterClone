import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Post({author, body, date}){

    useEffect( () =>{
        getUserInfo()
    }, [])
    const [user, setUser] = useState(null);

    const token = useSelector((state) => state.token);

    const getUserInfo = () => {
        console.log(author);
        fetch("http://localhost:3001/user/" + author, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUser(data);
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            {user && <div className="post">
                <div className="inline">
                    <h3>{user.name}</h3>
                    <p>@{user.username}</p>
                </div>
                <p>{body}</p>
                <p>{date.slice(0,10)}</p>
            </div>}
        </div>
    );
}