import type { CSSProperties, ReactNode } from "react";

/** Section label styled like a Figma frame name: frame glyph, index, name. */
export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <p className="label">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3.5.5v11M8.5.5v11M.5 3.5h11M.5 8.5h11"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
      <b>{index}</b>
      {children}
    </p>
  );
}

/**
 * Headline lines that slide up from behind a mask when their `.reveal-text` parent
 * scrolls into view. The last line ends with the orange full stop from the hero.
 */
export function Lines({
  lines,
  dot = true,
}: {
  lines: string[];
  dot?: boolean;
}) {
  return lines.map((line, i) => (
    <span key={line} className="line" style={{ "--l": i } as CSSProperties}>
      <span>
        {line}
        {dot && i === lines.length - 1 && <span className="dot">.</span>}
      </span>
    </span>
  ));
}

/** Diagonal "opens elsewhere" arrow; an SVG so it never renders as an emoji. */
export function Arrow() {
  return (
    <svg
      className="arrow"
      width="0.75em"
      height="0.75em"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 9 9 3M4 3h5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
