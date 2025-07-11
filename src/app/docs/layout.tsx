
import { getDocsNavigation } from "@/lib/docs";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsHeader } from "@/components/docs/docs-header";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const sidebarNav = await getDocsNavigation();
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DocsHeader />

      <div className="flex flex-1">
        <DocsSidebar sidebarNav={sidebarNav} />

        <div className="w-full lg:pl-72">
          <div className="sticky top-16 z-20 border-b bg-background/80 backdrop-blur-sm lg:hidden h-14" />
          
          <main className="flex-1">
            <div className="container mx-auto px-6 py-6 lg:py-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
