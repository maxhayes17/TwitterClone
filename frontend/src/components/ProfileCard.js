export default function ProfileCard({username, createdAt}){
    return(
        <div className="mainCard">
            <h1>Your profile</h1>
            <h3>{username}</h3>
            <p>@{username}</p>
            <p>Joined {createdAt.slice(0,10)}</p>
        </div>
    );
}