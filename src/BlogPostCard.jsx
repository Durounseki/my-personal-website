import {useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

function BlogPostCard({post, isAdmin}){
    const { deletePost } = useAuth();
    const postDate = new Date(post.createdAt);
    const [day, weekday] = postDate.toLocaleDateString('en-JP', {day: 'numeric', weekday: 'long'}).split(' ');
    const cardRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${post.id}`);
    }

    const handleEdit = (event) => {
        event.stopPropagation();
        console.log("Editing post");
    }

    const handlePublish = (event) => {
        event.stopPropagation();
        console.log("Publishing post");
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        console.log("Deleting post");
        const success = deletePost(post.id);
        if(success){
            cardRef.current.remove();
        }
    }

    return (
        <>
            <section className="blog-post" onClick={handleClick} ref={cardRef}>
                <header>
                    <div className="post-date">{weekday} {day}</div>
                    {isAdmin && 
                        <div className="post-actions">
                            <ul>
                                <li>
                                    <a onClick={handleEdit}>Edit</a>
                                </li>
                                <li>
                                    <a onClick={handlePublish}>Publish</a>
                                </li>
                                <li>
                                    <a onClick={handleDelete}>Delete</a>
                                </li>
                            </ul>
                        </div>
                    }
                </header>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-summary">{JSON.parse(post.summary).blocks[0].data.text}</p>
                <footer className="post-keywords">
                    <ul>
                        {post.keywords.map((keyword) => (
                            <li key={keyword.id}>{keyword.name}</li>
                        ))}
                    </ul>
                </footer>
            </section>
        </>
    )
}

export default BlogPostCard;