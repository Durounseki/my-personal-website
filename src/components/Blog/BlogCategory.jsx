import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api/apiClient";
import BlogPostCard from "../BlogPostCard";
import PropTypes from "prop-types";
import styles from "../../styles/Blog.module.css";

function BlogCategory({ category, isAdmin, csrfToken }) {
  const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", category.id || "unpublished"],
    queryFn: async () => {
      const url = category.id
        ? `${apiRootUrl}/api/blog/posts?categoryId=${category.id}&published=true`
        : `${apiRootUrl}/api/blog/posts?published=false`;

      const res = await apiClient(url.replace(apiRootUrl, ""));
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (posts.length === 0) {
    return (
      <section className={styles["blog-category"]}>
        <h2 className="blog-category-name">
          {category.name ? category.name.toUpperCase() : category.toUpperCase()}
        </h2>
        <div className="latest-posts">
          <section className={styles["blog-post"]}>
            <h3>Nothing here yet, stay tuned!</h3>
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className={styles["blog-category"]}>
      <h2 className="blog-category-name">
        {category.name ? category.name.toUpperCase() : category.toUpperCase()}
      </h2>
      <div className="latest-posts">
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
            isAdmin={isAdmin}
            csrfToken={csrfToken}
          />
        ))}
      </div>
    </section>
  );
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
  csrfToken: PropTypes.string.isRequired,
};

export default BlogCategory;
