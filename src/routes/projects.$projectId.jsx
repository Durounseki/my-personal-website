import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import fallbackProjects from "../utils/fallbackProjects";
import SocialLink from "../components/Home/Details/SocialLink";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = fallbackProjects.find((p) => p.id === params.projectId);
    if (!project) throw new Error("Project not found");
    return project;
  },
  component: ProjectDetails,
});

function ProjectDetails() {
  const project = Route.useLoaderData();

  const [activeId, setActiveId] = useState("overview");

  const isScrollingRef = useRef(false);

  useEffect(() => {
    const sectionIds = [
      "overview",
      "tech-stack",
      "technical-brief",
      "challenges",
      "results",
      "links",
    ];

    const observerOptions = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id) => {
    isScrollingRef.current = true;
    setActiveId(id);
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <div className="project-details-layout">
      <aside className="project-sidebar">
        <nav>
          <ul>
            <li>
              <a
                href="#overview"
                className={activeId === "overview" ? "active" : ""}
                onClick={() => handleLinkClick("overview")}
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="#tech-stack"
                className={activeId === "tech-stack" ? "active" : ""}
                onClick={() => handleLinkClick("tech-stack")}
              >
                Tech Stack
              </a>
            </li>
            <li>
              <a
                href="#technical-brief"
                className={activeId === "technical-brief" ? "active" : ""}
                onClick={() => handleLinkClick("technical-brief")}
              >
                Technical Brief
              </a>
            </li>
            <li>
              <a
                href="#challenges"
                className={activeId === "challenges" ? "active" : ""}
                onClick={() => handleLinkClick("challenges")}
              >
                Technical Challenges
              </a>
            </li>
            <li>
              <a
                href="#results"
                className={activeId === "results" ? "active" : ""}
                onClick={() => handleLinkClick("results")}
              >
                Results
              </a>
            </li>
            <li>
              <a
                href="#source"
                className={activeId === "source" ? "active" : ""}
                onClick={() => handleLinkClick("source")}
              >
                Results
              </a>
            </li>
            <li className="back-link">
              <Link to="/">← Back Home</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <article className="project-article">
        <header>
          <h1 id="post-title">{project.name}</h1>
          <p className="project-metadata">
            <span>
              {project.date} — {project.category}
            </span>
            <a href={project.live} target="_blank" className="live-link">
              Live Site
            </a>
          </p>
        </header>

        <section id="overview">
          <p className="lead-text">{project.description}</p>
          <img
            src={project.image}
            alt={project.name}
            className="featured-image"
          />
        </section>

        <section id="tech-stack">
          <h2>Tech Stack</h2>
          <ul className="tech-tags">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>

        <section id="technical-brief">
          <h2>Technical Brief</h2>
          <div className="highlights-container">
            {project.technicalHighlights?.map((item, index) => (
              <div key={index} className="highlight-card">
                <h3>
                  <i className="fa-solid fa-microchip"></i> {item.title}
                </h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="challenges">
          <h2>Technical Challenges</h2>
          <h3>The Problem</h3>
          <p>{project.problem}</p>

          <h3>The Solution</h3>
          <p>{project.solution}</p>
        </section>

        <section id="results">
          <h2>Results</h2>
          <p>{project.results}</p>
          <h3>Future steps</h3>
          <ul>
            {project.futureSteps?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </section>

        <section id="source" className="project-links-section">
          <h2>Source</h2>
          <div className="button-group">
            {project.repository ? (
              <SocialLink
                link={{
                  href: "https://github.com/Durounseki",
                  faClass: "fa-brands fa-github",
                }}
              />
            ) : (
              <p>This repository is private.</p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
}
