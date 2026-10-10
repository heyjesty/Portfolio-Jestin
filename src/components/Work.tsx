"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
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

// Ring panels and grid tiles ask for the same image size, so a panel that
// flies into the grid keeps its already-loaded picture instead of flashing.
const SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const EASE = "cubic-bezier(.22,1,.36,1)";

type Filter = Discipline | "all";

const matches = (filter: Filter) =>
  projects.filter((p) => filter === "all" || p.discipline === filter);

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Work() {
  const [preview, setPreview] = useState<Project | null>(null);
  const [spread, setSpread] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  // Bumped on every spread or filter change so the layout effect animates it.
  const [moves, setMoves] = useState(0);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRefs = useRef(new Map<string, HTMLElement>());
  const tileRefs = useRef(new Map<string, HTMLElement>());
  // Where each visible panel or tile sat on screen just before the change.
  const fromRects = useRef(new Map<string, DOMRect>());
  // Whether the change being animated started from the ring (vs. a filter switch).
  const fromRing = useRef(false);

  const visible = matches(filter);
  const isActive = (id: Filter) => spread && filter === id;
  const label = disciplines.find((d) => d.id === filter)?.label;

  /** Record where everything is, then switch to the grid showing `next`. */
  const show = (next: Filter) => {
    if (closing || (spread && next === filter)) return;
    fromRing.current = !spread;
    const from = spread ? tileRefs.current : panelRefs.current;
    fromRects.current = new Map(
      [...from].map(([href, el]) => [href, el.getBoundingClientRect()]),
    );
    setFilter(next);
    setSpread(true);
    setMoves((m) => m + 1);
  };

  /** Fade the grid away, then bring the ring back. */
  const close = (scroll: boolean) => {
    if (closing || !spread) return;
    const finish = () => {
      setClosing(false);
      setSpread(false);
      setFilter("all");
      if (scroll)
        document.getElementById("work")?.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
    };
    if (prefersReducedMotion()) return finish();
    setClosing(true);
    setTimeout(finish, 380);
  };

  // FLIP: every tile that was already on screen (as a ring panel or a tile)
  // glides from its old box to its new one, scaling evenly from its centre;
  // tiles that weren't on screen rise in after them.
  useLayoutEffect(() => {
    if (!moves || prefersReducedMotion()) return;
    const ringStart = fromRing.current;
    let order = 0;
    let entering = 0;
    matches(filter).forEach((project) => {
      const tile = tileRefs.current.get(project.href);
      if (!tile || typeof tile.animate !== "function") return;
      const from = fromRects.current.get(project.href);
      const delay = order++ * (ringStart ? 35 : 15);
      if (from) {
        const to = tile.getBoundingClientRect();
        const dx = from.left + from.width / 2 - (to.left + to.width / 2);
        const dy = from.top + from.height / 2 - (to.top + to.height / 2);
        const scale = from.width / to.width;
        tile.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
            { transform: "none" },
          ],
          {
            duration: ringStart ? 1200 : 800,
            delay,
            easing: EASE,
            fill: "backwards",
          },
        );
      } else {
        tile.animate(
          [
            { opacity: 0, transform: "translateY(28px) scale(0.97)" },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 800,
            delay: (ringStart ? 600 : 120) + entering++ * 50,
            easing: EASE,
            fill: "backwards",
          },
        );
      }
    });
  }, [moves, filter]);

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

      {/* A slowly spinning ring of screenshots, cutting through the headline.
          The headline sits at the ring's centre, so front panels pass in front of
          it and back panels behind. Hovering or focusing a panel pauses the spin. */}
      {spread ? (
        <ul className={`${styles.grid} ${closing ? styles.gridClosing : ""}`}>
          {visible.length === 0 && (
            <li className={styles.empty}>
              <span aria-hidden="true">◎</span>
              <b>{label} is coming soon.</b>
              <small>New work is on its way. Check back shortly.</small>
            </li>
          )}
          {visible.map((project) => (
            <li
              key={project.href}
              ref={(el) => {
                if (el) tileRefs.current.set(project.href, el);
                else tileRefs.current.delete(project.href);
              }}
            >
              <a
                className={styles.tile}
                href={project.href}
                aria-label={`${project.title}, ${project.actionLabel}`}
                {...linkProps(project)}
              >
                {project.image ? (
                  <Image src={project.image} alt="" fill sizes={SIZES} />
                ) : (
                  <span className={styles.cover}>
                    {project.cover?.title ?? project.title}
                  </span>
                )}
                <span className={styles.chip}>
                  <b>{project.title}</b>
                  <small>{categoryLabel[project.category]}</small>
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.stage}>
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
                    ref={(el) => {
                      if (el) panelRefs.current.set(project.href, el);
                      else panelRefs.current.delete(project.href);
                    }}
                    className={styles.panel}
                    style={{ "--i": i } as CSSProperties}
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
          onClick={spread ? () => close(true) : () => show("all")}
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
        {spread ? `${visible.length} projects shown` : ""}
      </p>

      <div className={styles.foot}>
        <p>
          Concepts, case studies and live builds: {projects.length} projects
          across UI/UX, branding and web development.
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
