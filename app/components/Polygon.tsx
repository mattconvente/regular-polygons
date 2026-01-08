"use client";

import { useMemo } from "react";
import { motion, type MotionValue } from "framer-motion";

function calcSideRotation(n: number) {
  return n % 2 === 0
    ? -Math.PI / 2 - Math.PI / n
    : -Math.PI / 2;
}

function generatePolygonPoints(n: number) {
  const sides = Math.max(3, Math.floor(n));
  const cx = 50;
  const cy = 50;
  const r = 50;

  const rot = calcSideRotation(sides);

  const pts = Array.from({ length: sides }, (_, k) => {
    const a = rot + (2 * Math.PI * k) / sides;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    return `${x.toFixed(6)},${y.toFixed(6)}`;
  });

  return pts.join(" ");
}

type PolygonProps = {
  sides?: number;
  isInscribed?: boolean;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number | MotionValue<number>;
  polygonFill?: string | MotionValue<string>;
  circleFill?: string | MotionValue<string>;
  className?: string,
};

export function Polygon({
  sides = 3,
  isInscribed = false,
  stroke,
  strokeWidth = 1,
  strokeOpacity = 1,
  polygonFill = "#41b7d1",
  circleFill = "#4d8fc2",
  className,
}: PolygonProps) {
  const points = useMemo(() => generatePolygonPoints(sides), [sides]);

  return (
    <svg viewBox="0 0 100 100" width="100%" height="auto" aria-hidden="true" className={className}>
      {isInscribed && <motion.circle cx="50" cy="50" r="50" fill={circleFill} />}

      <motion.polygon
        points={points}
        stroke={stroke}
        fill={polygonFill}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
        vectorEffect="non-scaling-stroke"
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}
