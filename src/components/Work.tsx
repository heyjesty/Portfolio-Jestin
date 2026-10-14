"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { flushSync } from "react-dom";
import {
  BEHANCE,
  GITHUB,
  disciplines,
  projects,
  type Category,
  type Discipline,
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

// Ring panels and slides ask for the same image size, so a panel that flies
// into the slider keeps its already-loaded picture instead of flashing.
const SIZES = "(max-width: 640px) 76vw, 540px";

/** Shared view-transition name linking a project's ring panel and its slide. */
const morphName = (project: Project) => `work-${projects.indexOf(project)}`;

/** Frame name shown on the centre slide's selection, e.g. "supemart.vercel.app". */
const frameName = (project: Project) =>
  project.href.startsWith("http")
    ? new URL(project.href).hostname.replace(/^www\./, "")
    : categoryLabel[project.category];

type Filter = Discipline | "all";

const matches = (filter: Filter) =>
  projects.filter((p) => filter === "all" || p.discipline === filter);

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Signed distance from the active slide, wrapping so the slider loops. */
const offsetOf = (i: number, active: number, count: number) => {
  const o = (((i - active) % count) + count) % count;
  return o > count / 2 ? o - count : o;
};

export default function Work() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [spread, setSpread] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(0);
  // Total steps taken; the centre button turns half a turn per step.
  const [turns, setTurns] = useState(0);
  // True while ring and slider morph into each other: panels and slides carry
  // their shared names only then, and the ring holds still so panels land true.
  const [morphing, setMorphing] = useState(false);
  const busy = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Swipe tracking: where the pointer went down, and whether it dragged.
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);

  const list = matches(filter);
  const count = list.length;
  const current = list[active];
  const isActive = (id: Filter) => spread && filter === id;
  const label = disciplines.find((d) => d.id === filter)?.label;

  /**
   * Morph between layouts: every project shown before and after glides from
   * its old box to its new one (ring panel to slide, slide back into the
   * ring, or between filters) while everything else cross-fades.
   */
  const morph = (update: () => void) => {
    if (busy.current) return;
    if (!document.startViewTransition || prefersReducedMotion())
      return update();
    busy.current = true;
    flushSync(() => setMorphing(true));
    const transition = document.startViewTransition(() => flushSync(update));
    transition.finished.finally(() => {
      busy.current = false;
      setMorphing(false);
    });
  };

  /** Open the slider on `next` (from the ring), or switch its filter. */
  const show = (next: Filter) => {
    if (spread && next === filter) return;
    morph(() => {
      setFilter(next);
      setActive(0);
      setSpread(true);
    });
  };

  /** Step the slider by `dir`, spinning the centre button with it. */
  const step = (dir: 1 | -1) => {
    if (count < 2) return;
    setActive((a) => (a + dir + count) % count);
    setTurns((t) => t + dir);
  };

  const goTo = (i: number) => {
    const o = offsetOf(i, active, count);
    if (!o) return;
    setActive(i);
    setTurns((t) => t + Math.sign(o));
  };

  /** Fly the slides back into the ring. */
  const close = () => {
    if (!spread) return;
    morph(() => {
      setSpread(false);
      setFilter("all");
      setActive(0);
      // Keep the section in view if the slider was taller than the ring.
      const work = document.getElementById("work");
      if (work && work.getBoundingClientRect().top < 0)
        work.scrollIntoView({ block: "start" });
    });
  };

  useEffect(() => {
    if (preview) dialogRef.current?.showModal();
  }, [preview]);

  const linkProps = (project: Project) =>
    project.preview
      ? {
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            setPreview(project);
          },
        }
      : { target: "_blank", rel: "noopener noreferrer" };

  /** Side slides step the slider instead of following their link. */
  const slideLinkProps = (project: Project, i: number, o: number) => {
    const props = linkProps(project);
    if (!o) return props;
    return {
      ...props,
      tabIndex: -1,
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        goTo(i);
      },
    };
  };

  return (
    <section className={styles.work} id="work">
      <div className={styles.top}>
        <SectionLabel index="01">Selected work</SectionLabel>
        <div className={styles.tabs} role="group" aria-label="Filter projects">
          {disciplines.map((d) => (
            <button
              key={d.id}
              type="button"
              className={isActive(d.id) ? styles.tabActive : ""}
              aria-pressed={isActive(d.id)}
              onClick={() => show(d.id)}
            >
              {d.label}
              <sup>{matches(d.id).length}</sup>
            </button>
          ))}
        </div>
      </div>

      {/* Closed: a slowly spinning ring of screenshots cutting through the
          headline. Open: the ring pops apart into a centred slider. */}
      {spread ? (
        <div
          className={`${styles.slider} ${morphing ? styles.sliderMorph : ""}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          {count === 0 ? (
            <p className={styles.empty}>
              <span aria-hidden="true">◎</span>
              <b>{label} is coming soon.</b>
              <small>New work is on its way. Check back shortly.</small>
            </p>
          ) : (
            <>
              <ul
                key={filter}
                className={styles.track}
                onPointerDown={(e) => {
                  dragStart.current = e.clientX;
                  dragged.current = false;
                }}
                onPointerUp={(e) => {
                  if (dragStart.current === null) return;
                  const dx = e.clientX - dragStart.current;
                  dragStart.current = null;
                  if (Math.abs(dx) > 50) {
                    dragged.current = true;
                    step(dx < 0 ? 1 : -1);
                  }
                }}
                onClickCapture={(e) => {
                  if (dragged.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    dragged.current = false;
                  }
                }}
              >
                {list.map((project, i) => {
                  const o = offsetOf(i, active, count);
                  return (
                    <li
                      key={project.href}
                      className={styles.slide}
                      style={
                        {
                          "--o": o,
                          "--a": Math.abs(o),
                          viewTransitionName: morphing
                            ? morphName(project)
                            : undefined,
                        } as CSSProperties
                      }
                      data-active={o === 0}
                      aria-hidden={o !== 0}
                    >
                      <a
                        className={styles.shot}
                        href={project.href}
                        aria-label={`${project.title}, ${project.actionLabel}`}
                        draggable={false}
                        {...slideLinkProps(project, i, o)}
                      >
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt=""
                            fill
                            sizes={SIZES}
                            draggable={false}
                          />
                        ) : (
                          <span className={styles.cover}>
                            {project.cover?.title ?? project.title}
                          </span>
                        )}
                        {project.status && (
                          <span className={styles.status}>
                            {project.status}
                          </span>
                        )}
                      </a>
                      {/* Figma-style selection on the centre slide, like the
                          About portrait: frame name, outline and handles. */}
                      <span className={styles.select} aria-hidden="true">
                        <b>
                          <FrameGlyph />
                          {frameName(project)}
                        </b>
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                    </li>
                  );
                })}
              </ul>

              {current && (
                <div className={styles.details} key={current.href}>
                  <small>{current.eyebrow}</small>
                  <h3>
                    {current.title}
                    <span className="dot">.</span>
                  </h3>
                  <p>{current.description}</p>
                  <div className={styles.actions}>
                    <a
                      className={styles.primary}
                      href={current.href}
                      {...linkProps(current)}
                    >
                      {current.actionLabel}
                      <Arrow />
                    </a>
                    {current.github && current.github !== current.href && (
                      <a
                        className={styles.secondary}
                        href={current.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubMark />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}

              {count > 1 && (
                <div className={styles.controls}>
                  <button
                    type="button"
                    className={styles.arrowBtn}
                    aria-label="Previous project"
                    onClick={() => step(-1)}
                  >
                    <Chevron dir={-1} />
                  </button>
                  {/* Circular "next project" badge: its text drifts slowly, and
                      each step spins the whole badge half a turn. */}
                  <button
                    type="button"
                    className={styles.spin}
                    style={{ "--turns": turns } as CSSProperties}
                    aria-label="Next project"
                    onClick={() => step(1)}
                  >
                    <svg
                      className={styles.spinText}
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                    >
                      <defs>
                        <path
                          id="spin-path"
                          d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0"
                        />
                      </defs>
                      <text>
                        <textPath
                          href="#spin-path"
                          textLength="236"
                          lengthAdjust="spacing"
                        >
                          NEXT PROJECT · NEXT PROJECT ·
                        </textPath>
                      </text>
                    </svg>
                    <span className={styles.spinCore}>
                      <Chevron dir={1} />
                    </span>
                  </button>
                  <button
                    type="button"
                    className={styles.arrowBtn}
                    aria-label="Next project"
                    onClick={() => step(1)}
                  >
                    <Chevron dir={1} />
                  </button>
                </div>
              )}
              <p className={styles.counter} aria-live="polite">
                <b>{String(active + 1).padStart(2, "0")}</b> /{" "}
                {String(count).padStart(2, "0")}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className={`${styles.stage} ${morphing ? styles.stageHold : ""}`}>
          <div
            className={styles.scene}
            style={{ "--n": ring.length } as CSSProperties}
          >
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
                    style={
                      {
                        "--i": i,
                        viewTransitionName: morphing
                          ? morphName(project)
                          : undefined,
                      } as CSSProperties
                    }
                  >
                    <a
                      href={project.href}
                      aria-label={`${project.title}, ${project.actionLabel}`}
                      {...linkProps(project)}
                    >
                      <span className={styles.face}>
                        <Image src={project.image!} alt="" fill sizes={SIZES} />
                        <span className={styles.chip}>
                          <b>{project.title}</b>
                          <small>{categoryLabel[project.category]}</small>
                          <Arrow />
                        </span>
                      </span>
                      {/* The inside of the ring shows the same shot the right way round. */}
                      <span
                        className={`${styles.face} ${styles.back}`}
                        aria-hidden="true"
                      >
                        <Image src={project.image!} alt="" fill sizes={SIZES} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className={styles.expand}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={spread}
          onClick={spread ? close : () => show("all")}
        >
          {spread ? "Show less" : "View all projects"}
          <span
            className={`${styles.icon} ${spread ? styles.iconOpen : ""}`}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {spread && current
          ? `${count} projects. Showing ${current.title}.`
          : ""}
      </p>

      <div className={styles.foot}>
        <p>
          Live builds and source code: {projects.length} projects across
          frontend and backend development, most deployed on Vercel.
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

/** Figma's frame glyph, as used in the section labels. */
function FrameGlyph() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5.5v11M8.5.5v11M.5 3.5h11M.5 8.5h11"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

/** Thin arrow for the slider's buttons; `dir` -1 points it left. */
function Chevron({ dir }: { dir: 1 | -1 }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={dir < 0 ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** GitHub's Octocat mark, drawn inline so it inherits the text colour. */
function GitHubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}
