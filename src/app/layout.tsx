import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted by next/font so every device renders the same typeface.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
