import { useEffect, useState } from 'react';
import BlogCategory from './BlogCategory.jsx';
import './Blog.css';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${apiRootUrl}/api/blog/categories`,{mode: "cors"})
        .then(response => {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(data => setCategories(data))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }, []);

    return {categories, loading, error};
}

function Blog(){

    const {categories, loading, error} = useCategories();

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>A network error was encountered</p>
    }

    return (

        <>
            <h1>Blog</h1>
            <section className="blog-intro">
            <p>
                I started learning web development at the beginning of 2023. I was hooked from the moment I was able to see <b>"Hello World!"</b> displayed on my browser. I still
                have much to learn but I would like to share some of my notes and thoughts with you. Feel free to explore and don't hesitate to reach out!
            </p>
            </section>
            {categories.map((category) => (
                <BlogCategory key={category.id} category={category}/>
            ))}
        </>
    )
}

export default Blog;