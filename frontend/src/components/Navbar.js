import { setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    return(
        <ul className="nav">
            <li><a onClick={() => navigate("/")}>/</a></li>
            {user && <li><a onClick={() => navigate("/home")}>Home</a></li>}
            <li><a onClick={() => navigate("/explore")}>Explore</a></li>
            {user && <li><a onClick={() => navigate("/profile")}>Profile</a></li>}
            {user && <li><a onClick={() => dispatch(setLogout())}>Logout</a></li>}
        </ul>
    );
}