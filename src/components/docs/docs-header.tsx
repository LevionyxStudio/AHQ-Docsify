"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "../theme-toggle";
import { homePageConfig } from "@/config/homepage";
import { Separator } from "@/components/ui/separator";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-sm">
        <div className="flex flex-1 items-center justify-start gap-2">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-6 w-6" />
                <span className="font-bold font-headline text-lg sm:inline-block">
                AHQ Docsify
                </span>
            </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center space-x-4">
          {homePageConfig.header.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium px-2 py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-4">
            <ThemeToggle />
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="inline-flex items-center justify-center"
                        >
                        <FaBars className="h-5 w-5" />
                        <span className="sr-only">Open main menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent 
                        side="right" 
                        className="w-[280px] p-0 top-4 right-4 bottom-auto h-auto rounded-xl border shadow-lg origin-top-right data-[state=open]:animate-sheet-in-diag data-[state=closed]:animate-sheet-out-diag"
                    >
                        <SheetHeader className="p-4 border-b">
                            <SheetTitle>
                                <SheetClose asChild>
                                    <Link href="/" className="flex items-center gap-2">
                                        <Logo className="h-6 w-6" />
                                        <span className="font-bold font-headline">AHQ Docsify</span>
                                    </Link>
                                </SheetClose>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="p-4 flex flex-col h-full">
                            <nav className="flex flex-col gap-1">
                                {homePageConfig.header.links.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                    <SheetClose asChild key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {Icon && <Icon className="h-5 w-5" />}
                                            <span>{link.label}</span>
                                        </Link>
                                    </SheetClose>
                                    );
                                })}
                            </nav>
                            <div className="mt-auto">
                                <Separator className="my-4" />
                                <div className="flex justify-center items-center gap-2">
                                    {homePageConfig.footer.socials.map((social) => (
                                      <SheetClose asChild key={social.label}>
                                        <Button variant="ghost" size="icon" asChild>
                                          <Link href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                                            <social.icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
                                          </Link>
                                        </Button>
                                      </SheetClose>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </header>
  );
}
