function BlogPostSkeleton() {
  return (
    <section className="blog-post skeleton-post">
      <header>
        <div className="skeleton skeleton-date"></div>
      </header>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
      <footer className="post-keywords">
        <ul>
          <li className="skeleton skeleton-tag"></li>
          <li className="skeleton skeleton-tag"></li>
          <li className="skeleton skeleton-tag"></li>
        </ul>
      </footer>
    </section>
  );
}

export default BlogPostSkeleton;
