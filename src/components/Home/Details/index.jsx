import { useState, useRef, useEffect } from "react";
import SocialLink from "./SocialLink";
import styles from "./styles.module.css";

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
    <section className={styles.details}>
      <h1 className={styles.name}>{details.name}</h1>
      <p className={styles.role}>{details.role}</p>
      <p className={styles.contact}>{details.contact}</p>
      <p className={styles.location}>
        <i className="fa-solid fa-location-dot"></i> {details.location}
      </p>

      <div className={styles["social-links"]}>
        {details.socialLinks.map((link, index) => (
          <SocialLink key={index} link={link} />
        ))}

        <div className={styles["resume-container"]} ref={resumeContainerRef}>
          <button
            className={styles.resumeBtn}
            onClick={() => setShowResume(!showResume)}
            aria-label="Toggle Resume Links"
          >
            <i className="fa-solid fa-file-lines"></i>
          </button>

          {showResume && (
            <div className={`${styles["resume-list"]} ${styles.show}`}>
              <ul>
                <li onClick={() => handleDownload("/api/resume")}>Resume</li>
                <li onClick={() => handleDownload("/api/rirekisho")}>履歴書</li>
                <li onClick={() => handleDownload("/api/keirekisho")}>
                  経歴書
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Details;
