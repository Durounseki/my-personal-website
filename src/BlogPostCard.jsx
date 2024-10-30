import { useNavigate } from "react-router-dom";

function BlogPostCard({post}){
    const postDate = new Date(post.createdAt);
    const [day, weekday] = postDate.toLocaleDateString('en-JP', {day: 'numeric', weekday: 'long'}).split(' ');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${post.id}`);
    }

    return (
        <>
            <section className="blog-post" onClick={handleClick}>
                <header className="post-date">{weekday} {day}</header>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-summary">{post.summary}</p>
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