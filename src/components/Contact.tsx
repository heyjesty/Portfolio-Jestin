import Image from "next/image";
import { BEHANCE, GITHUB } from "@/data/projects";

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
    <section className="contact section" id="contact">
      <div>
        <p className="eyebrow">Let&apos;s connect</p>
        <h2>
          Good things
          <br />
          start with a
          <br />
          conversation.
        </h2>
        <a className="hello" href={`mailto:${EMAIL}`}>
          Say hello <span>↗</span>
        </a>
        <a className="email" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <div className="socials">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener">
              {s.label} ↗
            </a>
          ))}
        </div>
        <p className="muted">
          <a href="tel:+918590569016">+91 8590569016</a>
        </p>
      </div>
      <div className="contact-aside">
        <Image
          src="/assets/jestin-headshot.png"
          alt="Jestin Johnson"
          width={1086}
          height={1448}
          sizes="(max-width: 600px) 65vw, 35vw"
        />
        <p>
          Made it this far?
          <br />
          We should probably talk.
        </p>
      </div>
    </section>
  );
}
