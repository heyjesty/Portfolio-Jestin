import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#fdfdfb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Portfolio-Jestin",
  description:
    "Jestin G Johnson, UI/UX designer. Explore web interfaces, visual design and digital experiences.",
  authors: [{ name: "Jestin G Johnson" }],
};

// Runs before first paint: enables the intro loader and scroll reveals only
// when motion is allowed, so content never flashes in and out on hydration.
const motionScript = `(function(){var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("intro-enabled");if("IntersectionObserver" in window)d.classList.add("js-motion")})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
