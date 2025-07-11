'use client';

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import type { SidebarNavItem } from "@/config/docs";
import { FaChevronRight, FaBars } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function DocsSidebarNav({ sidebarNav, onLinkClick }: { sidebarNav: SidebarNavItem[], onLinkClick?: () => void }) {
    const pathname = usePathname();
    
    if (!sidebarNav || sidebarNav.length === 0) {
      return null;
    }

    return (
        <nav className="flex h-full flex-col">
            <div className="border-b p-4">
                 <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-6 w-6" />
                    <span className="font-bold font-headline text-lg">AHQ Docsify</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                    {sidebarNav.map((group) => {
                        const isActiveCategory = !group.items.some(item => item.href === pathname) && pathname.startsWith(`/docs/${group.slug}`);

                        return group.slug === '_root' ? (
                            group.items.map(item => {
                                const isActive = pathname === item.href;
                                return (
                                <li key={item.href}>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "w-full justify-start",
                                            isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground",
                                            item.disabled ? "pointer-events-none opacity-60" : ""
                                        )}
                                    >
                                        <Link href={item.disabled ? "#" : item.href} onClick={onLinkClick}>
                                            {item.title}
                                        </Link>
                                    </Button>
                                </li>
                            )})
                        ) : (
                        <li key={group.slug}>
                            <Collapsible
                                className="group w-full"
                                defaultOpen={true}
                            >
                                <div className="flex w-full items-center justify-between rounded-md pr-1.5 text-sm hover:bg-muted">
                                    <Link 
                                        href={`/docs/${group.slug}`} 
                                        onClick={onLinkClick} 
                                        className={cn(
                                            "flex-1 px-2 py-1.5 font-semibold",
                                            isActiveCategory ? "text-primary" : ""
                                        )}
                                    >
                                        {group.title}
                                    </Link>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                                            <FaChevronRight className={cn(
                                                "h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90",
                                                isActiveCategory && "text-primary"
                                                )} />
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent className="py-1">
                                    <ul className="space-y-1 pl-4 border-l ml-1.5">
                                        {group.items.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                            <li key={item.href} className="ml-2">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        "w-full justify-start",
                                                        isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground",
                                                        item.disabled ? "pointer-events-none opacity-60" : ""
                                                        )}
                                                >
                                                    <Link href={item.disabled ? "#" : item.href} onClick={onLinkClick}>
                                                        {item.title}
                                                    </Link>
                                                </Button>
                                            </li>
                                        )})}
                                    </ul>
                                </CollapsibleContent>
                            </Collapsible>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
}


export function DocsSidebar({ sidebarNav }: { sidebarNav: SidebarNavItem[] }) {
    const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
    
    const handleLinkClick = () => {
      setIsMobileSheetOpen(false);
    };

    return (
        <>
            <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-72 lg:flex-col lg:border-r">
              <DocsSidebarNav sidebarNav={sidebarNav} />
            </aside>
            <div className="fixed top-16 z-30 lg:hidden">
              <div className="container mx-auto flex h-14 items-center px-6">
                  <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                      <SheetTrigger asChild>
                          <Button variant="outline">
                              <FaBars className="mr-2 h-4 w-4" />
                              Menu
                          </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[300px] p-0">
                          <DocsSidebarNav sidebarNav={sidebarNav} onLinkClick={handleLinkClick} />
                      </SheetContent>
                  </Sheet>
              </div>
            </div>
        </>
    );
}
