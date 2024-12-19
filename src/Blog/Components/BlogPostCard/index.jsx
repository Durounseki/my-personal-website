import {useRef} from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../../../Auth/AuthContext/useAuth';
import PropTypes from 'prop-types';

function BlogPostCard({post, isAdmin, csrfToken}){
    const { publishPost, deletePost } = useAuth();
    const postDate = new Date(post.createdAt).toLocaleDateString('en-JP',{ month: 'long', day: 'numeric', year: 'numeric'});
    const cardRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${post.id}`);
    }

    const handleEdit = async (event) => {
        event.stopPropagation();
        const success = await publishPost(post.id,csrfToken,false);
        if(success){
            navigate(`/blog/${post.id}`)
        }
    }

    const handlePublish = async (event) => {
        event.stopPropagation();
        const success = await publishPost(post.id,csrfToken,true);
        if(success){
            navigate('/blog');
        }
    }

    const handleDelete = async (event) => {
        event.stopPropagation();
        const success = await deletePost(post.id,csrfToken);
        if(success){
            cardRef.current.remove();
        }
    }

    return (
        <>
            <section className="blog-post" onClick={handleClick} ref={cardRef}>
                <header>
                    <div className="post-date">{postDate}</div>
                    {isAdmin && 
                        <div className="post-actions">
                            <ul>
                                {post.published &&
                                <li>
                                    <a onClick={handleEdit}>Edit</a>
                                </li>
                                }
                                {!post.published &&
                                <><li>
                                    <a onClick={handlePublish}>Publish</a>
                                </li>
                                <li>
                                    <a onClick={handleDelete}>Delete</a>
                                </li></>
                                }
                            </ul>
                        </div>
                    }
                </header>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-summary">{JSON.parse(post.summary).blocks[0] ? JSON.parse(post.summary).blocks[0].data.text : "Summary..."}</p>
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

BlogPostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        keywords: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })
        ).isRequired,
        createdAt: PropTypes.string.isRequired,
        published: PropTypes.bool.isRequired, 
      }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    csrfToken: PropTypes.string.isRequired
}

export default BlogPostCard;