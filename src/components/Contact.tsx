import Image from "next/image";
import type { CSSProperties } from "react";
import { BEHANCE, GITHUB } from "@/data/projects";
import { Arrow, Lines, SectionLabel } from "./Typography";
import styles from "./Contact.module.css";

const EMAIL = "jestinjohnson1@gmail.com";

const socials = [
  { label: "GitHub", href: GITHUB },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/heyjesty/" },
  { label: "Behance", href: BEHANCE },
  { label: "Instagram", href: "https://www.instagram.com/moodygrammer/" },
  { label: "WhatsApp", href: "https://wa.me/918590569016" },
];

export default function Contact() {
  return (
    <section
      className={`section ${styles.contact}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <SectionLabel index="06">Let&apos;s connect</SectionLabel>
      <h2
        id="contact-title"
        className={`title reveal reveal-text ${styles.title}`}
      >
        <Lines lines={["Good things start", "with a conversation"]} />
      </h2>

      {/* A Figma-style comment: avatar pin plus message bubble. */}
      <div
        className={`${styles.comment} reveal`}
        style={{ "--d": "250ms" } as CSSProperties}
      >
        <span className={styles.pin}>
          <Image
            src="/assets/jestin-headshot.png"
            alt=""
            width={44}
            height={44}
          />
        </span>
        <div className={styles.bubble}>
          <p className={styles.author}>
            Jestin <span>just now</span>
          </p>
          <p>Made it this far? We should probably talk.</p>
        </div>
      </div>

      <div
        className={`${styles.actions} reveal`}
        style={{ "--d": "400ms" } as CSSProperties}
      >
        <a className={styles.hello} href={`mailto:${EMAIL}`}>
          <span aria-hidden="true">→</span> Say hello
        </a>
        <a className={`ulink ${styles.email}`} href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </div>

      <div className={styles.bottom}>
        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener">
                {s.label}{" "}
                <span>
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a className={styles.phone} href="tel:+918590569016">
          +91 8590569016
        </a>
      </div>
    </section>
  );
}
