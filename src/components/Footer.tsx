import { socials } from "./contactLinks";
import styles from "./Footer.module.css";

// Email, phone and WhatsApp already sit in the contact section just above.
const links = socials.filter((s) =>
  ["LinkedIn", "Behance", "GitHub", "Instagram"].includes(s.label),
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.brand}
        href="#home"
        aria-label="Jestin G Johnson, back to top"
      >
        <span className={styles.mark} aria-hidden="true">
          J<i />
        </span>
        Jestin G Johnson
      </a>

      <nav className={styles.links} aria-label="Elsewhere">
        {links.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener">
            {s.label}
          </a>
        ))}
      </nav>

      <p className={styles.end}>
        <span>© 2026 Jestin G Johnson. All rights reserved.</span>
        <a className={styles.top} href="#home">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </p>
    </footer>
  );
}
