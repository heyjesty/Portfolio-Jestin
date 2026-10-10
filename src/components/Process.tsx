const steps = [
  { title: "Understand", text: "Research the problem, the people and what they need." },
  { title: "Structure", text: "Map user flows and explore ideas through wireframes." },
  { title: "Make", text: "Bring the experience to life with UI and interactive prototypes." },
  { title: "Refine", text: "Test, listen, iterate and prepare a clear developer handoff." },
];

export default function Process() {
  return (
    <section className="process section">
      <p className="eyebrow">How I work</p>
      <h2>
        From the right questions
        <br />
        to the small details.
      </h2>
      <div className="process-grid">
        {steps.map((s, i) => (
          <article key={s.title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
