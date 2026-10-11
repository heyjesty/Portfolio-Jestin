import { CONTACT, socials } from "./contactLinks";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.brand}>
        <a href="#home" aria-label="Jestin G Johnson, back to top">
          <span className={styles.mark} aria-hidden="true">
            J<i />
          </span>
          Jestin G Johnson
        </a>
        <span className={styles.roles}>
          UI/UX Designer · Creative Technologist
        </span>
      </p>

      <nav className={styles.links} aria-label="Elsewhere">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener">
            {s.label}
          </a>
        ))}
        <a href={`mailto:${CONTACT.email}`}>Email</a>
      </nav>

      <p className={styles.end}>
        <span>© 2026 Jestin G Johnson</span>
        <a className={styles.top} href="#home">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </p>
    </footer>
  );
}
