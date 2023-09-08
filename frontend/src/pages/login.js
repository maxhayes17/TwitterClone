import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogin } from "../state";
import ExploreCard from "../components/ExploreCard";

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
        fetch(`http://localhost:3001/auth/${pageType}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
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
        <div className="flex flex-row w-screen h-screen">
            <Navbar />
            <div className="w-5/12 h-full overflow-auto bg-black text-center">
                <form className="flex flex-col space-y-4 mt-16" onSubmit={handleSubmit}>
                    <h1 className="font-bold text-2xl">{isLogin ? "Login to your account" : "Create an account"}</h1>
                    {isLogin 
                        ? <input className="w-full p-3 bg-raisin-black rounded-md"
                            placeholder="Username or E-mail" name="identifier" autoComplete="off" type="text"/>
                        : <input className="w-full p-3 bg-raisin-black rounded-md"
                            placeholder="E-mail" name="email" autoComplete="off" type="text"/>}
                    {!isLogin && <input className="w-full p-3 bg-raisin-black rounded-md"
                                    placeholder="Username" name="username" autoComplete="off" type="text"/>}
                    <input className="w-full p-3 bg-raisin-black rounded-md"
                        placeholder="Password" name="password" autoComplete="off" type="text"/>
                    <button type="submit" className="bg-white px-4 py-2 mx-auto h-fit rounded-full text-black font-bold hover:opacity-70 hover:cursor-pointer">{isLogin ? "Sign in" : "Sign up"}</button>
                    {isLogin 
                    ? <p>Don't have an account? <a className="font-bold hover:underline hover:underline-offset-2 hover:opacity-100" onClick={() => setPageType("register")}>Sign up</a></p> 
                    : <p>Already have an account? <a className="font-bold hover:underline hover:underline-offset-2 hover:opacity-100" onClick={() => setPageType("login")}>Login</a></p>}
                </form>
            </div>
            <ExploreCard />
        </div>
    );
}

export default Login;