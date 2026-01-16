function Skills() {
  const frontendStack = [
    { name: "HTML", faClass: "fa-brands fa-html5" },
    { name: "CSS", faClass: "fa-brands fa-css3-alt" },
    { name: "JavaScript", faClass: "fa-brands fa-js" },
    { name: "React", faClass: "fa-brands fa-react" },
  ];
  const backendStack = [
    { name: "Node", faClass: "fa-brands fa-node" },
    { name: "Cloudflare", faClass: "fa-brands fa-cloudflare" },
    {
      name: "Hono",
      svg: "https://cdn.simpleicons.org/hono/e5fcff",
    },
    {
      name: "Prisma",
      svg: "https://cdn.simpleicons.org/prisma/e5fcff",
    },
  ];

  return (
    <section className="skills">
      <h2>TECHSTACK</h2>
      <article>
        <h3>FRONTEND</h3>
        <ul>
          {frontendStack.map((icon, index) => (
            <li key={index} className="skill">
              <i className={icon.faClass}></i>
              <p>{icon.name}</p>
            </li>
          ))}
        </ul>
        <h3>BACKEND</h3>
        <ul>
          {backendStack.map((icon, index) => (
            <li key={index} className="skill">
              {icon.faClass ? (
                <>
                  <i className={icon.faClass}></i>
                  <p>{icon.name}</p>
                </>
              ) : (
                <>
                  <img src={icon.svg} alt={icon.name} />
                  <p>{icon.name}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default Skills;
