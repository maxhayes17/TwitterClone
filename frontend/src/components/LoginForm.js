import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function LoginForm(){
    // Default page to be login
    const [pageType, setPageType] = useState("login");

    const navigate = useNavigate();
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
            isLogin ? navigate("/feed") : setPageType("login");
        })
        .catch((err) => console.log(err));

        // Clear form after returning from fetch
        form.target.reset();

    }

    return(
        <div>
            <h1>{isLogin ? "Login to your account" : "Create an account"}</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="E-mail" name="email" autoComplete="off"/>
                {!isLogin && <input placeholder="Username" name="username" autoComplete="off"/>}
                <input placeholder="Password" name="password" autoComplete="off"/>
                <button type="submit">{isLogin ? "Sign in" : "Sign up"}</button>
                {isLogin && <p>Don't have an account? <a onClick={() => setPageType("register")}>Sign up</a></p>}
            </form>
        </div>
    );
}