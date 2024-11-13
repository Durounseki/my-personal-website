import { useEffect, useState, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import BlogCategory from './BlogCategory.jsx';
import DOMPurify from "dompurify";
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

    const {isAuthenticated, isAdmin} = useOutletContext();
    const {categories, loading, error} = useCategories();
    const newPostRef = useRef(null)
    const createPostRef = useRef(null);
    const [postTitle, setPostTitle] = useState('');
    const [postCategory, setPostCategory] = useState('');
    const navigate = useNavigate();

    const createPost = (event) => {
        event.preventDefault();
        localStorage.setItem('post-title', DOMPurify.sanitize(postTitle));
        localStorage.setItem('post-category', DOMPurify.sanitize(postCategory));
        localStorage.setItem('post-body',"");
        localStorage.setItem('post-keywords',"");
        localStorage.setItem('post-summary',"");
        navigate('create')
    }

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>A network error was encountered</p>
    }

    return (

        <>
            {isAdmin ?
            <>
                <h1>Blog</h1>
                <section className="new-post-form">
                    <form ref={createPostRef} onSubmit={createPost}>
                        <h2>New Post</h2>
                        <div className="form-group">
                            <label for="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={postTitle}
                                onChange={e => setPostTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label for="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={postCategory}
                                onChange={e => setPostCategory(e.target.value)}
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </section>
                <BlogCategory category={"UNPUBLISHED"} isAdmin={isAdmin}/>
            </>
            :
            <>
            <h1>Blog</h1> 
                <section className="blog-intro">
                <p>
                    I started learning web development at the beginning of 2023. I was hooked from the moment I was able to see <b>"Hello World!"</b> displayed on my browser. I still
                    have much to learn but I would like to share some of my notes and thoughts with you. Feel free to explore and don't hesitate to reach out!
                </p>
                </section>
            </>
            }
            
            {categories.map((category) => (
                <BlogCategory key={category.id} category={category} isAdmin={isAdmin}/>
            ))}
        </>
    )
}

export default Blog;