import SocialLink from "./SocialLink.jsx"
import './Details.css'

function Details(){
    
    const apiRootUrl = "http://localhost:8080";

    const handleClick = (url) => {
        try{
            window.open(`${apiRootUrl}${url}`,'_blank');
        }catch(error){
            console.log("Error fetching resume", error);
        }
    }

    const socialLinks = [
        {
            href: "https://github.com/Durounseki",
            faClass: "fa-brands fa-github",
        },
        {
            href: "https://www.linkedin.com/in/christian-esparza-115128200/",
            faClass: "fa-brands fa-linkedin",
        }
    ]

    return (
        <>
            <header>
                <h1 className="name">Esparza Lopez</h1>
                <p className="role">Full Stack Developer</p>
                <p className="contact">christian@esparzalopez.com</p>
                <p className="location"><i className="fa-solid fa-location-dot"></i> Japan</p>
                <div className="social-links">
                    {socialLinks.map((link, index) => (
                        <SocialLink key={index} link={link}/>
                    ))}
                    <a className="resume" href="#" onClick={()=> handleClick("/api/resume")}>
                        <i className="fa-solid fa-file-lines"></i><p>Resume</p>
                    </a>
                </div>
            </header>
        </>
    )
}
export default Details;