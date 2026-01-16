import { Link } from "@tanstack/react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-44 -40 88 82"
              fill="none"
              style={{ background: "var(--main-background)" }}
            >
              <g>
                <line
                  x1="-36"
                  y1="-16"
                  x2="4"
                  y2="-16"
                  strokeWidth="8"
                  style={{ stroke: "var(--secondary-text" }}
                ></line>
                <line
                  x1="-16"
                  y1="-12"
                  x2="-16"
                  y2="12"
                  strokeWidth="8"
                  style={{ stroke: "var(--secondary-text" }}
                ></line>
                <line
                  x1="-44"
                  y1="16"
                  x2="12"
                  y2="16"
                  strokeWidth="8"
                  style={{ stroke: "var(--secondary-text" }}
                ></line>
                <path
                  d="M 24 -20 V 16 H 44"
                  strokeWidth="8"
                  style={{ stroke: "var(--secondary-text" }}
                ></path>
                <path
                  d="M 8 -12 V 0 H -4"
                  strokeWidth="8"
                  style={{ stroke: "var(--active-text)" }}
                ></path>
              </g>
            </svg>
            <span className="brand-name">Christian Esparza Lopez</span>
          </div>
          <p className="footer-bio">
            Applied Mathematician & Developer. <br />
            Exploring complex systems through code.
          </p>
        </div>

        <div className="footer-navigation">
          <div className="footer-links">
            <h4>Explore</h4>
            <nav className="explore-links">
              <Link to="/research">Research</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/resume">Resume</Link>
            </nav>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a
                href="https://github.com/Durounseki"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/christian-esparza-115128200/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="mailto:christian@esparzalopez.com">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="tech-tag">Built with Hono & Cloudflare</p>

      <div className="copyright">
        <p>© {currentYear} エルウェブ. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
