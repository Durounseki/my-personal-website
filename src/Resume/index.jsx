import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Resume({url}){
    const navigate = useNavigate();
    const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;
    const handleClick = (url) => {
        try{
            window.open(`${apiRootUrl}${url}`,'_blank');
        }catch(error){
            throw new Error(`Error fetching resume: ${error.message}`);
        }
    }
    useEffect(() => {
        const resumeLink = document.querySelector('.resume');
        resumeLink.click();
    },[]);

    return(
        <>
            <button onClick={() => navigate("/")}>Back Home</button>
            <a className="resume" href="#" onClick={()=> handleClick(url)}>
                <i className="fa-solid fa-file-lines"></i>
                <p>CV</p>
            </a>
        </>
    )
}

Resume.propTypes = {
    url: PropTypes.string,
}

export default Resume;