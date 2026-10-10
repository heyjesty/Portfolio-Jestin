import { RESUME } from "@/data/projects";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <span>© 2026 · Design. Build. Repeat.</span>
        <nav className={styles.links} aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={RESUME} target="_blank" rel="noopener">
            Resume
          </a>
        </nav>
        <a href="#home">Back to top ↑</a>
      </div>
      <a
        className={styles.wordmark}
        href="#home"
        aria-label="Jestin G Johnson, back to top"
      >
        Jestin Johnson<span>.</span>
      </a>
    </footer>
  );
}
