"use client";

import { ReactNode, useRef } from "react";
import { MotionValue, useScroll } from "framer-motion";

export type StepChildProps = {
  scrollYProgress: MotionValue<number>;
};

type StepProps = {
  children: (props: StepChildProps) => ReactNode;
  height?: string;
  className?: string;
};

/**
 * Step - A scroll section that tracks its own scroll progress.
 * Provides scroll progress (0 to 1) to children for animations.
 *
 * @param height - CSS height value (default: "100vh")
 * @param children - Render function that receives scroll progress values
 */
export function Step({ children, height = "100vh", className = "" }: StepProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress for this specific step
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Start when step enters viewport, end when it leaves
  });

  return (
    <div
      ref={ref}
      style={{ height }}
      className={`relative ${className}`}
    >
      {children({ scrollYProgress })}
    </div>
  );
}
