
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ExploreCard(){

    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        setResults([]);
    }, []);

    return(
        <div className="w-1/3 h-full sticky top-0 flex flex-col border-l border-onyx bg-black">
            <div className="mt-5">
                <form>
                    <input className="w-full mb-5 px-4 py-2 bg-raisin-black rounded-full"
                        type="text" placeholder="Search TwitClone" 
                        onChange={e => {
                            let result = users.filter((user) => {
                                return user.username.toLowerCase().includes(e.target.value.toLowerCase())
                            });
                            setResults(result);
                            setSearch(e.target.value);
                        }}                 
                    />
                </form>
                {search && <div className="flex flex-col last:border-b last:border-onyx">
                {results && results.length < users.length 
                && results.map(({_id, name, username, bio, picture_path}) =>

                    <div className="py-2 px-4 bg-black hover:bg-black-semitransparent hover:cursor-pointer text-left" key={_id} onClick={() => {navigate(`/profile/${_id}`)}}>
                        <div className="flex flex-row">
                            <div className="w-fit shrink-0 mr-3">
                                <img className="w-14 h-14 rounded-full object-cover mx-auto" src={`http://localhost:3001/uploads/${picture_path ? picture_path : "image-avatar-blank.png"}`}></img>
                            </div>

                            <div className="flex flex-col text-left">
                                <a className="text-md text-white font-bold hover:underline hover:underline-offset-2 hover:decoration-white hover:opacity-100">{name}</a>
                                <a className="text-md text-neutral-400">@{username}</a>
                                <p>{bio}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-row py-3 px-4 bg-black hover:bg-black-semitransparent hover:cursor-pointer text-left"
                    onClick={() => {navigate(`/explore/${search}`)}}>
                        <p className="text-bold text-twitter-blue">#{search}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 my-auto ml-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
</div>
                </div>}
            </div>
        </div>
    )
}