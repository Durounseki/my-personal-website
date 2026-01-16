import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

function Resume({ url }) {
  const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;
  const handleClick = (url) => {
    try {
      window.open(`${apiRootUrl}${url}`, "_blank");
    } catch (error) {
      throw new Error(`Error fetching resume: ${error.message}`);
    }
  };
  useEffect(() => {
    const resumeLink = document.querySelector(".resume");
    resumeLink.click();
  }, []);

  return (
    <div className="resume-page-content">
      <a className="resume" href="#" onClick={() => handleClick(url)}>
        <i className="fa-solid fa-file-lines"></i>
        <p>DOWNLOAD</p>
      </a>
      <Link className="back-button" to="/">
        Back Home
      </Link>
    </div>
  );
}

export default Resume;
