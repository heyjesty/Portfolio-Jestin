export type Category = "behance" | "github" | "vercel" | "artwork";
export type Discipline =
  "frontend" | "backend" | "uiux" | "graphic" | "photography";

export type Project = {
  title: string;
  category: Category;
  /** Kind of work, for the section's tabs. */
  discipline: Discipline;
  eyebrow: string;
  description: string;
  /** Where the card opens: the live site when deployed, otherwise the repo. */
  href: string;
  /** Source repository, linked separately from the card. */
  github?: string;
  actionLabel: string;
  /** Background tint variant for the cover frame. */
  art: 0 | 1 | 2 | 3 | 4;
  image?: string;
  /** Natural pixel size of `image`, so the masonry board can lay out before it loads. */
  size?: [number, number];
  alt?: string;
  /** Text cover used when a project has no screenshot. */
  cover?: { title: string; subtitle: string };
  status?: string;
  coverClass?: string;
  /** Open the image in the in-page lightbox instead of navigating away. */
  preview?: boolean;
};

export const RESUME = "/assets/Jestin_JohnsonUIUX.pdf";
export const BEHANCE = "https://www.behance.net/jestinjohnson4";
export const GITHUB = "https://github.com/heyjesty";

export const disciplines: { id: Discipline | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "uiux", label: "UI/UX" },
  { id: "graphic", label: "Graphic Design" },
  { id: "photography", label: "Photography" },
];

/** A GitHub repo: opens its Vercel deploy when there is one, else the repo. */
const repo = (
  title: string,
  name: string,
  live?: string,
): Pick<
  Project,
  "title" | "alt" | "github" | "href" | "category" | "actionLabel"
> => ({
  title,
  alt: title,
  github: `${GITHUB}/${name}`,
  href: live ?? `${GITHUB}/${name}`,
  category: live ? "vercel" : "github",
  actionLabel: live ? "Visit live site" : "View on GitHub",
});

export const projects: Project[] = [
  {
    title: "Honey Tilia",
    category: "vercel",
    discipline: "frontend",
    eyebrow: "Brand Website · Vercel",
    status: "In progress · Currently working on",
    description:
      "Currently designing and developing Honey Tilia, a honey brand website with product storytelling and a warm, nature-inspired visual identity.",
    href: "https://honey-bee-two.vercel.app/#top",
    actionLabel: "Visit website",
    image: "/assets/honey-tilia-cover.png",
    size: [1448, 1086],
    alt: "Honey Tilia",
    art: 0,
    coverClass: "honey-cover",
  },
  {
    ...repo("GreenNest", "GreenNest", "https://greennest-shop.vercel.app"),
    discipline: "backend",
    eyebrow: "Node.js / Express / PostgreSQL",
    description:
      "A full e-commerce shop for indoor plants with search and filters, product reviews, a cart with coupons, and cash-on-delivery orders stored in PostgreSQL.",
    image: "/assets/greennest_thumb.webp",
    size: [1200, 900],
    art: 1,
  },
  {
    ...repo(
      "Jolly's Pineapple",
      "Pineapple",
      "https://pineapple-ochre.vercel.app",
    ),
    discipline: "frontend",
    eyebrow: "Web UI / Product Landing",
    description:
      "A dark, cinematic landing page for a single-origin luxury pineapple from Kerala, with scroll-driven storytelling and online ordering.",
    image: "/assets/pineapple_thumb.webp",
    size: [1200, 900],
    art: 0,
  },
  {
    ...repo("SupMart Grocery Store", "SupMart", "https://supemart.vercel.app"),
    discipline: "frontend",
    eyebrow: "Web UI / E-Commerce",
    description:
      "A feature-rich e-commerce website specializing in the sale of fresh vegetables and fruits, providing a convenient platform to purchase and order.",
    image: "/assets/supmart_thumb.png",
    size: [1024, 1024],
    art: 4,
  },
  {
    ...repo(
      "MovieGram Store",
      "MovieGram",
      "https://moviegram-fawn.vercel.app",
    ),
    discipline: "frontend",
    eyebrow: "Web UI / E-Commerce",
    description:
      "An e-commerce platform specializing in the sale of movies, providing customers with a search directory to browse, purchase, and stream their favorite films online.",
    image: "/assets/moviegram_thumb.png",
    size: [1024, 1024],
    art: 0,
  },
  {
    ...repo(
      "HolyCross Scheduler",
      "HolyCross-Hospital-Management",
      "https://holycross-hospital-management.vercel.app",
    ),
    discipline: "frontend",
    eyebrow: "Web UI / Dashboard",
    description:
      "A web-based application designed to help hospitals streamline appointment scheduling for patients consulting with specific doctors.",
    image: "/assets/holycross_thumb.png",
    size: [1024, 1024],
    art: 1,
  },
  {
    ...repo("Jestyport", "Jestyport", "https://jestyport.vercel.app"),
    discipline: "frontend",
    eyebrow: "Web UI / Portfolio",
    description:
      "My earlier personal portfolio: a dark, glowing showcase of UI/UX work, experience and process.",
    image: "/assets/jestyport_thumb.webp",
    size: [1200, 900],
    art: 2,
  },
  {
    ...repo("Wedding Portfolio", "Wedding-Port"),
    discipline: "frontend",
    eyebrow: "Web UI / Portfolio",
    description:
      "A modern, responsive wedding portfolio website featuring elegant design, smooth animations, gallery sections, and a mobile-friendly user experience.",
    image: "/assets/wedding_port_thumb.png",
    size: [1024, 1024],
    art: 2,
  },
  {
    ...repo("Restaurant Website", "Restaurant-Website"),
    discipline: "frontend",
    eyebrow: "Web UI / Landing Page",
    description:
      "A modern and responsive restaurant website featuring an elegant UI, menu showcase, reservation forms, and mobile-friendly design.",
    image: "/assets/restaurant_web_thumb.png",
    size: [1024, 1024],
    art: 3,
  },
  {
    ...repo("Veg-E-com Web App", "Veg-E-com"),
    discipline: "frontend",
    eyebrow: "Web UI / E-Commerce",
    description:
      "An e-commerce system built for vegetable marketing, integrating structured product layouts, shopping features, and dynamic cart operations.",
    image: "/assets/veg_ecom_thumb.png",
    size: [800, 600],
    art: 2,
  },
  {
    ...repo("AI Sales Chatbot", "Sales-Chatbot"),
    discipline: "backend",
    eyebrow: "Python / AI / Chatbot",
    description:
      "An intuitive conversational agent offering tailored product recommendations, addressing inventory inquiries, and streamlining the shopping experience.",
    image: "/assets/sales_chatbot_thumb.png",
    size: [1024, 1024],
    art: 3,
  },
  {
    ...repo("Music-Hall System", "Music-Hall"),
    discipline: "backend",
    eyebrow: "Python / Audio / Playlists",
    description:
      "A Python-based back-end server orchestrating audio files, track streaming playlists, metadata extraction, and media directory indexing.",
    image: "/assets/music_hall_thumb.png",
    size: [800, 600],
    art: 4,
  },
  {
    ...repo("Odoo Library Management", "Odoo-Library-Management"),
    discipline: "backend",
    eyebrow: "Python / Odoo ERP",
    description:
      "A management module for Odoo CRM/ERP platforms to track book inventories, issue logs, student memberships, and circulation tables.",
    image: "/assets/odoo_library_thumb.png",
    size: [800, 600],
    art: 0,
  },
  {
    title: "Ruchiyude Kalvara",
    category: "artwork",
    discipline: "graphic",
    eyebrow: "Graphic Design / Menu Design",
    description:
      "A traditional restaurant menu design blending authentic typography, rich food photography, and warm earthy aesthetics for a warm, local dining identity.",
    href: "/assets/kalavara.jpg",
    actionLabel: "View artwork",
    image: "/assets/kalavara.jpg",
    size: [1066, 1600],
    alt: "Ruchiyude Kalvara",
    art: 1,
    preview: true,
  },
];
