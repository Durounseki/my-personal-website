import { useEffect, useState } from "react";
import BlogPostCard from "../BlogPostCard/index.jsx";
import PropTypes from 'prop-types';

const usePosts = (category) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiRootUrl = "http://localhost:8080";

    useEffect(() => {
        const fetchData = async () => {

            try{

                const url = category.id
                ? `${apiRootUrl}/api/blog/posts?categoryId=${category.id}&published=true`
                : `${apiRootUrl}/api/blog/posts?published=false`;
                
                const response = await fetch(url, {mode: "cors"});
                const data = await response.json();
                
                setPosts(data);
                
            }finally{
                setLoading(false)
            }
        }

        fetchData();
        
    },[category]);
    
    return {posts, loading};
}

function BlogCategory({category,isAdmin,csrfToken}){
    const {posts, loading} = usePosts(category);

    if(loading){
        return <p>Loading...</p>
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