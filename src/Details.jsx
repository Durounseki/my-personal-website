import SocialLink from "./SocialLink.jsx"
import './Details.css'

function Details(){
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
                <div className="social-links">
                    {socialLinks.map((link, index) => (
                        <SocialLink key={index} link={link}/>
                    ))}
                </div>
            </header>
        </>
    )
}

export default Details;