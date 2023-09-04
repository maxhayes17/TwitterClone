import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import ExploreCard from "./ExploreCard";
import VerticalNav from "./VerticalNav";
import { useState } from "react";

export default function PostForm({user}){
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const [file, setFile] = useState(null);


    const handleSubmit = (form) => {
        form.preventDefault();
        const formData = new FormData();

        // Retrieve entries from form to send with formData
        const formEntries = new FormData(form.target)
        const formJSON = Object.fromEntries(formEntries.entries());
        for (let field in formJSON){
            formData.append(field, formJSON[field])
        }
        // formJSON["author"] = user._id;
        formData.append("author", user._id)
        // formData.append("file", file)
        // console.log(formData);
        if(file)
            formData.append("picture_path", file.name);

        fetch("http://localhost:3001/posts/compose", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
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
                    <input type="file" name="file" accept=".jpeg, .jpg, .png" onChange={(e) => setFile(e.target.files[0])}/>
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