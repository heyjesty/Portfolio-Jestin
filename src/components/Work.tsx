"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  BEHANCE,
  GITHUB,
  projects,
  type Category,
  type Project,
} from "@/data/projects";
import { Arrow, SectionLabel } from "./Typography";
import styles from "./Work.module.css";

const categoryLabel: Record<Category, string> = {
  behance: "Behance",
  github: "GitHub",
  vercel: "Live site",
  artwork: "Artwork",
};

/** Screenshots placed around the ring; more panels make a wider ring. */
const ring = projects.filter((p) => p.image).slice(0, 12);

export default function Work() {
  const [preview, setPreview] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (preview) dialogRef.current?.showModal();
  }, [preview]);

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
    <section className={styles.work} id="work">
      <div className={styles.top}>
        <SectionLabel index="01">Selected work</SectionLabel>
      </div>

      {/* A slowly spinning ring of screenshots, cutting through the headline.
          The headline sits at the ring's centre, so front panels pass in front of
          it and back panels behind. Hovering or focusing a panel pauses the spin. */}
      <div className={styles.stage}>
        <div className={styles.scene} style={{ "--n": ring.length } as CSSProperties}>
          <h2 className={styles.words}>
            <span className={styles.wordTop}>
              Work<span className="dot">.</span>
            </span>
            <span className={styles.wordBottom}>Selected</span>
          </h2>
          <div className={styles.tilt}>
            <ul className={styles.spinner}>
              {ring.map((project, i) => (
                <li
                  key={project.href}
                  className={styles.panel}
                  style={{ "--i": i } as CSSProperties}
                >
                  <a
                    href={project.href}
                    aria-label={`${project.title}, ${project.actionLabel}`}
                    {...linkProps(project)}
                  >
                    <span className={styles.face}>
                      <Image src={project.image!} alt="" fill sizes="320px" />
                      <span className={styles.chip}>
                        <b>{project.title}</b>
                        <small>{categoryLabel[project.category]}</small>
                        <Arrow />
                      </span>
                    </span>
                    {/* The inside of the ring shows the same shot the right way round. */}
                    <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
                      <Image src={project.image!} alt="" fill sizes="320px" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.foot}>
        <p>
          Concepts, case studies and live builds: {projects.length} projects across
          UI/UX, branding and web development.
        </p>
        <div className={styles.links}>
          <a href={BEHANCE} target="_blank" rel="noopener noreferrer">
            View on Behance <Arrow />
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            View on GitHub <Arrow />
          </a>
        </div>
      </div>

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
