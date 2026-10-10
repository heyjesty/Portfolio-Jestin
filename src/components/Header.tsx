import { RESUME } from "@/data/projects";

export default function Header() {
  return (
    <header>
      <a className="brand" href="#home">
        Jestin G Johnson<span />
      </a>
      <nav aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#about">About me</a>
        <a href={RESUME} target="_blank" rel="noopener">
          Resume
        </a>
      </nav>
    </header>
  );
}
