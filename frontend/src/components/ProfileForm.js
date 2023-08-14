import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import ExploreCard from "./ExploreCard";
import VerticalNav from "./VerticalNav";

export default function ProfileForm(){
    const navigate = useNavigate();
    // Should only be able to edit profile of user logged in
    // const {id} = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const {id} = useParams();
    console.log(id);
    const handleSubmit = (form) => {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJSON = Object.fromEntries(formData.entries());
        // console.log(formJSON);
        // let fileName = formJSON.avatar.name;
        // formJSON.avatar = fileName;
        // console.log(formJSON);

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
            // setUser(data);
            navigate("/profile/" + id);
        })
        .catch((err) => console.log(err));

        form.target.reset();
    }
    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <VerticalNav header="Edit profile"/>
                <div className="profileForm" style={{marginTop:"20px"}}>
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                        <div className="image-avatar" style={{width:"150px", height:"150px", marginInline:"auto", marginBlock:"15px"}}>
                            <img src={require("../image-avatar-blank.png")}></img>
                        </div>
                        <input type="file" name="avatar" accept=".jpeg, .jpg, .png"/>
                        <input placeholder="Name" name="name" autoComplete="off" type="text"/>
                        <textarea placeholder="Bio" name="bio" autoComplete="off" />
                        <input placeholder="Location" name="location" autoComplete="off" type="text"/>
                        <input placeholder="Website" name="website" autoComplete="off" type="text"/>
                        <button type="submit" className="button-round" id="white">Save</button>
                    </form>
                </div>
            </div>
            <ExploreCard />
        </div>
    );
}