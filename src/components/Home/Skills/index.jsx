import styles from "./styles.module.css";

function Skills() {
  const techStack = [
    { name: "HTML", faClass: "fa-brands fa-html5" },
    { name: "CSS", faClass: "fa-brands fa-css3-alt" },
    { name: "JavaScript", faClass: "fa-brands fa-js" },
    { name: "React", faClass: "fa-brands fa-react" },
    { name: "Node", faClass: "fa-brands fa-node" },
  ];

  return (
    <section className={styles.skills}>
      <h2 className={styles.title}>TECHSTACK</h2>
      <article>
        <ul className={styles.skillList}>
          {techStack.map((icon, index) => (
            <li key={index} className={styles.skillItem}>
              <i className={icon.faClass}></i>
              <p>{icon.name}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default Skills;
