"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils"

const progressVariant= cva(
    "h-full w-full flex-1 bg-primary transition-all",
    {
        variants : {
            variant : {
                default : "bg-violet-400",
                success : "bg-emerald-400"
            },
        },
        defaultVariants : {
            variant : "default"
        }
    }
);

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps <typeof progressVariant> {}

type CombinedProgressProps = ProgressProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CombinedProgressProps
>(({ className, value, variant ,...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressVariant({ variant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
