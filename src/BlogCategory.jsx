import { useEffect, useState } from "react";
import BlogPostCard from "./BlogPostCard.jsx";

const useLatestPosts = (categoryId) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${apiRootUrl}/api/blog/posts?categoryId=${categoryId}&published=true`, {mode: "cors"})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => setPosts(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },[]);
    
    return {posts, loading, error};
}

const useUnpublished = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        fetch(`${apiRootUrl}/api/blog/posts?published=false`,{mode: "cors"})
        .then(response => {
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(data => setPosts(data))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }, []);

    return {posts, loading, error};
}

function BlogCategory({category,isAdmin}){
    console.log("category: ", category);
    const {posts, loading, error} = category.id ? useLatestPosts(category.id) : useUnpublished(category.id);
    console.log("posts, loading, error", posts, loading, error)

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>A network error was encountered</p>
    }
    if(posts.length === 0){
        return (
            <section className="blog-category">
                <h2 className="blog-category-name">{category.name ? category.name.toUpperCase() : category.toUpperCase()}</h2>
                <div className="latest-posts">
                    <section className="blog-post">
                        <h3>Nothing here yet, stay tuned!</h3>
                    </section>
                </div>
            </section>
        )
    }
    return (
        <section className="blog-category">
            <h2 className="blog-category-name">{category.name ? category.name.toUpperCase() : category.toUpperCase()}</h2>
            <div className="latest-posts">
                {posts.map((post) => (
                    <BlogPostCard key={post.id} post={post} isAdmin={isAdmin}/>
                ))}
            </div>
        </section>
    )
}

export default BlogCategory;