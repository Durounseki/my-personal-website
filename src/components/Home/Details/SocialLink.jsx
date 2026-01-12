import styles from "./SocialLink.module.css";

function SocialLink({ link }) {
  return (
    <a
      className={styles["social-link"]}
      href={link.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Link to ${link.href}`}
    >
      <i className={link.faClass}></i>
    </a>
  );
}

export default SocialLink;
