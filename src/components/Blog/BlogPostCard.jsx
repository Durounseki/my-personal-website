import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";

function BlogPostCard({ post, isAdmin, csrfToken }) {
  const { publishPost, deletePost } = useAuth();
  const navigate = useNavigate();

  const postDate = new Date(post.createdAt).toLocaleDateString("en-JP", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleClick = () => {
    navigate({
      to: post.published
        ? `/blog/posts/${post.id}`
        : `/blog/posts/${post.id}/edit`,
    });
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    await publishPost({ postId: post.id, token: csrfToken, published: false });
    navigate({ to: `/blog/posts/${post.id}/edit` });
  };

  return (
    <section className="blog-post" onClick={handleClick}>
      <header>
        <div className="post-date">{postDate}</div>
        {isAdmin && (
          <div className="post-actions">
            <ul>
              {post.published ? (
                <li>
                  <a onClick={handleEdit}>Edit</a>
                </li>
              ) : (
                <>
                  <li>
                    <a
                      onClick={(e) => {
                        e.stopPropagation();
                        publishPost({
                          postId: post.id,
                          token: csrfToken,
                          published: true,
                        });
                      }}
                    >
                      Publish
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePost({ postId: post.id, token: csrfToken });
                      }}
                    >
                      Delete
                    </a>
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
      <footer className="post-keywords">
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
