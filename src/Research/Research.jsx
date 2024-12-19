import Details from "../Home/Details/Details.jsx";
import Publications from "./Publications/Publications.jsx";
import Bio from "./Bio/Bio.jsx";


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

    return (
        <>
            <Details details={details}/>
            <Bio/>
            <Publications/>
        </>
    )
}

export default Research;