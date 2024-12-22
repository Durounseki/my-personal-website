import PublicationCard from "./Components/PublicationCard";
import './style.css';
import fallbackPublications from "./utils/fallbackPublications.js";
import { useState, useEffect } from "react";

function Publications(){
    const [publications, setPublications] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`${apiRootUrl}/api/publications`, {mode: "cors"});
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
    }else{
        console.log("pubs:",publications)
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