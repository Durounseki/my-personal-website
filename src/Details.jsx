import SocialLink from "./SocialLink.jsx"
import './Details.css'

function Details({details}){
    
    const apiRootUrl = "http://localhost:8080";

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
                    <a className="resume" href="#" onClick={()=> handleClick("/api/resume")}>
                        <i className="fa-solid fa-file-lines"></i>
                        <p>CV</p>
                    </a>
                </div>
            </section>
        </>
    )
}
export default Details;