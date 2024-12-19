import { useEffect, useState } from "react";
import BlogPostCard from "../BlogPostCard/index.jsx";
import PropTypes from 'prop-types';

const usePosts = (category) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        const url = category.id
            ? `${apiRootUrl}/api/blog/posts?categoryId=${category.id}&published=true`
            : `${apiRootUrl}/api/blog/posts?published=false`
        fetch(url, {mode: "cors"})
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => setPosts(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },[category]);
    
    return {posts, loading, error};
}

function BlogCategory({category,isAdmin,csrfToken}){
    console.log("category: ", category);
    const {posts, loading, error} = usePosts(category);
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
                    <BlogPostCard key={post.id} post={post} isAdmin={isAdmin} csrfToken={csrfToken}/>
                ))}
            </div>
        </section>
    )
}

BlogCategory.propTypes = {
    category: PropTypes.oneOfType([
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        }),
        PropTypes.string,
    ]),
    isAdmin: PropTypes.bool.isRequired,
    csrfToken: PropTypes.string.isRequired
}

export default BlogCategory;