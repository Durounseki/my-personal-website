import { useState, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { apiClient } from "../../data/api";
import BlogPostCard from "../../components/Blog/BlogPostCard";
import BlogCategory from "../../components/Blog/BlogCategory";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  const { isAdmin, csrfToken } = Route.useRouteContext();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const createPostRef = useRef(null);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", "published"],
    queryFn: async () => {
      const res = await apiClient("/api/blog/posts?published=true");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const handleCreatePost = (event) => {
    event.preventDefault();
    localStorage.setItem("post-title", DOMPurify.sanitize(postTitle));
    localStorage.setItem("post-category", DOMPurify.sanitize(postCategory));
    localStorage.setItem("post-body", "");
    localStorage.setItem("post-keywords", "");
    localStorage.setItem("post-summary", "");
    navigate({ to: "/blog/posts/create" });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {isAdmin ? (
        <>
          <h1 className="blog-index">Blog</h1>
          <section className="new-post-form">
            <form ref={createPostRef} onSubmit={handleCreatePost}>
              <h2>New Post</h2>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                />
              </div>
              <input type="hidden" name="_csrf" value={csrfToken} />
              <button type="submit">Create</button>
            </form>
          </section>
          <BlogCategory
            category="UNPUBLISHED"
            isAdmin={isAdmin}
            csrfToken={csrfToken}
          />
        </>
      ) : (
        <>
          <h1 className="blog-index">Blog</h1>
          <section className="blog-intro">
            <p>
              I started learning web development at the beginning of 2023. I was
              hooked from the moment I was able to see{" "}
              <b>&quot;Hello World!&quot;</b> displayed on my browser. I still
              have much to learn but I would like to share some of my notes and
              thoughts with you.
            </p>
          </section>
        </>
      )}

      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          isAdmin={isAdmin}
          csrfToken={csrfToken}
        />
      ))}
    </>
  );
}
