import SocialLink from "./Components/SocialLink"
import './style.css';
import { useRef } from "react";
import PropTypes from 'prop-types';

function Details({details}){
    
    const apiRootUrl = "http://localhost:8080";
    const resumeRef = useRef(null);

    const handleResume = () => {
        resumeRef.current.classList.toggle("show");
    }

    const handleClick = (url) => {

        try{
            window.open(`${apiRootUrl}${url}`,'_blank');
        }catch(error){
            console.log("Error fetching resume", error);
        }
    }

    return (
        <>
            <section className="details">
                <h1 className="name">{details.name}</h1>
                <p className="role">{details.role}</p>
                <p className="contact">{details.contact}</p>
                <p className="location"><i className="fa-solid fa-location-dot"></i> {details.location}</p>
                <div className="social-links">
                    {details.socialLinks.map((link, index) => (
                        <SocialLink key={index} link={link}/>
                    ))}
                    <div className="resume-container">
                        <a className="resume" onClick={() => handleResume()}>
                            <i className="fa-solid fa-file-lines"></i>
                        </a>
                        <div className="resume-list" ref={el => resumeRef.current =el}>
                            <ul>
                                <li><a onClick={() => handleClick("/api/resume")}>Resume</a></li>
                                <li><a onClick={() => handleClick("/api/rirekisho")}>履歴書</a></li>
                                <li><a onClick={() => handleClick("/api/keirekisho")}>経歴書</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
Details.propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      socialLinks: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string.isRequired, // From SocialLink.propTypes
          faClass: PropTypes.string.isRequired, // From SocialLink.propTypes
        })
      ).isRequired,
    }).isRequired,
};
export default Details;