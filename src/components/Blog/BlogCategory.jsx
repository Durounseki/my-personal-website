import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../data/api";
import BlogPostCard from "./BlogPostCard";

function BlogCategory({ category, isAdmin, csrfToken }) {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", category.id || "unpublished"],
    queryFn: async () => {
      const url = category.id
        ? `/api/blog/posts?categoryId=${category.id}&published=true`
        : `/api/blog/posts?published=false`;
      const res = await apiClient(url);
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const categoryName = category.name
    ? category.name.toUpperCase()
    : category.toUpperCase();

  return (
    <section className="blog-category">
      <h2 className="blog-category-name">{categoryName}</h2>
      <div className="latest-posts">
        {posts.length === 0 ? (
          <section className="blog-post">
            <h3>Nothing here yet, stay tuned!</h3>
          </section>
        ) : (
          posts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              isAdmin={isAdmin}
              csrfToken={csrfToken}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default BlogCategory;
