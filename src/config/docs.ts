export type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
    label?: string;
    description?: string;
};

export type SidebarNavItem = {
  title: string;
  slug: string;
  items: NavItem[];
};

export const docsConfig: { sidebarNav: SidebarNavItem[] } = {
    sidebarNav: [
        {
            title: "Overview",
            slug: "_root",
            items: [
                {
                    title: "Introduction",
                    href: "/docs/index",
                    description: "Get started with AHQ Docsify — an easy, fast, and customizable documentation generator built with modern web technologies."
                },
            ]
        },
        {
            title: "Getting Started",
            slug: "getting-started",
            items: [
                {
                    title: "Installation",
                    href: "/docs/getting-started/installation",
                    description: "Learn how to set up AHQ Docsify in your project with a few simple steps.",
                },
                {
                    title: "Configuration",
                    href: "/docs/getting-started/configuration",
                    description: "Customize your documentation site by editing the main configuration files.",
                },
            ],
        },
        {
            title: "Components",
            slug: "components",
            items: [
                {
                    title: "Alert",
                    href: "/docs/components/alert",
                    description: "Displays a callout for user attention.",
                },
                {
                    title: "Preview Code",
                    href: "/docs/components/preview-code",
                    description: "Display a live preview of a component with its corresponding code.",
                },
                {
                    title: "Tabs",
                    href: "/docs/components/tabs",
                    description: "A set of layered sections of content, known as tab panels, that are displayed one at a time.",
                },
                {
                    title: "Code Block",
                    href: "/docs/components/code-block",
                    description: "A themeable code block component with syntax highlighting",
                },
            ],
        },
    ],
};
