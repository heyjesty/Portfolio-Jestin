"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BEHANCE, GITHUB, filters, projects, type Category, type Project } from "@/data/projects";

const FEATURED = 3;
const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Work() {
  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState<Category | "all">("all");
  const [preview, setPreview] = useState<Project | null>(null);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const shownBefore = useRef(new Set(projects.slice(0, FEATURED)));
  const dialogRef = useRef<HTMLDialogElement>(null);

  const matching = projects.filter((p) => category === "all" || p.category === category);
  const visible = expanded ? matching : projects.slice(0, FEATURED);

  // Stagger in cards that have just been revealed by expanding or filtering.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let order = 0;
    projects.forEach((project, i) => {
      const card = cardRefs.current[i];
      if (!visible.includes(project) || shownBefore.current.has(project) || !card) return;
      if (!reduced && typeof card.animate === "function") {
        card.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 420,
            delay: Math.min(order * 45, 270),
            easing: "cubic-bezier(.2,.7,.2,1)",
            fill: "backwards",
          },
        );
        order++;
      }
    });
    shownBefore.current = new Set(visible);
  }, [visible]);

  useEffect(() => {
    if (preview) dialogRef.current?.showModal();
  }, [preview]);

  const toggleExpanded = () => {
    const next = !expanded;
    setExpanded(next);
    if (!next) {
      setCategory("all");
      document
        .getElementById("work")
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  };

  const openPreview = (project: Project) => (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview(project);
  };

  const linkProps = (project: Project) =>
    project.preview
      ? { onClick: openPreview(project) }
      : { target: "_blank", rel: "noopener noreferrer" };

  return (
    <section className="selected section" id="work">
      <div className="section-heading reveal">
        <p className="eyebrow">Selected work</p>
        <h2>
          Designed. Built.
          <br />
          Out in the world.
        </h2>
        <p>
          Design stories on Behance, code on GitHub,
          <br />
          and live websites you can explore.
        </p>
        <div className="profile-links">
          <a href={BEHANCE} target="_blank" rel="noopener noreferrer">
            Behance profile ↗
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub profile ↗
          </a>
        </div>
      </div>

      <div className="filters" aria-label="Filter projects" hidden={!expanded}>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className={category === f.id ? "active" : ""}
            aria-pressed={category === f.id}
            onClick={() => setCategory(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="project-grid" id="project-grid">
        {projects.map((project, i) => (
          <article
            key={project.href}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="project reveal visible"
            data-category={project.category}
            hidden={!visible.includes(project)}
          >
            <a
              className={`project-art art-${project.art} ${project.coverClass ?? ""}`.trim()}
              href={project.href}
              {...linkProps(project)}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.alt ?? project.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              ) : (
                project.cover && (
                  <div className="repo-cover">
                    <span>〈/〉</span>
                    <strong>{project.cover.title}</strong>
                    <small>{project.cover.subtitle}</small>
                  </div>
                )
              )}
            </a>
            <div className="project-copy">
              <span className="eyebrow">{project.eyebrow}</span>
              {project.status && (
                <div className="project-status">
                  <span />
                  {project.status}
                </div>
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-actions">
                <a className="text-link" href={project.href} {...linkProps(project)}>
                  {project.actionLabel} <span>↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="work-expand">
        <button
          id="view-all-projects"
          type="button"
          aria-expanded={expanded}
          aria-controls="project-grid"
          onClick={toggleExpanded}
        >
          <span>{expanded ? "Show less" : "View all projects"}</span>
          <i aria-hidden="true">{expanded ? "−" : "+"}</i>
        </button>
        <p id="project-count">
          {expanded
            ? `${matching.length} projects${category === "all" ? "" : " in this collection"}`
            : `${FEATURED} selected projects · ${projects.length} in total`}
        </p>
      </div>
      <p id="filter-status" className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>

      <dialog
        id="art-dialog"
        ref={dialogRef}
        onClose={() => setPreview(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <button type="button" aria-label="Close artwork" onClick={() => dialogRef.current?.close()}>
          ×
        </button>
        {preview?.image && (
          <Image
            src={preview.image}
            alt={`${preview.title} artwork`}
            width={1066}
            height={1600}
            sizes="80vw"
          />
        )}
      </dialog>
    </section>
  );
}
