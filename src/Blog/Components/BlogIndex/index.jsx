import { useEffect, useState, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import DOMPurify from "dompurify";
import BlogPostCard from "../BlogPostCard";
import BlogCategory from "../BlogCategory";

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`${apiRootUrl}/api/blog/posts?published=true`, {mode: "cors"});
                const data = await response.json();
                setPosts(data);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
        
    },[]);
    
    return {posts, loading};
}

function Blog(){

    const {isAdmin, csrfToken} = useOutletContext();
    const {posts, loading} = usePosts();
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

    return (

        <>
            {isAdmin ?
            <>
                <h1 className='blog-index'>Blog</h1>
                <section className="new-post-form">
                    <form ref={createPostRef} onSubmit={createPost}>
                        <h2>New Post</h2>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={postTitle}
                                onChange={e => setPostTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={postCategory}
                                onChange={e => setPostCategory(e.target.value)}
                            />
                        </div>
                        <input
                            type='hidden'
                            name="_csrf"
                            value={csrfToken}
                        />
                        <button type="submit">Create</button>
                    </form>
                </section>
                <BlogCategory category={"UNPUBLISHED"} isAdmin={isAdmin} csrfToken={csrfToken}/>
            </>
            :
            <>
            <h1 className='blog-index'>Blog</h1> 
                <section className="blog-intro">
                <p>
                    I started learning web development at the beginning of 2023. I was hooked from the moment I was able to see <b>&quot;Hello World!&quot;</b> displayed on my browser. I still
                    have much to learn but I would like to share some of my notes and thoughts with you. Feel free to explore and don&apos;t hesitate to reach out!
                </p>
                </section>
            </>
            }
            
            {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} isAdmin={isAdmin} csrfToken={csrfToken}/>
            ))}
        </>
    )
}

export default Blog;