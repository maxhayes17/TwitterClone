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
            <form onSubmit={handleSubmit}>
                <input placeholder="Body" name="body" autoComplete="off"/>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}