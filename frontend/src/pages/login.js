import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogin } from "../state";

function Login(){
    // Default page to be login
    const [pageType, setPageType] = useState("login");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Assign boolean value to whether page is login or register
    const isLogin = pageType == "login";

    const handleSubmit = (form) => {
        // Don't let form refresh page after submit
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());

        // Send data to backend
        fetch("http://localhost:3001/auth/" + pageType, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // If successful response from login form received...
            if (isLogin){
                // Update current state for this user, then redirect to their feed
                dispatch(
                    setLogin({
                        user: data.user,
                        token: data.token
                    })
                )
                navigate("/home")
            }
            // Otherwise, redirect to login page for user to login with newly created account
            setPageType("login");
        })
        .catch((err) => console.log(err));

        // Clear form after returning from fetch
        form.target.reset();
    }

    return(
        <div>
            <Navbar />
            <h1 style={{marginTop: "50px"}}>{isLogin ? "Login to your account" : "Create an account"}</h1>
            <form onSubmit={handleSubmit}>
                {isLogin ? <input placeholder="Username or E-mail" name="identifier" autoComplete="off"/>
                : <input placeholder="E-mail" name="email" autoComplete="off"/>}
                {!isLogin && <input placeholder="Username" name="username" autoComplete="off"/>}
                <input placeholder="Password" name="password" autoComplete="off"/>
                <button type="submit" className="button-round" id="white">{isLogin ? "Sign in" : "Sign up"}</button>
                {isLogin && <p>Don't have an account? <a onClick={() => setPageType("register")}>Sign up</a></p>}
            </form>
        </div>
    );
}

export default Login;