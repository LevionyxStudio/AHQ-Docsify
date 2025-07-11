
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AnnouncementsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
