import Image from "next/image";
import { RESUME } from "@/data/projects";

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="about-grid reveal">
        <div>
          <p className="eyebrow">The person behind the pixels</p>
          <h2>
            Thoughtful design.
            <br />A curious mind.
          </h2>
          <p>
            I&apos;m Jestin, a UI/UX designer with a background in digital product design and
            frontend development. I create clean, responsive web and mobile interfaces that bring
            usability and visual clarity together.
          </p>
          <p>
            From the first wireframe to the final interaction, I enjoy turning complex ideas into
            simple, accessible experiences.
          </p>
          <a className="text-link" href={RESUME} target="_blank" rel="noopener">
            View my resume <span>↗</span>
          </a>
        </div>
        <figure className="about-photo">
          <Image
            src="/assets/jestin-casual.jpeg"
            alt="Jestin G Johnson"
            width={1151}
            height={2048}
            sizes="(max-width: 600px) 75vw, 35vw"
          />
          <figcaption>A little about the designer.</figcaption>
        </figure>
      </div>
      <div className="skills reveal">
        <p className="eyebrow">My everyday toolkit</p>
        <div>
          Figma <span>✳</span> Adobe XD <span>✳</span> Photoshop <span>✳</span> Canva
        </div>
        <p>
          Wireframing · Prototyping · User research · User flows · Design systems · Usability
          testing · Interaction design
        </p>
        <p>HTML · CSS · JavaScript · React · Tailwind CSS</p>
      </div>
    </section>
  );
}
