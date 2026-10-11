import type { CSSProperties } from "react";
import { Arrow, SectionLabel } from "./Typography";
import { CONTACT, socials } from "./contactLinks";
import styles from "./Contact.module.css";

// The three networks shown as pills next to the main button.
const pills = socials.filter((s) =>
  ["LinkedIn", "Behance", "Instagram"].includes(s.label),
);

export default function Contact() {
  return (
    <section
      className={`section ${styles.contact}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <SectionLabel index="06">Let&apos;s connect</SectionLabel>
      <h2 id="contact-title" className={`${styles.title} reveal`}>
        <span>Have an idea?</span>
        <span className={styles.soft}>
          Let&apos;s make it happen<span className="dot">.</span>
        </span>
      </h2>

      <div
        className={`${styles.actions} reveal`}
        style={{ "--d": "150ms" } as CSSProperties}
      >
        <a className={styles.primary} href={`mailto:${CONTACT.email}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 6.5 8.5 6 8.5-6" />
          </svg>
          Start a conversation
          <Arrow />
        </a>
        {pills.map((s) => (
          <a
            key={s.label}
            className={styles.pill}
            href={s.href}
            target="_blank"
            rel="noopener"
          >
            <span aria-hidden="true">{s.mark}</span>
            {s.label}
          </a>
        ))}
      </div>

      <div
        className={`${styles.info} reveal`}
        style={{ "--d": "250ms" } as CSSProperties}
      >
        <p className={styles.available}>
          <i aria-hidden="true" />
          Available for freelance &amp; full-time opportunities
        </p>
        <p className={styles.reach}>
          <span>
            Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </span>
          <span>
            Phone: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </span>
        </p>
      </div>
    </section>
  );
}
