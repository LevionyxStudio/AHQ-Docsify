import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimesCircle } from "react-icons/fa"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground [&>svg]:text-foreground",
        destructive:
          "border-destructive/50 bg-destructive/5 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: 
          "border-emerald-500/50 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/50 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400",
        warning:
          "border-amber-500/50 bg-amber-500/5 text-amber-600 dark:text-amber-400 dark:border-amber-500/50 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const alertIcons = {
    default: <FaInfoCircle className="h-4 w-4" />,
    destructive: <FaTimesCircle className="h-4 w-4" />,
    success: <FaCheckCircle className="h-4 w-4" />,
    warning: <FaExclamationTriangle className="h-4 w-4" />,
}

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"


const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & { title?: string }
>(({ className, variant, title, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    {alertIcons[variant || "default"]}
    {title && <AlertTitle>{title}</AlertTitle>}
    <AlertDescription>{children}</AlertDescription>
  </div>
))
Alert.displayName = "Alert"


export { Alert, AlertTitle, AlertDescription }
