
import path from "path";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx-components";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import rehypeHighlight from 'rehype-highlight';

const contentDir = path.join(process.cwd(), "src", "content", "announcements");

export type AnnouncementFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
};

export type Announcement = {
    slug: string;
    frontmatter: AnnouncementFrontmatter;
};

export async function getAllAnnouncements(): Promise<Announcement[]> {
  const files = await fs.readdir(contentDir);
  const announcements: Announcement[] = [];

  for (const file of files) {
    if (path.extname(file) !== '.mdx') {
      continue;
    }

    try {
      const filePath = path.join(contentDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);
      const frontmatter = data as AnnouncementFrontmatter;

      if (frontmatter.title && frontmatter.date && frontmatter.description && frontmatter.author) {
        announcements.push({
          slug: path.basename(file, path.extname(file)),
          frontmatter,
        });
      } else {
        console.warn(`Skipping announcement "${file}" due to missing frontmatter fields.`);
      }
    } catch (error) {
      console.error(`Error processing announcement file "${file}":`, error);
    }
  }

  announcements.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return announcements;
}


export async function getAnnouncementBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");

    const { content: rawContent, data } = matter(fileContent);

    const { content } = await compileMDX({
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
        parseFrontmatter: false,
      },
    });

    return {
      content,
      frontmatter: data as AnnouncementFrontmatter,
    };
  } catch (error) {
    return null;
  }
}
