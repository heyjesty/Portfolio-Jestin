"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  BEHANCE,
  GITHUB,
  filters,
  projects,
  type Category,
  type Project,
} from "@/data/projects";
import { Arrow, Lines, SectionLabel } from "./Typography";
import styles from "./Work.module.css";

const FEATURED = 3;
const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const categoryLabel: Record<Category, string> = {
  behance: "Behance",
  github: "GitHub",
  vercel: "Live site",
  artwork: "Artwork",
};

const countFor = (id: Category | "all") =>
  id === "all"
    ? projects.length
    : projects.filter((p) => p.category === id).length;

// Small previews of the hidden projects, shown on the "View all" control.
const peeks = projects
  .slice(FEATURED)
  .filter((p) => p.image)
  .slice(0, 3);

export default function Work() {
  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState<Category | "all">("all");
  const [preview, setPreview] = useState<Project | null>(null);

  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const shownBefore = useRef(new Set(projects.slice(0, FEATURED)));
  const dialogRef = useRef<HTMLDialogElement>(null);

  const matching = projects.filter(
    (p) => category === "all" || p.category === category,
  );
  const visible = expanded ? matching : projects.slice(0, FEATURED);

  // Stagger in cards that have just been revealed by expanding or filtering.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let order = 0;
    projects.forEach((project, i) => {
      const card = cardRefs.current[i];
      if (
        !visible.includes(project) ||
        shownBefore.current.has(project) ||
        !card
      )
        return;
      if (!reduced && typeof card.animate === "function") {
        card.animate(
          [
            { opacity: 0, transform: "translateY(32px)", filter: "blur(6px)" },
            { opacity: 1, transform: "none", filter: "blur(0)" },
          ],
          {
            duration: 750,
            delay: Math.min(order * 70, 420),
            easing: "cubic-bezier(.2,.8,.2,1)",
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
      document.getElementById("work")?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const linkProps = (project: Project) =>
    project.preview
      ? {
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setPreview(project);
          },
        }
      : { target: "_blank", rel: "noopener noreferrer" };

  return (
    <section className={`section ${styles.work}`} id="work">
      <div className={styles.head}>
        <div>
          <SectionLabel index="01">Selected work</SectionLabel>
          <h2 className="title reveal reveal-text">
            <Lines lines={["Designed. Built.", "Out in the world"]} />
          </h2>
        </div>
        <div
          className={`${styles.headAside} reveal`}
          style={{ "--d": "200ms" } as CSSProperties}
        >
          <p className="lead">
            Design stories on Behance, code on GitHub, and live websites you can
            explore.
          </p>
          <div className={styles.profiles}>
            <a
              className="ulink"
              href={BEHANCE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance profile{" "}
              <span>
                <Arrow />
              </span>
            </a>
            <a
              className="ulink"
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile{" "}
              <span>
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={`${styles.filters} ${expanded ? styles.filtersOpen : ""}`}
        inert={!expanded}
      >
        <div className={styles.filtersInner}>
          <div
            className={styles.segment}
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={category === f.id ? styles.active : ""}
                aria-pressed={category === f.id}
                onClick={() => setCategory(f.id)}
              >
                {f.label}
                <sup>{countFor(f.id)}</sup>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.grid} id="project-grid">
        {projects.map((project, i) => (
          <article
            key={project.href}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            // Featured cards reveal on scroll; the rest animate in when expanded.
            className={`${styles.card} reveal ${i < FEATURED ? "" : "visible"}`}
            style={
              { "--d": `${i < FEATURED ? i * 120 : 0}ms` } as CSSProperties
            }
            hidden={!visible.includes(project)}
          >
            <a
              className={styles.frame}
              href={project.href}
              {...linkProps(project)}
            >
              <span className={styles.media}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.alt ?? project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  project.cover && (
                    <span className={styles.repoCover}>
                      <span aria-hidden="true">〈/〉</span>
                      <strong>{project.cover.title}</strong>
                      <small>{project.cover.subtitle}</small>
                    </span>
                  )
                )}
              </span>
              {project.status && (
                <span className={styles.status}>
                  <i aria-hidden="true" />
                  {project.status}
                </span>
              )}
              <span className={styles.selection} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <b>{categoryLabel[project.category]}</b>
              </span>
              <span className={styles.open} aria-hidden="true">
                <Arrow />
              </span>
            </a>
            <div className={styles.meta}>
              <div className={styles.metaTop}>
                <span>{project.eyebrow}</span>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a className="ulink" href={project.href} {...linkProps(project)}>
                {project.actionLabel}{" "}
                <span>
                  <Arrow />
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className={`${styles.expand} reveal`}>
        <button
          type="button"
          className={`${styles.toggle} ${expanded ? styles.toggleOpen : ""}`}
          aria-expanded={expanded}
          aria-controls="project-grid"
          onClick={toggleExpanded}
        >
          <span className={styles.peeks} aria-hidden="true">
            {peeks.map((p) => (
              <Image
                key={p.href}
                src={p.image!}
                alt=""
                width={30}
                height={30}
              />
            ))}
          </span>
          <span>{expanded ? "Show less" : "View all projects"}</span>
          <span className={styles.icon} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <p className={styles.count}>
          {expanded
            ? `${matching.length} projects${category === "all" ? "" : ` · ${filters.find((f) => f.id === category)?.label}`}`
            : `${FEATURED} selected · ${projects.length} in total`}
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        onClose={() => setPreview(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <button
          type="button"
          aria-label="Close artwork"
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
        {preview?.image && (
          <Image
            src={preview.image}
            alt={`${preview.title} artwork`}
            width={1066}
            height={1600}
            sizes="(max-width: 720px) 90vw, 720px"
          />
        )}
      </dialog>
    </section>
  );
}
