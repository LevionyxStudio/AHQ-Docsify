import type { MDXComponents } from "mdx/types";
import React from "react";
import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { Alert as AlertPrimitive, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PreviewCode } from "./docs/preview-code";
import { FaArrowRight, FaExclamationTriangle, FaTerminal } from "react-icons/fa";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { CodeBlockWrapper } from "./code-block-wrapper";


function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}


function RoundedImage(props: ImageProps) {
    return <Image className="rounded-lg" {...{alt: "", ...props}} />;
}

function Alert(props: React.ComponentProps<typeof AlertPrimitive>) {
  return (
    <AlertPrimitive className="my-6" {...props} />
  )
}

const getRawText = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(getRawText).join('');
  if (React.isValidElement(node) && node.props.children) {
    return getRawText(node.props.children);
  }
  return '';
};

const PreWithCopyAndLines = ({ children, ...props }: React.ComponentProps<'pre'>) => {
  const rawCode = getRawText(children);
  
  return (
    <CodeBlockWrapper rawCode={rawCode} preProps={props}>
      {children}
    </CodeBlockWrapper>
  )
}


export const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight font-headline"
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-headline"
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight font-headline"
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight font-headline"
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className="leading-7 [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className="my-6 ml-6 list-disc" {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className="my-6 ml-6 list-decimal" {...props} />
  ),
  li: ({ className, ...props }) => <li className="mt-2" {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground"
      {...props}
    />
  ),
  img: (props) => (
    <Image
      alt={props.alt ?? ""}
      src={props.src ?? ""}
      width={Number(props.width) || 700}
      height={Number(props.height) || 400}
      className="rounded-lg"
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="m-0 border-t p-0 even:bg-muted"
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  pre: PreWithCopyAndLines,
  Image: RoundedImage,
  Alert,
  AlertTitle,
  AlertDescription,
  PreviewCode,
  ArrowRight: FaArrowRight,
  AlertTriangle: FaExclamationTriangle,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Terminal: FaTerminal,
};
