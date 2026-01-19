import BlogPostCard from "./BlogPostCard";

function BlogCategory({ category, isAdmin, csrfToken, posts = [] }) {
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
