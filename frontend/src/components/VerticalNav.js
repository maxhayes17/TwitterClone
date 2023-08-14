import { useNavigate } from "react-router-dom";


export default function VerticalNav({header}){

    const navigate = useNavigate();

    return(
        <div className="vertical-nav">
            <div className="inline" style={{marginBlock:"20px"}}>
                {/* <div className="backBtn" id="black" onClick={() => navigate(-1)}> */}
                    <a onClick={() => navigate(-1)}>
                        {/* back button  */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                        </svg> 
                    </a>
                {/* </div> */}
                <h2 style={{marginBlock: "auto", marginLeft:"10px"}}>{header}</h2>
            </div>
        </div>
    );
}