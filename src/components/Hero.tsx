import Image from "next/image";
import { projects } from "@/data/projects";
import RotatingRole from "./RotatingRole";
import styles from "./Hero.module.css";

const roles = ["UI/UX Designer", "Creative Technologist", "Vibe Coder"];

const toolkit = [
  "Figma",
  "Adobe XD",
  "Photoshop",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
];

const thumbs = projects.filter((p) => p.image).slice(1, 4);

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <h1 className={styles.title}>
        <span className={styles.greeting}>Hi, I&apos;m Jestin</span>
        <RotatingRole roles={roles} />
      </h1>

      <p className={styles.available}>
        <i aria-hidden="true" />
        Available for new opportunities
      </p>
      <p className={styles.blurb}>
        Designing with purpose.
        <br />
        Creating experiences that click.
      </p>

      <div className={styles.portrait}>
        <Image
          src="/assets/jestin-portrait.jpg"
          alt="Portrait of Jestin G Johnson"
          fill
          priority
          sizes="(max-width: 700px) 110vw, 720px"
        />
      </div>

      <FloatingTools />

      <div className={styles.bottomRow}>
        <div className={styles.trust}>
          <div className={styles.avatars}>
            {thumbs.map((p) => (
              <Image key={p.href} src={p.image!} alt="" width={44} height={44} />
            ))}
          </div>
          <p>
            <strong>{projects.length} projects</strong> across UI/UX design, branding and web
            development.
          </p>
        </div>
        <a className={styles.cta} href="#contact">
          <span aria-hidden="true">→</span> Get in Touch
        </a>
      </div>

      <div className={styles.marquee} aria-label="Everyday toolkit">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined}>
              {toolkit.map((tool) => (
                <li key={tool}>
                  <span aria-hidden="true">✦</span>
                  {tool}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Soft, depth-of-field tool icons drifting around the portrait. */
function FloatingTools() {
  return (
    <div className={styles.tools} aria-hidden="true">
      <span className={`${styles.tool} ${styles.figma}`}>
        <span className={styles.figmaMark}>
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </span>
      <span className={`${styles.tool} ${styles.behance}`}>Bē</span>
      <span className={`${styles.tool} ${styles.ps}`}>Ps</span>
      <span className={`${styles.tool} ${styles.code}`}>&lt;/&gt;</span>
    </div>
  );
}
