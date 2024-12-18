import Details from "./Details";
import Publications from "./Publications";
import { useState, useEffect } from "react";


function Research(){
    const details = {
        name: "Esparza Lopez",
        role: "PhD Applied Mathematics",
        contact: "christian.esparza@oist.jp",
        location: "Okinawa Institute of Science and Technology",
        socialLinks: [
            {
                href: "https://scholar.google.com/citations?hl=en&user=cOaU1pUAAAAJ",
                faClass: "fa-brands fa-google-scholar",
            },
            {
                href: "https://www.linkedin.com/in/christian-esparza-115128200/",
                faClass: "fa-brands fa-linkedin",
            }
        ]
    }
    const [publications, setPublications] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${apiRootUrl}/api/publications`, {mode: "cors"})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setPublications(data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },[]);
    
    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        console.log(error);
        return <p>A network error was encountered</p>
    }
    
    return (
        <>
            <Details details={details}/>
            <section className="research">
                <h2>BIO</h2>
                <article>
                    <p>
                        Currently a postdoctoral researcher in Okinawa, fascinated by the physics of <b>complex systems</b> such as animal groups and social networks. My research aims
                        to understand the emergence of order from simple interactions using a data-driven approach combining <b>theoretical physics</b> and <b>machine learning</b>.
                        I completed my PhD with <a href="https://www.damtp.cam.ac.uk/user/lauga/index.html" rel="noopener noreferrer" target="_blank">Prof Eric Lauga</a> at the DAMTP
                        (University of Cambridge). My doctoral research focused on understanding bacterial locomotion through <b>mathematical modelling</b> and <b>computer simulations</b>.
                    </p>
                </article>
            </section>
            <Publications publications={publications}/>
        </>
    )
}

export default Research;