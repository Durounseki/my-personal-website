import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";
import styles from "../../styles/Blog.module.css";

function BlogPostCard({ post, isAdmin, csrfToken }) {
  console.log(post);
  const { publishPost, deletePost } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (post.published) {
      navigate({ to: `/blog/posts/${post.id}` });
    } else {
      navigate({ to: `/blog/posts/${post.id}/edit` });
    }
  };

  const handleEdit = async (event) => {
    event.stopPropagation();
    localStorage.setItem("post-title", post.title);
    localStorage.setItem("post-category", post.category?.name || "");
    localStorage.setItem("post-body", post.body);
    localStorage.setItem("post-summary", post.summary);
    localStorage.setItem(
      "post-keywords",
      post.keywords.map((k) => k.name).join(", ")
    );

    await publishPost({ postId: post.id, token: csrfToken, published: false });

    navigate({ to: `/blog/posts/${post.id}/edit` });
  };

  const handlePublish = (e) => {
    e.stopPropagation();
    publishPost({ postId: post.id, token: csrfToken, published: true });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deletePost({ postId: post.id, token: csrfToken });
  };

  return (
    <section className={styles["blog-post"]} onClick={handleClick}>
      <header>
        <div className="post-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        {isAdmin && (
          <div className={styles["post-actions"]}>
            <ul>
              {post.published ? (
                <li>
                  <a onClick={handleEdit}>Edit</a>
                </li>
              ) : (
                <>
                  <li>
                    <a onClick={handlePublish}>Publish</a>
                  </li>
                  <li>
                    <a onClick={handleDelete}>Delete</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </header>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-summary">
        {JSON.parse(post.summary).blocks[0]?.data.text || "Summary..."}
      </p>
      <footer className={styles["post-keywords"]}>
        <ul>
          {post.keywords.map((k) => (
            <li key={k.id}>{k.name}</li>
          ))}
        </ul>
      </footer>
    </section>
  );
}

export default BlogPostCard;
