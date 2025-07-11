import Link from 'next/link';
import { Logo } from '@/components/logo';
import { homePageConfig } from '@/config/homepage';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16 mb-8">
          <div className="flex flex-col gap-4 items-start">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg font-headline">AHQ Docsify</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {homePageConfig.hero.description.substring(0, 110)}...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 col-span-1 lg:col-span-3">
            {homePageConfig.footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <h3 className="font-headline font-semibold text-sm tracking-wider uppercase text-foreground">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {homePageConfig.footer.credit}
          </p>
          <div className="flex items-center gap-2">
            {homePageConfig.footer.socials.map((social) => (
              <Button key={social.label} variant="ghost" size="icon" asChild>
                <Link href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
