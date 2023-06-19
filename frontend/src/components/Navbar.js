import { setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    // const userId = user ? user._id: null;

    return(
        <ul className="nav">
            <li>
                <div className="inline">
                    <a onClick={() => navigate("/")}><i>TwitClone</i></a>
                </div>
            </li>
            {user && 
                <li>
                    <div className="inline" id="black" onClick={() => navigate("/home")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                    </svg>
                    <p style={{marginBlock:"auto", marginRight:"25px"}}>Home</p>
                    </div>
                </li>
            }
            <li>
                <div className="inline" id="black" onClick={() => navigate("/explore")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p style={{marginBlock:"auto", marginRight:"25px"}}>Explore</p>
                </div>
            </li>

            {user && 
                <li>
                    <div className="inline" id="black" onClick={() => navigate("/profile/" + user._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                        <p style={{marginBlock:"auto", marginRight:"25px"}}>Profile</p>
                    </div>
                </li>
            }
            {user && 
                <li>
                    <div className="inline">
                        <a onClick={() => navigate("/post/compose")} className="button-round" id="blue">Post</a>
                    </div>
                </li>
            }
            {user && 
                <li>
                    <div className="inline" style={{fontSize:"1rem"}}>
                        <a onClick={() => dispatch(setLogout())}>Log out @{user.username}</a>
                    </div>
                </li>
            }
        </ul>
    );
}