const roles = [
  {
    icon: "J.",
    tone: "orange",
    company: "Freelance",
    role: "UI/UX Designer",
    summary: "Responsive websites, apps, dashboards, wireframes and interactive prototypes.",
    period: "Feb 2025 — Present",
  },
  {
    icon: "A",
    tone: "purple",
    company: "Aligntax Consultancy Services",
    role: "UI/UX Designer",
    summary: "Web and mobile UI, navigation, user flows and consistent visual systems.",
    period: "Jan 2024 — Feb 2025",
  },
  {
    icon: "Q",
    tone: "green",
    company: "Quadance Technologies",
    role: "Full Stack Developer Intern",
    summary: "Web application development, testing and design-to-code workflows.",
    period: "Oct 2023 — Dec 2023",
  },
];

export default function Experience() {
  return (
    <section className="experience section">
      <div className="section-heading reveal">
        <p className="eyebrow">Experience</p>
        <h2>A little context.</h2>
        <p>
          From building websites to shaping experiences.
          <br />A journey of learning and making.
        </p>
      </div>
      <div className="timeline">
        {roles.map((r) => (
          <article className="reveal" key={r.company}>
            <span className={`company-icon ${r.tone}`}>{r.icon}</span>
            <div>
              <h3>{r.company}</h3>
              <p>{r.role}</p>
              <p className="muted">{r.summary}</p>
            </div>
            <time>{r.period}</time>
          </article>
        ))}
      </div>
      <div className="education reveal">
        <span className="eyebrow">Education</span>
        <h3>Bachelor of Computer Applications</h3>
        <p>Manipal University Jaipur · 2023 – Present</p>
      </div>
    </section>
  );
}
