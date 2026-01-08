"use client";

import { ReactNode } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

type SubStepProps = {
  children: ReactNode | ((localProgress: MotionValue<number>) => ReactNode);
  scrollProgress: MotionValue<number>;
  start?: number;
  end?: number;
  className?: string;
};

/**
 * SubStep - A nested animation step within a Step.
 * Animates opacity based on a specific range of the parent Step's scroll progress.
 *
 * @param scrollProgress - The parent Step's scrollYProgress
 * @param start - When to start fading in (0-1, default: 0)
 * @param end - When to start fading out (0-1, default: 1)
 * @param children - ReactNode or render function that receives localProgress (0→1 within this SubStep's range)
 */
export function SubStep({
  children,
  scrollProgress,
  start = 0,
  end = 1,
  className = "",
}: SubStepProps) {
  // Map scroll progress to opacity
  // Fade in from start to start+0.1, stay visible, fade out from end-0.1 to end
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  );

  // Create a normalized progress value (0→1) within this SubStep's range
  const localProgress = useTransform(
    scrollProgress,
    [start, end],
    [0, 1]
  );

  return (
    <motion.div
      style={{ opacity }}
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      {typeof children === 'function' ? children(localProgress) : children}
    </motion.div>
  );
}
