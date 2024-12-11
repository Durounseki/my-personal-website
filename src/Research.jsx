import Details from "./Details";
import Publications from "./Publications";


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
    const publications = [
        {
            id: 0,
            title: "Learning collective behavior from data",
            authors: "C. Esparza-López, G. Stephens",
            journal: "In preparation",
            volume: "",
            page: "",
            year: "2024",
            link: "", 
            keywords: ["machine learning", "collective behavior", "diffusion maps"]
        },
        {
            id: 1,
            title: "Rate invariance and scallop theorem in viscosity gradients",
            authors: "C. Esparza-López, E. Lauga",
            journal: "Phys. Rev. Fluids",
            volume: "8",
            page: "063301",
            year: "2023",
            link: "https://www.damtp.cam.ac.uk/user/lauga/papers/217.pdf", 
            keywords: ["scallop theorem", "low-Reynolds number", "viscosity gradients", "reciprocal locomotion", "swimming microorganisms"]
        },
        {
            id: 2,
            title: "Dynamics of a helical swimmer crossing viscosity gradients",
            authors: "C. Esparza-López, J. Gonzalez-Gutierrez, F. Solorio-Ordaz, E. Lauga, R. Zenit",
            journal: "Phys. Rev. Fluids",
            volume: "6",
            page: "083102",
            year: "2021",
            link: "https://arxiv.org/pdf/2012.04788", 
            keywords: ["low-Reynolds number", "viscosity gradients", "artificial swimmers", "swimming bacteria", "resistive force theory"]
        },
        {
            id: 3,
            title: "Hydrodynamic model for Spiroplasma motility",
            authors: "C. Esparza-López, E. Lauga",
            journal: "Phys. Rev. Fluids",
            volume: "5",
            issue: "9",
            page: "093102",
            year: "2020",
            link: "https://www.damtp.cam.ac.uk/user/lauga/papers/181.pdf", 
            keywords: ["Spiroplasma", "swimming bacteria", "hydrodynamics", "low-Reynolds number", "resistive force theory"] 
        },
        {
            id: 4,
            title: "A stochastic model for bacteria-driven micro-swimmers",
            authors: "C. Esparza-López, A. Théry, E. Lauga",
            journal: "Soft Matter",
            volume: "15",
            issue: "12",
            page: "2605-2616", 
            year: "2019",
            link: "https://www.damtp.cam.ac.uk/user/lauga/papers/158.pdf",
            keywords: ["bacteria-driven microswimmers", "random walks", "run-and-tumble", "hydrodynamics", "microrobotics", "active matter", "swimming bacteria"] 
        }

    ]
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