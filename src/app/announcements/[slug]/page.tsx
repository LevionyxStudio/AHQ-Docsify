
import { notFound } from "next/navigation";
import { getAllAnnouncements, getAnnouncementBySlug } from "@/lib/announcements";
import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface AnnouncementPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: AnnouncementPageProps): Promise<Metadata> {
  const announcement = await getAnnouncementBySlug(params.slug);

  if (!announcement) {
    return {};
  }

  return {
    title: announcement.frontmatter.title,
    description: announcement.frontmatter.description,
  };
}

export async function generateStaticParams() {
  const announcements = await getAllAnnouncements();
  return announcements.map((announcement) => ({
    slug: announcement.slug,
  }));
}

export default async function AnnouncementPage({ params }: AnnouncementPageProps) {
  const announcement = await getAnnouncementBySlug(params.slug);

  if (!announcement) {
    notFound();
  }

  const { content, frontmatter } = announcement;

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/announcements" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <FaArrowLeft />
        Back to announcements
      </Link>
      
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8">
            <h1 className="mb-2">{frontmatter.title}</h1>
            <p className="text-muted-foreground">
                By {frontmatter.author} on {new Date(frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
        </div>
        
        {content}
      </article>
    </div>
  );
}
