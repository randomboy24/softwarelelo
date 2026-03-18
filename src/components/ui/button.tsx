import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
  default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-white",
  ghost: "hover:bg-slate-800 hover:text-white text-slate-300",
  link: "underline-offset-4 hover:underline text-indigo-500",
};

const sizeVariants = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8 text-lg",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // We are deliberately wrapping the standard button in a motion component for micro-interactions
    // unless asChild is used (this might require special handling, but we'll adapt depending on Radix UI)
    const Comp = asChild ? Slot : motion.button;
    
    // Convert to motion props if not using Slot
    const motionProps = asChild ? {} : {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400, damping: 10 }
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          sizeVariants[size],
          className
        )}
        ref={ref}
        {...motionProps}
        {...(props as any)}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
