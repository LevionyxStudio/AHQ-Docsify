import type { ElementType, SVGProps } from "react";
import { FaDiscord, FaFileCode, FaMoon, FaMobileAlt, FaBolt, FaCode, FaSearch, FaFolder, FaPaintBrush, FaGithub, FaTwitter, FaBook, FaHome, FaYoutube, FaBullhorn } from "react-icons/fa";


type NavLink = {
  label: string;
  href: string;
  icon?: ElementType;
};

type Feature = {
  icon: ElementType;
  title: string;
  description: string;
};

type FooterColumn = {
  title: string;
  links: NavLink[];
};

type SocialLink = {
  label: string;
  href: string;
  icon: ElementType;
};

type HomePageConfig = {
  header: {
    links: NavLink[];
  };
  hero: {
    title: string;
    description: string;
    buttons: {
      getStarted: {
        label: string;
        href: string;
      };
      github: {
        label: string;
        href: string;
      };
    };
  };
  features: {
    title: string;
    items: Feature[];
  };
  cta: {
    title: string;
    description: string;
    buttons: {
      docs: {
        label: string;
        href: string;
      };
      github: {
        label: string;
        href: string;
      };
    };
  };
  footer: {
    columns: FooterColumn[];
    socials: SocialLink[];
    credit: string;
  };
};

export const homePageConfig: HomePageConfig = {
  header: {
    links: [
      { label: "Home", href: "/", icon: FaHome },
      { label: "Announcements", href: "/announcements", icon: FaBullhorn },
      { label: "Docs", href: "/docs/index", icon: FaBook },
    ],
  },
  hero: {
    title: "AHQ Docsify",
    description:
      "AHQ Docsify is a fast, modern, and fully customizable documentation site generator built with Next.js and Tailwind CSS. Whether you're building product docs, API references, or internal wikis, AHQ Docsify makes it easy to write, manage, and deploy beautiful documentation with MDX — all in just a few clicks.",
    buttons: {
      getStarted: { label: "Get Started", href: "/docs/index" },
      github: { label: "View on GitHub", href: "#" },
    },
  },
  features: {
    title: "Core Features",
    items: [
      {
        icon: FaFileCode,
        title: "MDX Support",
        description: "Write docs with Markdown and embed React components for interactive content.",
      },
      {
        icon: FaMoon,
        title: "Dark Mode Ready",
        description: "Toggle between light and dark themes for a personalized reading experience.",
      },
      {
        icon: FaMobileAlt,
        title: "Fully Responsive",
        description: "Looks great on any device, from mobile phones to desktop monitors.",
      },
      {
        icon: FaBolt,
        title: "Blazing Fast",
        description: "Built with Next.js for incredible speed and performance.",
      },
      {
        icon: FaCode,
        title: "Developer Friendly",
        description: "Clean, modular codebase designed for easy customization and extension.",
      },
      {
        icon: FaSearch,
        title: "Built-in Search",
        description: "Quickly find content with a lightweight and extensible search system.",
      },
      {
        icon: FaFolder,
        title: "Organized Structure",
        description: "Keep docs tidy and scalable with an intuitive folder-based layout.",
      },
      {
        icon: FaPaintBrush,
        title: "Customizable Design",
        description: "Easily theme your docs with Tailwind CSS and layout components.",
      },
    ],
  },
  cta: {
    title: "Ready to dive in?",
    description:
      "Explore the documentation to see what's possible, or head over to GitHub to contribute and make it even better.",
    buttons: {
      docs: { label: "Explore Docs", href: "/docs/index" },
      github: { label: "Contribute on GitHub", href: "#" },
    },
  },
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/#features" },
          { label: "Docs", href: "/docs/index" },
          { label: "Ready to dive in?", href: "/#cta" },
        ],
      },
      {
        title: "Socials",
        links: [
          { label: "GitHub", href: "#" },
          { label: "Twitter", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
        ],
      },
    ],
    socials: [
      { label: "GitHub", href: "#", icon: FaGithub },
      { label: "YouTube", href: "#", icon: FaYoutube },
      { label: "Discord", href: "#", icon: FaDiscord },
      { label: "Twitter", href: "#", icon: FaTwitter },
    ],
    credit: "AHQ Docsify. All rights reserved.",
  },
};
