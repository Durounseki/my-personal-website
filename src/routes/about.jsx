import { createFileRoute } from "@tanstack/react-router";
import styles from "../styles/About.module.css";
import headShot from "../assets/headshot.jpg";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles["about-title"]}>EL Christian</h1>

      <section className={styles["about-content"]}>
        <img
          src={headShot}
          alt="Christian Esparza"
          className={styles.headshot}
        />

        <div className={styles["about-text"]}>
          <p>
            I&apos;m Christian, but not christian, and I am a Doctor, not the
            kind that helps people though... (
            <cite>&mdash;&nbsp;Randy Pausch&apos;s mom</cite>).
          </p>
          <p>
            Currently a fullstack developer. When I am not coding, you can find
            me at the kitchen experimenting with recipes for my instagram
            <a
              href="https://www.instagram.com/fancy_a_sandwich?igsh=amplamEwMnVnd2lw&utm_source=qr"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.instaLink}
            >
              @fancy_a_sandwich
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
