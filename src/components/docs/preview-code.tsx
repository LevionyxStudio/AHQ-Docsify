
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FaCheck, FaCopy } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'; // For JSX
import shell from 'highlight.js/lib/languages/shell';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('shell-script', shell);

interface PreviewCodeProps {
  children: React.ReactNode;
  rawCode: string;
  lang?: string;
  className?: string;
}

export const PreviewCode = ({ children, rawCode, lang = 'jsx', className }: PreviewCodeProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement | null>(null);
  
  const trimmedCode = rawCode.trim();

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [trimmedCode]);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err)
      {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn("not-prose group my-6 overflow-hidden rounded-lg border bg-card", className)}>
      <div className="p-4">
        {children}
      </div>
      
      <div className="relative border-t dark:border-muted">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="absolute right-2 top-2 h-8 w-8 text-muted-foreground z-10 opacity-0 transition-opacity group-hover:opacity-100"
        >
          {isCopied ? (
            <FaCheck className="h-4 w-4 text-emerald-500" />
          ) : (
            <FaCopy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
        
        <div className="overflow-hidden">
          <pre className="relative m-0 overflow-x-auto [&>pre]:!m-0 dark:bg-[#011627]">
            <code ref={codeRef} className={cn(`language-${lang}`, "hljs", "block p-4", "bg-transparent")}>
                {trimmedCode}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
