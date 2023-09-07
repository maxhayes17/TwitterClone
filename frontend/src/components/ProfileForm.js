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

        // Retrieve entries from form to send with formData
        const formEntries = new FormData(form.target)
        const formJSON = Object.fromEntries(formEntries.entries());
        for (let field in formJSON){
            formData.append(field, formJSON[field])
        }
        // formData.append("file", file)
        if(file)
            formData.append("picture_path", file.name);

        console.log(formData);

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
        <div className="flex flex-row w-screen h-screen">
            <Navbar />
            <div className="w-5/12 h-full overflow-auto bg-black text-left">
                <div className="w-full sticky top-0 z-10 py-1 bg-black-rgba backdrop-blur-sm">
                    <div className="flex flex-row space-x-5 p-1">
                        <div onClick={() => navigate(-1)} className="ml-1 my-auto">
                            {/* back button  */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 p-2 rounded-full hover:bg-raisin-black hover:cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </div>
                        <h1 className="my-auto text-xl font-extrabold">Edit Profile</h1>
                    </div>
                </div>

                <form className="flex flex-col mt-16 space-y-3" onSubmit={handleSubmit} enctype="multipart/form-data">
                    <div className="w-fit shrink-0 mx-auto">
                        <img className="w-36 h-36 rounded-full object-cover mx-auto hover:cursor-pointer hover:opacity-80 border-4 border-onyx" src={`http://localhost:3001/uploads/${currentUser.picture_path ? currentUser.picture_path : "image-avatar-blank.png"}`}></img>
                    </div>
                    <input className="w-fit mx-auto text-sm file:bg-raisin-black file:rounded-full file:px-3 file:py-2 file:text-white file:font-bold file:border-none file:hover:bg-twitter-blue file:hover:text-twitter-blue file:hover:bg-opacity-20"
                        type="file" name="file" accept=".jpeg, .jpg, .png" onChange={(e) => setFile(e.target.files[0])}/>
                    <input className="w-full p-3 bg-raisin-black rounded-md"
                        placeholder="Name" name="name" autoComplete="off" type="text"/>
                    <textarea className="w-full h-24 p-3 bg-raisin-black rounded-md resize-none" 
                        placeholder="Bio" name="bio" autoComplete="off" />
                    <input className="w-full p-3 bg-raisin-black rounded-md"
                        placeholder="Location" name="location" autoComplete="off" type="text"/>
                    <input className="w-full p-3 bg-raisin-black rounded-md"
                        placeholder="Website" name="website" autoComplete="off" type="text"/>
                    <button type="submit" className="bg-white px-4 py-2 ml-auto h-fit rounded-full text-black font-bold hover:opacity-70 hover:cursor-pointer">Save</button>
                </form>
            </div>
            <ExploreCard />
        </div>
    );
}