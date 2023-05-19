import { useNavigate } from "react-router-dom";

export default function ProfileForm({userId, token, setUser}){
    const navigate = useNavigate();

    const handleSubmit = (form) => {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());

        fetch("http://localhost:3001/user/" + userId.id + "/edit", {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
            navigate("/profile/" + userId.id);
            setUser(data);
        })
        .catch((err) => console.log(err));

        form.target.reset();
    }
    return(
        <div className="profileForm">
            <a onClick={() => navigate("/profile/" + userId.id)}>X</a>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" name="name" autoComplete="off"/>
                <input placeholder="Bio" name="bio" autoComplete="off"/>
                <input placeholder="Location" name="location" autoComplete="off"/>
                <input placeholder="Website" name="website" autoComplete="off"/>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}