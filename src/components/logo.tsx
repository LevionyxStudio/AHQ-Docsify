import type { SVGProps } from 'react';
import { cn } from "@/lib/utils";

export function Logo(props: SVGProps<SVGSVGElement>) {
  const { stroke, className, ...rest } = props;
  const isWhite = !stroke || stroke === 'white';

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="app-logo"
      {...rest}
      className={cn(isWhite && "invert dark:invert-0", className)}
    >
      <path
        d="M298.227 166.561L279.113 134.281M279.113 134.281L266.023 112.173C263.313 107.595 256.687 107.595 253.977 112.173L110.934 353.756C110.322 354.79 109.461 355.65 108.365 356.145C104.085 358.077 92.0423 362.291 80 355.333M279.113 134.281L402.803 344.787C405.545 349.454 402.18 355.333 396.768 355.333H223C219.134 355.333 216 358.462 216 362.328C216 366.983 216 373.591 216 381"
        stroke={stroke || "white"}
        strokeWidth="52"
      />
    </svg>
  );
}
