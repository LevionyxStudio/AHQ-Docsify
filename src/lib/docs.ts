
import path from "path";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx-components";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import { docsConfig } from "@/config/docs";
import type { NavItem, SidebarNavItem } from "@/config/docs";
import rehypeHighlight from 'rehype-highlight';

const contentDir = path.join(process.cwd(), "src", "content", "docs");

export type Heading = {
  level: number;
  title: string;
  slug: string;
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(##|###)\s+(.*)/);
    if (match) {
        const level = match[1].length;
        const title = match[2].trim();
        headings.push({ level, title, slug: slugify(title) });
    }
  }
  return headings;
}

export function getFlattenedNav(): NavItem[] {
    const flattened: NavItem[] = [];
    docsConfig.sidebarNav.forEach(category => {
        if (category.slug === '_root') {
            flattened.push(...category.items.filter(item => !item.disabled));
        } else {
            flattened.push({
                title: category.title,
                href: `/docs/${category.slug}`,
            });
            flattened.push(...category.items.filter(item => !item.disabled));
        }
    });
    return flattened;
}

async function findActualPath(slugParts: string[]): Promise<string | null> {
    const filePath = path.join(contentDir, ...slugParts) + '.mdx';
    try {
        await fs.access(filePath);
        return filePath;
    } catch {
        return null;
    }
}


export async function getDocBySlug(slug: string[]) {
  const filePath = await findActualPath(slug);

  if (!filePath) {
    return null;
  }

  const fileContent = await fs.readFile(filePath, "utf8");
  const { content: rawContent, data: frontmatter } = matter(fileContent);
  const headings = extractHeadings(rawContent);

  const { content } = await compileMDX<{ title: string; disabled?: boolean; }>({
    source: rawContent,
    components: components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeHighlight, { aliases: { 'shell-script': ['shell'] } }],
        ],
      },
      parseFrontmatter: true,
    },
  });

  const flattenedNav = getFlattenedNav();
  const currentPath = `/docs/${slug.join("/")}`;
  const currentIndex = flattenedNav.findIndex(item => item.href === currentPath);
  
  const prevDoc = currentIndex > 0 ? flattenedNav[currentIndex - 1] : null;
  const nextDoc = currentIndex < flattenedNav.length - 1 ? flattenedNav[currentIndex + 1] : null;

  return {
    content,
    frontmatter,
    prevDoc,
    nextDoc,
    headings,
  };
}

export async function getCategoryData(categorySlug: string) {
    const category = docsConfig.sidebarNav.find(c => c.slug === categorySlug);

    if (!category) {
        return null;
    }

    return { 
        title: category.title, 
        docs: category.items 
    };
}


export async function getDocsNavigation(): Promise<SidebarNavItem[]> {
  return docsConfig.sidebarNav;
}

export async function getAllDocs() {
  const flattenedNav = getFlattenedNav();
  return flattenedNav.filter(item => item.href.split('/').length > 3).map(item => {
      const slug = item.href.replace('/docs/', '').split('/');
      return { slug };
  });
}
