
import { getAllAnnouncements } from "@/lib/announcements";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";
import { FaArrowRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Latest news and updates from AHQ Docsify.",
};

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Announcements</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Latest news and updates from the team.
        </p>
      </div>

      <div className="space-y-8">
        {announcements.map((announcement) => (
          <Link href={`/announcements/${announcement.slug}`} key={announcement.slug} className="block group">
            <Card className="bg-background/50 border hover:border-primary/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <p className="text-sm text-muted-foreground">
                  {new Date(announcement.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors pt-1">
                  {announcement.frontmatter.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <CardDescription>
                      {announcement.frontmatter.description}
                  </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-muted-foreground">By {announcement.frontmatter.author}</p>
                  <div className="text-sm font-medium text-primary flex items-center gap-1">
                    Read more
                    <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
