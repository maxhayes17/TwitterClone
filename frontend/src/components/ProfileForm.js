import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import ExploreCard from "./ExploreCard";
import VerticalNav from "./VerticalNav";
import { useState, useEffect } from "react";

export default function ProfileForm(){
    const navigate = useNavigate();
    // Should only be able to edit profile of user logged in
    // const {id} = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const {id} = useParams();
    const [file, setFile] = useState(null);


    const currentUser = useSelector((state) => state.user);
    const [user, setUser] = useState(null);


    const handleSubmit = (form) => {
        form.preventDefault();
        const formData = new FormData();
        for (let field in form){
            formData.append(field, form[field]);
        }
        formData.append("file", file)
        formData.append("picture_path", file.name);

        fetch(`http://localhost:3001/user/${id}/edit`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
            navigate(-1);
        })
        .catch((err) => console.log(err));

        form.target.reset();
    }
    return(
        <div>
            <Navbar />
            <div className="mainCard">
                <VerticalNav header="Edit profile"/>
                <div className="profileForm" style={{marginTop:"50px"}}>
                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
                        {/* <div className="image-avatar" style={{width:"150px", height:"150px", marginInline:"auto", marginBlock:"15px"}}>
                            <img src={`http://localhost:3001/uploads/${user.picture_path ? user.picture_path : "image-avatar-blank.png"}`}></img>
                        </div> */}
                        <p style={{fontWeight:"bold"}}>Upload profile photo</p>
                        <input type="file" name="file" accept=".jpeg, .jpg, .png" onChange={(e) => setFile(e.target.files[0])}/>
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