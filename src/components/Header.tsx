import { RESUME } from "@/data/projects";

export default function Header() {
  return (
    <header>
      <a className="brand" href="#home" aria-label="Jestin G Johnson, home">
        J<span />
      </a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href={RESUME} target="_blank" rel="noopener">
          Resume <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
