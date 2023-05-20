import { useNavigate } from "react-router-dom";

export default function PostForm({user}){
    const navigate = useNavigate();

    const handleSubmit = (form) => {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());
        formJSON["author"] = user._id;
        console.log(formJSON);

        fetch("http://localhost:3001/posts/compose", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            navigate("/home");
        }).catch((err) => console.log(err));

        form.target.reset();
    }
    return(
        <div>
            <a onClick={() => navigate("/home")}>X</a>
            <form onSubmit={handleSubmit} className="postForm">
                <textarea placeholder="Body" name="body" autoComplete="off" className="input-text-large" required/>
                {/* <label for="audience">Who can see this?</label> */}
                <select name="audience" required>
                    <option value="Everyone">Everyone</option>
                    <option value="Followers">My followers</option>
                </select>
                <button type="submit" className="button-round" id="blue">Post</button>
            </form>
        </div>
    )
}