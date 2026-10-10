export type Category = "behance" | "github" | "vercel" | "artwork";
export type Discipline =
  | "frontend"
  | "backend"
  | "uiux"
  | "graphic"
  | "photography";

export type Project = {
  title: string;
  category: Category;
  /** Kind of work, for the section's tabs. */
  discipline: Discipline;
  eyebrow: string;
  description: string;
  href: string;
  actionLabel: string;
  /** Background tint variant for the cover frame. */
  art: 0 | 1 | 2 | 3 | 4;
  image?: string;
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

const behance = (title: string) => ({ actionLabel: "View on Behance", alt: title, title });
const github = (title: string) => ({ actionLabel: "View on GitHub", alt: title, title });

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
    alt: "Honey Tilia",
    art: 0,
    coverClass: "honey-cover",
  },
  {
    ...behance("UIUX Design Sample Project"),
    category: "behance",
    discipline: "uiux",
    eyebrow: "UI/UX Design · Behance",
    description: "Explore the full design presentation on Behance.",
    href: "https://www.behance.net/gallery/256337551/UIUX-Design-Sample-Project",
    image: "/assets/behance-256337551.webp",
    art: 2,
  },
  {
    ...behance("GreenBite New Project"),
    category: "behance",
    discipline: "uiux",
    eyebrow: "UI/UX Design · Behance",
    description: "Explore the full design presentation on Behance.",
    href: "https://www.behance.net/gallery/256404381/GreenBite-New-Project",
    image: "/assets/behance-256404381.webp",
    art: 3,
  },
  {
    ...behance("Burger Perfection"),
    category: "behance",
    discipline: "graphic",
    eyebrow: "Product Poster / Food Design",
    description:
      "A bold and vibrant food poster concept celebrating the art of the perfect burger — rich textures, dynamic composition, and mouth-watering visual storytelling.",
    href: "https://www.behance.net/gallery/253228285/Burger-Perfection-",
    image: "/assets/burger.jpg",
    art: 4,
  },
  {
    ...behance("Crocs Poster Release"),
    category: "behance",
    discipline: "graphic",
    eyebrow: "Product Poster / Brand Design",
    description:
      "A modern, trend-forward product release poster for Crocs — blending streetwear aesthetics with clean brand typography and high-impact visual energy.",
    href: "https://www.behance.net/gallery/253241581/Crocs-Poster-Release",
    image: "/assets/crocs.jpg",
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
    alt: "Ruchiyude Kalvara",
    art: 1,
    preview: true,
  },
  {
    ...github("Wedding Portfolio"),
    category: "github",
    discipline: "frontend",
    eyebrow: "Web UI / Portfolio",
    description:
      "A modern, responsive wedding portfolio website featuring elegant design, smooth animations, gallery sections, and a mobile-friendly user experience.",
    href: "https://github.com/heyjesty/Wedding-Port",
    image: "/assets/wedding_port_thumb.png",
    art: 2,
  },
  {
    ...github("Restaurant Website"),
    category: "github",
    discipline: "frontend",
    eyebrow: "Web UI / Landing Page",
    description:
      "A modern and responsive restaurant website featuring an elegant UI, menu showcase, reservation forms, and mobile-friendly design.",
    href: "https://github.com/heyjesty/Restaurant-Website",
    image: "/assets/restaurant_web_thumb.png",
    art: 3,
  },
  {
    ...github("SupMart Grocery Store"),
    category: "github",
    discipline: "frontend",
    eyebrow: "Web UI / E-Commerce",
    description:
      "A feature-rich e-commerce website specializing in the sale of fresh vegetables and fruits, providing a convenient platform to purchase and order.",
    href: "https://github.com/heyjesty/SupMart",
    image: "/assets/supmart_thumb.png",
    art: 4,
  },
  {
    ...github("MovieGram Store"),
    category: "github",
    discipline: "frontend",
    eyebrow: "Web UI / E-Commerce",
    description:
      "An e-commerce platform specializing in the sale of movies, providing customers with a search directory to browse, purchase, and stream their favorite films online.",
    href: "https://github.com/heyjesty/MovieGram",
    image: "/assets/moviegram_thumb.png",
    art: 0,
  },
  {
    ...github("HolyCross Scheduler"),
    category: "github",
    discipline: "frontend",
    eyebrow: "Web UI / Dashboard",
    description:
      "A web-based application designed to help hospitals streamline appointment scheduling for patients consulting with specific doctors.",
    href: "https://github.com/heyjesty/HolyCross-Hospital-Management",
    image: "/assets/holycross_thumb.png",
    art: 1,
  },
  {
    ...github("Veg-E-com Web App"),
    category: "github",
    discipline: "frontend",
    eyebrow: "Web UI / E-Commerce",
    description:
      "An e-commerce system built for vegetable marketing, integrating structured product layouts, shopping features, and dynamic cart operations.",
    href: "https://github.com/heyjesty/Veg-E-com",
    image: "/assets/veg_ecom_thumb.png",
    art: 2,
  },
  {
    ...github("AI Sales Chatbot"),
    category: "github",
    discipline: "backend",
    eyebrow: "Python / AI / Chatbot",
    description:
      "An intuitive conversational agent offering tailored product recommendations, addressing inventory inquiries, and streamlining the shopping experience.",
    href: "https://github.com/heyjesty/Sales-Chatbot",
    image: "/assets/sales_chatbot_thumb.png",
    art: 3,
  },
  {
    ...github("Music-Hall System"),
    category: "github",
    discipline: "backend",
    eyebrow: "Python / Audio / Playlists",
    description:
      "A Python-based back-end server orchestrating audio files, track streaming playlists, metadata extraction, and media directory indexing.",
    href: "https://github.com/heyjesty/Music-Hall",
    image: "/assets/music_hall_thumb.png",
    art: 4,
  },
  {
    ...github("Odoo Library Management"),
    category: "github",
    discipline: "backend",
    eyebrow: "Python / Odoo ERP",
    description:
      "A management module for Odoo CRM/ERP platforms to track book inventories, issue logs, student memberships, and circulation tables.",
    href: "https://github.com/heyjesty/Odoo-Library-Management",
    image: "/assets/odoo_library_thumb.png",
    art: 0,
  },
  {
    ...behance("Gucci Ace Concept Poster"),
    category: "behance",
    discipline: "graphic",
    eyebrow: "Product Poster / Graphic Design",
    description:
      "Luxury product poster design concept focusing on shoe styling, modern visual space, and high-impact digital brand aesthetics.",
    href: "https://www.behance.net/gallery/253173349/Gucci-Ace-Luxury-Product-Poster-Concept-",
    image: "/assets/ff00db253173349.6a61e98f3924c.png",
    art: 1,
  },
  {
    ...behance("iPhone 17 Pro Poster"),
    category: "behance",
    discipline: "graphic",
    eyebrow: "Product Poster / Brand Design",
    description:
      "A high-end brand-focused poster rendering and design presentation for Apple's conceptual premium flagship device.",
    href: "https://www.behance.net/gallery/253172787/iPhone-17-Pro-Premium-Product-Poster-Concept-",
    image: "/assets/ed8a49253172787.6a61e702b236f.png",
    art: 2,
  },
  {
    ...behance("iQOO 12 Poster Concept"),
    category: "behance",
    discipline: "graphic",
    eyebrow: "Product Poster / Brand Design",
    description:
      "Minimalist design study and print poster visual for the iQOO 12 smartphone, emphasizing sharp geometry and dynamic visual balance.",
    href: "https://www.behance.net/gallery/253172213/iQOO-12-Premium-Product-Poster-Concept",
    image: "/assets/04ed71253172213.6a61e4af50f6f.png",
    art: 3,
  },
  {
    ...behance("Event Management Portal"),
    category: "behance",
    discipline: "uiux",
    eyebrow: "UI/UX Design / Web Interface",
    description:
      "UI/UX design direction for a comprehensive dashboard allowing users to organize, discover, and purchase tickets for social events.",
    href: "https://www.behance.net/gallery/253141235/Event-Management-Portal",
    image: "/assets/a4bb9f253141235.6a610c0154fd0.png",
    art: 4,
  },
  {
    title: "Pineapple",
    category: "github",
    discipline: "frontend",
    eyebrow: "Website Project · GitHub",
    description: "Explore the project source and implementation on GitHub.",
    href: "https://github.com/heyjesty/Pineapple",
    actionLabel: "View on GitHub",
    cover: { title: "Pineapple", subtitle: "Web development" },
    art: 0,
  },
];
