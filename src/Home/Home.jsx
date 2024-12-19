import Details from "./Details/Details.jsx";
import Skills from "./Skills/Skills.jsx";
import Projects from './Projects/Projects.jsx';

function Home(){
    const details = {
        name: "Esparza Lopez",
        role: "Full Stack Developer",
        contact: "christian@esparzalopez.com",
        location: "Japan",
        socialLinks: [
            {
                href: "https://github.com/Durounseki",
                faClass: "fa-brands fa-github",
            },
            {
                href: "https://www.linkedin.com/in/christian-esparza-115128200/",
                faClass: "fa-brands fa-linkedin",
            }
        ]
    }
    return (
        <>
            <Details details={details}/>
            <Skills/>
            <Projects/>
        </>
    )
}

export default Home;