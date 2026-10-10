import { RESUME } from "@/data/projects";

export default function Header() {
  return (
    <header>
      <a className="brand" href="#home">
        Jestin Johnson<span />
      </a>
      <nav aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#about">About me</a>
        <a href={RESUME} target="_blank" rel="noopener">
          Résumé ↗
        </a>
      </nav>
    </header>
  );
}
