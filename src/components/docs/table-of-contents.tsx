'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/lib/docs';

type TableOfContentsProps = {
  headings: Heading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    
    if (headings.length === 0) return;
    
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                setActiveId(entry.target.id);
                // No need to break, we want the last intersecting element to be active
            }
        }
      },
      { rootMargin: `0% 0% -80% 0%` } // highlight when heading is in the top 20% of the viewport
    );

    const headingElements = headings.map(({ slug }) => document.getElementById(slug)).filter(Boolean);
    
    headingElements.forEach((el) => observer.current?.observe(el!));

    return () => {
      observer.current?.disconnect();
    };
  }, [headings]);
  
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <p className="font-semibold text-lg">On this page</p>
      <ul className="m-0 list-none space-y-2 border-l pl-4 text-sm">
        {headings.map((heading) => (
          <li key={heading.slug} className="m-0 p-0">
            <a
              href={`#${heading.slug}`}
              className={cn(
                'inline-block no-underline transition-colors hover:text-foreground',
                heading.level === 3 ? 'pl-4' : '',
                activeId === heading.slug
                  ? 'font-medium text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
