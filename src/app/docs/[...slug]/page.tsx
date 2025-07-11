import { notFound } from "next/navigation";
import { getAllDocs, getDocBySlug, getCategoryData, getFlattenedNav } from "@/lib/docs";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { TocDropdown } from "@/components/docs/toc-dropdown";
import { FaArrowRight } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const doc = await getDocBySlug(params.slug);

  if (doc) {
    return {
      title: doc.frontmatter.title,
      description: "Documentation page for AHQ Docsify",
    };
  }

  if (params.slug.length === 1) {
    const categoryData = await getCategoryData(params.slug[0]);
    if (categoryData) {
      return {
        title: categoryData.title,
        description: `Browse documentation for ${categoryData.title}`,
      };
    }
  }

  return {};
}


export async function generateStaticParams(): Promise<DocPageProps["params"][]> {
    const docs = await getAllDocs();
    return docs.filter(doc => doc.slug.length > 1).map((doc) => ({
        slug: doc.slug,
    }));
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = params;
  const doc = await getDocBySlug(slug);

  if (doc) {
    const { content, prevDoc, nextDoc, headings } = doc;
  
    return (
      <div className="lg:flex lg:gap-8 lg:items-start">
        <div className="w-full min-w-0">
          <TocDropdown headings={headings} />
  
          <article className="prose dark:prose-invert max-w-none">
            {content}
          </article>
  
          <hr className="my-12" />
  
          <div className="flex items-stretch justify-center gap-4">
              {prevDoc ? (
                  <Link href={prevDoc.href} className="block flex-1 group">
                      <Button variant="outline" className="h-full w-full p-4 justify-start text-left">
                          <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground group-hover:text-accent-foreground">Previous</span>
                              <span className="font-semibold text-primary group-hover:text-accent-foreground truncate">« {prevDoc.title}</span>
                          </div>
                      </Button>
                  </Link>
              ) : <div className="flex-1" />}
              {nextDoc ? (
                  <Link href={nextDoc.href} className="block flex-1 group">
                      <Button variant="outline" className="h-full w-full p-4 justify-end text-right">
                           <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground group-hover:text-accent-foreground">Next</span>
                              <span className="font-semibold text-primary group-hover:text-accent-foreground truncate">{nextDoc.title} »</span>
                          </div>
                      </Button>
                  </Link>
              ) : <div className="flex-1" />}
          </div>
        </div>
         {headings.length > 0 && (
          <aside className="sticky top-24 h-fit shrink-0 basis-72 hidden lg:block">
              <TableOfContents headings={headings} />
          </aside>
         )}
      </div>
    );
  }

  if (slug.length === 1) {
    const categoryData = await getCategoryData(slug[0]);
    if (categoryData) {
        const flattenedNav = getFlattenedNav();
        const currentPath = `/docs/${slug[0]}`;
        const currentIndex = flattenedNav.findIndex(item => item.href === currentPath);
        
        const prevDoc = currentIndex > 0 ? flattenedNav[currentIndex - 1] : null;
        const nextDoc = currentIndex < flattenedNav.length - 1 ? flattenedNav[currentIndex + 1] : null;
      
        const { title, docs } = categoryData;
      
        return (
          <div className="mx-auto w-full max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-2 mb-8 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tight">{title}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Browse all the articles in the &quot;{title}&quot; category.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {docs.map((doc) => (
                  <Link href={doc.href} key={doc.href} className="block group">
                    <Card className="flex flex-col h-full bg-background/50 border hover:border-primary/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                      <CardHeader>
                        <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                          {doc.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        {doc.description && (
                          <CardDescription>{doc.description}</CardDescription>
                        )}
                      </CardContent>
                      <CardFooter>
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
      
            <hr className="my-12" />
      
            <div className="flex items-stretch justify-center gap-4">
                {prevDoc ? (
                    <Link href={prevDoc.href} className="block flex-1 group">
                        <Button variant="outline" className="h-full w-full p-4 justify-start text-left">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground group-hover:text-accent-foreground">Previous</span>
                                <span className="font-semibold text-primary group-hover:text-accent-foreground truncate">« {prevDoc.title}</span>
                            </div>
                        </Button>
                    </Link>
                ) : <div className="flex-1" />}
                {nextDoc ? (
                    <Link href={nextDoc.href} className="block flex-1 group">
                        <Button variant="outline" className="h-full w-full p-4 justify-end text-right">
                              <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground group-hover:text-accent-foreground">Next</span>
                                <span className="font-semibold text-primary group-hover:text-accent-foreground truncate">{nextDoc.title} »</span>
                            </div>
                        </Button>
                    </Link>
                ) : <div className="flex-1" />}
            </div>
          </div>
        );
    }
  }

  notFound();
}
