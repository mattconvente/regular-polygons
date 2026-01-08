"use client";

import { useTransform, type MotionValue } from "framer-motion";
import { Polygon } from "@/app/components/Polygon";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function polygonFillHsl(i: number, count: number) {
  const t = count <= 1 ? 0 : i / (count - 1);
  const h =
    t < 0.5 ? lerp(75, 100, t * 2) : lerp(95, 135, (t - 0.5) * 2);
    // t < 0.5 ? lerp(275, 235, t * 2) : lerp(235, 155, (t - 0.5) * 2);
  const s = lerp(64, 52, t);
  const l = lerp(50, 64, t);

  return { h, s, l };
}

export function PolygonTile({
  i,
  sides,
  hueOffset,
}: {
  i: number;
  sides: number;
  hueOffset: MotionValue<number>;
}) {

  const polygonFill = useTransform(hueOffset, (o) => {
    const { h, s, l } = polygonFillHsl(i, 24);
    return `hsl(${(h + o) % 360} ${s}% ${l}%)`;
  });
  return (
    <Polygon
      className={i === 0 ? "relative top-4" : undefined}
      sides={sides}
      polygonFill={polygonFill}
    />
  );
}
