import'./Home.css';
import Details from "./Details";
import Skills from "./Skills";
import Projects from './Projects';

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