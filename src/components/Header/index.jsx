import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../data/auth";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = useMemo(
    () => [
      { name: "Research", url: "/research", faClass: "fa-solid fa-book" },
      { name: "Blog", url: "/blog", faClass: "fa-solid fa-blog" },
      { name: "About", url: "/about", faClass: "fa-solid fa-circle-info" },
      {
        name: isAuthenticated ? "Profile" : "Login",
        url: isAuthenticated ? "/users" : "/users/login",
        faClass: isAuthenticated
          ? "fa-solid fa-user"
          : "fa-solid fa-right-to-bracket",
      },
    ],
    [isAuthenticated]
  );

  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [bubbleStyle, setBubbleStyle] = useState({
    transform: "translateX(0px)",
    width: "0px",
  });

  const bubbleRef = useRef(null);
  const tabsRef = useRef([]);
  const accountRef = useRef(null);

  const handleClick = (index, url) => {
    if (url === "/users" && isAuthenticated) {
      accountRef.current.classList.toggle("show");
    } else {
      setActiveTab(index);
      if (accountRef.current?.classList.contains("show")) {
        accountRef.current.classList.remove("show");
      }
      if (url) navigate({ to: url });
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        accountRef.current.classList.remove("show");
      }
    };

    if (isAuthenticated) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    accountRef.current.classList.remove("show");
  };

  useEffect(() => {
    const pathSegment = location.pathname.split("/")[1];
    if (!pathSegment) {
      setActiveTab(0);
      return;
    }

    const currentPath = `/${pathSegment}`;

    const activeIndex = navLinks.findIndex((link) =>
      link.url.startsWith(currentPath)
    );
    if (activeIndex !== -1) {
      setActiveTab(activeIndex + 1);
    }
  }, [location.pathname, navLinks]);

  useEffect(() => {
    const bubble = bubbleRef.current;
    const tabs = tabsRef.current;

    if (bubble && tabs.length > activeTab && tabs[activeTab]) {
      const activeTabRect = tabs[activeTab].getBoundingClientRect();
      const offset = tabs[0].getBoundingClientRect().left;

      setBubbleStyle({
        transform: `translateX(${activeTabRect.left - offset}px)`,
        width: `${activeTabRect.width}px`,
        height: `${activeTabRect.height}px`,
      });
    }
  }, [activeTab]);

  return (
    <header className="menu">
      <nav>
        <ul>
          <li
            className={`home-tab menu-tab ${activeTab === 0 ? "active" : ""}`}
            ref={(el) => (tabsRef.current[0] = el)}
            onClick={() => handleClick(0, "/")}
            style={{ display: "flex" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-44 -40 88 82"
              fill="none"
              style={{ background: "transparent", height: "24px" }}
            >
              <g>
                <line x1="-36" y1="-16" x2="4" y2="-16" strokeWidth="8"></line>
                <line x1="-16" y1="-12" x2="-16" y2="12" strokeWidth="8"></line>
                <line x1="-44" y1="16" x2="12" y2="16" strokeWidth="8"></line>
                <path d="M 24 -20 V 16 H 44" strokeWidth="8"></path>
                <path
                  d="M 8 -12 V 0 H -4"
                  strokeWidth="8"
                  style={{ stroke: "var(--active-text)" }}
                ></path>
              </g>
            </svg>
          </li>
          {navLinks.map((link, index) => (
            <li
              key={index}
              className={`menu-tab ${index === activeTab ? "active" : ""}`}
              ref={(el) => (tabsRef.current[index + 1] = el)}
              onClick={() => handleClick(index, link.url)}
            >
              {isAuthenticated && link.url === "/users" ? (
                isMobile && link.faClass ? (
                  <i className={link.faClass}></i>
                ) : (
                  <span>{link.name}</span>
                )
              ) : isMobile && link.faClass ? (
                <Link to={link.url}>
                  <i className={link.faClass}></i>
                </Link>
              ) : (
                <Link to={link.url}>{link.name}</Link>
              )}
            </li>
          ))}
          <li className="tab-bubble" ref={bubbleRef} style={bubbleStyle}></li>
          <div className="account" ref={accountRef}>
            <ul>
              <li
                onClick={() => {
                  handleClick(navLinks.length - 1);
                  navigate({ to: "/users/profile" });
                }}
              >
                Settings
              </li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
