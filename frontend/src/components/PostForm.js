import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import ExploreCard from "./ExploreCard";
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
                        <h1 className="my-auto text-xl font-extrabold">New Post</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-4/5 space-y-2">
                    <textarea className="h-36 p-5 bg-raisin-black rounded-md resize-none" placeholder="What would you like to say?" name="body" autoComplete="off" required/>
                    <div className="flex flex-row justify-between text-neutral-400">
                        <input className="w-fit text-sm file:bg-raisin-black file:rounded-full file:px-3 file:py-2 file:text-white file:font-bold file:border-none file:hover:bg-twitter-blue file:hover:text-twitter-blue file:hover:bg-opacity-20"
                        type="file" name="file" accept=".jpeg, .jpg, .png" onChange={(e) => setFile(e.target.files[0])}/>
                            <select className="bg-raisin-black rounded-md p-1" name="audience" required>
                                <option value="Everyone">Everyone</option>
                                <option value="Followers">My followers</option>
                            </select>
                            <button type="submit" className="w-fit h-fit my-auto ml-auto px-4 py-2 rounded-full text-white font-bold bg-twitter-blue hover:opacity-70 hover:cursor-pointer">Post</button>
                    </div>
                </form>
            </div>
            <ExploreCard />
        </div>
    )
}