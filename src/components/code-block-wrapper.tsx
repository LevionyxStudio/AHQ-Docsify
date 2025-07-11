'use client'

import { useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function CodeBlockWrapper({
  children,
  rawCode,
  preProps,
}: {
  children: React.ReactNode
  rawCode: string
  preProps: React.ComponentProps<'pre'>
}) {
  const [isCopied, setIsCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code: ', err)
    }
  }

  return (
    <div className="relative group my-6 overflow-hidden rounded-lg border">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
      >
        {isCopied ? <FaCheck className="h-4 w-4 text-emerald-500" /> : <FaCopy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
      
      <pre 
        {...preProps} 
        className={cn(
          "overflow-x-auto p-4 dark:bg-[#011627]",
          preProps.className
        )}
      >
        {children}
      </pre>
    </div>
  )
}
