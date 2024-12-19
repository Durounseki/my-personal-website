import PublicationCard from "./PublicationCard.jsx";
import './Publications.css';
import fallbackPublications from "./fallbackPublications.js";
import { useState, useEffect } from "react";

function Publications(){
    const [publications, setPublications] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`${apiRootUrl}/api/projects`, {mode: "cors"});
                const data = await response.json();
                setPublications(data);
            }catch{
                setPublications(fallbackPublications);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[]);
    if(loading){
        return <p>Loading...</p>
    }
    return (
        <>
            <section className="publications">
                <h2>PUBLICATIONS</h2>
                {publications.map((publication) => (
                    <PublicationCard key={publication.id} publication={publication}/>
                ))}
            </section>
        </>
    )
}

export default Publications;