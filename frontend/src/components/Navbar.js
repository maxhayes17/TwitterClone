import { setLogout } from "../state";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar(){
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    return(
        <div className="nav">
            {user && <a onClick={() => dispatch(setLogout())}>Logout</a>}
        </div>
    );
}