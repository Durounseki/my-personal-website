import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Resume(){
    const resumeLinkRef = useRef(null);
    const navigate = useNavigate();
    const apiRootUrl = "http://localhost:8080";
    const handleClick = (url) => {
        try{
            window.open(`${apiRootUrl}${url}`,'_blank');
        }catch(error){
            console.log("Error fetching resume", error);
        }
    }
    useEffect(() => {
        const resumeLink = document.querySelector('.resume');
        resumeLink.click();
    },[]);

    return(
        <>
            <button onClick={() => navigate("/")}>Back Home</button>
            <a className="resume" href="#" onClick={()=> handleClick("/api/resume")}>
                <i className="fa-solid fa-file-lines"></i>
                <p>CV</p>
            </a>
        </>
    )
}

export default Resume;