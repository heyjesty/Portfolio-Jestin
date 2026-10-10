import { RESUME } from "@/data/projects";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="orbits" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">UI/UX &amp; Product Designer</p>
        <h1>
          Jestin G
          <br />
          Johnson<span>.</span>
        </h1>
        <p className="intro">
          Designing interfaces.
          <br />
          Making experiences feel effortless.
        </p>
        <div className="hero-actions">
          <a className="text-link" href="#work">
            Explore my work
          </a>
          <a className="resume-button" href={RESUME} download="Jestin_JohnsonUIUX.pdf">
            Download résumé ↓
          </a>
        </div>
      </div>
      <DesignTools />
      <div className="hero-bottom">
        <span>Design. Build. Refine.</span>
        <a href="#work">Scroll to explore ↓</a>
      </div>
    </section>
  );
}

/** Decorative floating "Figma canvas" widgets around the hero copy. */
function DesignTools() {
  return (
    <div className="design-tools" aria-hidden="true">
      <div className="figma-tool">
        <div className="figma-symbol">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <span>Made with Figma</span>
      </div>
      <div className="layers-tool">
        <div className="tool-title">
          Layers <span>+</span>
        </div>
        <div>⌘ &nbsp; Design system</div>
        <div className="layer-selected">▧ &nbsp; Hero / Desktop</div>
        <div>Ｔ &nbsp; Typography</div>
        <div>◇ &nbsp; Components</div>
      </div>
      <div className="prototype-tool">
        <span className="prototype-icon">▶</span>
        <div>
          <strong>Prototype</strong>
          <small>Ideas → interactions</small>
        </div>
        <i />
      </div>
      <div className="cursor-tool">
        <svg width="30" height="35" viewBox="0 0 30 35">
          <path d="M3 2 L26 21 L15 22 L10 32 Z" fill="#7c5ce7" stroke="white" strokeWidth="2" />
        </svg>
        <span>Jestin</span>
      </div>
      <div className="swatches-tool">
        <i />
        <i />
        <i />
        <span>Colour &amp; character</span>
      </div>
      <div className="canvas-corners">
        <i />
        <i />
        <i />
        <i />
        <span>Jestin / UI·UX Designer</span>
      </div>
    </div>
  );
}
