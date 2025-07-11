'use client';

import type { Heading } from '@/lib/docs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaBook } from 'react-icons/fa';

interface TocDropdownProps {
  headings: Heading[];
}

export function TocDropdown({ headings }: TocDropdownProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            <FaBook className="mr-2 h-4 w-4" />
            On this page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] max-h-[50vh] overflow-y-auto"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {headings.map((heading) => (
            <DropdownMenuItem key={heading.slug} asChild>
              <a href={`#${heading.slug}`} className="w-full">
                {heading.level === 3 && <span className="mr-2">-</span>}
                {heading.title}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
