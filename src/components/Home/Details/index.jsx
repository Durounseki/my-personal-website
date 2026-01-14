import { useState, useRef, useEffect } from "react";
import SocialLink from "./SocialLink";

function Details({ details }) {
  const [showResume, setShowResume] = useState(false);
  const apiRootUrl = import.meta.env.VITE_API_ROOT_URL;
  const resumeContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resumeContainerRef.current &&
        !resumeContainerRef.current.contains(event.target)
      ) {
        setShowResume(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = (url) => {
    window.open(`${apiRootUrl}${url}`, "_blank");
    setShowResume(false);
  };

  return (
    <section className="details">
      <h1 className="name">{details.name}</h1>
      <p className="role">{details.role}</p>
      <p className="contact">{details.contact}</p>
      <p className="location">
        <i className="fa-solid fa-location-dot"></i> {details.location}
      </p>

      <div className="social-links">
        {details.socialLinks.map((link, index) => (
          <SocialLink key={index} link={link} />
        ))}

        <div className="resume-container" ref={resumeContainerRef}>
          <a className="resume" onClick={() => setShowResume(!showResume)}>
            <i className="fa-solid fa-file-lines"></i>
          </a>

          <div className={`resume-list ${showResume ? "show" : ""}`}>
            <ul>
              <li>
                <a onClick={() => handleDownload("/api/resume")}>Resume</a>
              </li>
              <li>
                <a onClick={() => handleDownload("/api/rirekisho")}>履歴書</a>
              </li>
              <li>
                <a onClick={() => handleDownload("/api/keirekisho")}>経歴書</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
