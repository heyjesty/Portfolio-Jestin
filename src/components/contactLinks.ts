import { BEHANCE, GITHUB } from "@/data/projects";

/** Contact details shared by the contact section and the footer. */
export const CONTACT = {
  email: "jestinjohnson1@gmail.com",
  phone: "+91 8590569016",
  phoneHref: "tel:+918590569016",
};

/** Social profiles; `mark` is the short badge shown on the contact pills. */
export const socials = [
  {
    label: "LinkedIn",
    mark: "in",
    href: "https://www.linkedin.com/in/heyjesty/",
  },
  { label: "Behance", mark: "Bē", href: BEHANCE },
  { label: "GitHub", mark: "gh", href: GITHUB },
  {
    label: "Instagram",
    mark: "ig",
    href: "https://www.instagram.com/moodygrammer/",
  },
  { label: "WhatsApp", mark: "wa", href: "https://wa.me/918590569016" },
];
