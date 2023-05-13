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
            <li><a onClick={() => navigate("/explore")}>Explore</a></li>
            <li>{user && <a onClick={() => dispatch(setLogout())}>Logout</a>}</li>
        </ul>
    );
}