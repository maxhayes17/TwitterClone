import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileForm({token, setUser}){
    const navigate = useNavigate();
    // Should only be able to edit profile of user logged in
    // const {id} = useSelector((state) => state.user._id);
    const {id} = useParams();
    console.log(id);
    const handleSubmit = (form) => {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());

        fetch("http://localhost:3001/user/" + id + "/edit", {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formJSON)
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
            navigate("/profile/" + id);
        })
        .catch((err) => console.log(err));

        form.target.reset();
    }
    return(
        <div className="profileForm">
            <a onClick={() => navigate("/profile/" + id)}>X</a>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" name="name" autoComplete="off"/>
                <textarea placeholder="Bio" name="bio" autoComplete="off"/>
                <input placeholder="Location" name="location" autoComplete="off"/>
                <input placeholder="Website" name="website" autoComplete="off"/>
                <button type="submit" className="button-round" id="white">Save</button>
            </form>
        </div>
    );
}