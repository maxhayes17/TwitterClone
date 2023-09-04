import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import ExploreCard from "./ExploreCard";
import VerticalNav from "./VerticalNav";

export default function PostForm({user}){
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const handleSubmit = (form) => {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());
        formJSON["author"] = user._id;

        fetch("http://localhost:3001/posts/compose", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"},
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
            navigate(-1);
        }).catch((err) => console.log(err));

        form.target.reset();
    }
    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <VerticalNav header="New post"/>
                <form onSubmit={handleSubmit} className="postForm">
                    <textarea placeholder="What would you like to say?" name="body" autoComplete="off" className="input-text-large" required/>
                    <div className="inline">
                        <p style={{color: "#ffffffba"}}>Who can see this?</p>
                        <select name="audience" required>
                            <option value="Everyone">Everyone</option>
                            <option value="Followers">My followers</option>
                        </select>
                        <button type="submit" className="button-round" id="blue">Post</button>
                    </div>
                </form>
            </div>
            <ExploreCard />
        </div>
    )
}