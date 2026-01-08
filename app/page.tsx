"use client";

import { useState, useRef } from "react";
import { motion, useTransform, useMotionValueEvent, useScroll } from "framer-motion";
import { Stage, Step, StepChildProps, SubStep } from "@/app/components/storyboard"
import { AngleArcs } from "@/app/components/AngleArcs";
import { SideLabels } from "@/app/components/SideLabels";
import { Polygon } from "@/app/components/Polygon";
import { PolygonTile } from "@/app/components/PolygonTile";

function StepOne({ scrollYProgress }: StepChildProps) {
  const containerOpacity = useTransform(
    scrollYProgress,
    [0.66, 0.85],
    [1, 0],
  );
  const hueOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 360],
  );

  return (
    <Stage>
      <motion.div
        className="h-full w-full flex flex-col gap-4 justify-center items-center"
        style={{ opacity: containerOpacity }}
      >
        <div className="w-full relative">
          <h1 className="absolute h-full w-full flex justify-center items-center text-center text-8xl z-1"
            style={{textBox: "trim-both cap alphabetic"}}>
            <span className="p-8 bg-white/66 shadow-xs">Regular Polygons</span>
          </h1>
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-8">
            {Array.from({ length: 32}, (_, i) => {
              const sides = i + 3;

              return (
                <PolygonTile
                  key={sides}
                  i={i}
                  sides={sides}
                  hueOffset={hueOffset}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </Stage>
  );
}

function StepTwo({ scrollYProgress }: StepChildProps) {
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.75, 1],
    [0, 1, 1, 0],
  );

  return (
    <Stage>
      <motion.div
        className="h-full w-full flex flex-col md:grid md:grid-cols-[1.5fr_1fr] gap-4 justify-center items-center"
        style={{ opacity: containerOpacity }}
      >
        {/* Polygon area with SubSteps */}
        <div className="relative w-full min-w-60 max-w-160 mx-auto">
          <SubStep scrollProgress={scrollYProgress} start={0.06} end={0.33} className="md:top-16">
            <div className="relative w-full">
              <Polygon
                sides={3}
                stroke="currentColor"
                strokeWidth={1.5}
              />
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <AngleArcs sides={3} />
                <SideLabels sides={3} />
              </svg>
            </div>
          </SubStep>

          <SubStep scrollProgress={scrollYProgress} start={0.33} end={0.6}>
            <div className="relative w-full">
              <Polygon
                sides={4}
                stroke="currentColor"
                strokeWidth={1.5}
              />
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <AngleArcs sides={4} />
                <SideLabels sides={4} />
              </svg>
            </div>
          </SubStep>

          <SubStep scrollProgress={scrollYProgress} start={0.6} end={0.87}>
            <div className="relative w-full">
              <Polygon
                sides={5}
                stroke="currentColor"
                strokeWidth={1.5}
              />
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <AngleArcs sides={5} />
                <SideLabels sides={5} />
              </svg>
            </div>
          </SubStep>
        </div>

        <motion.div className="relative mx-auto pointer-events-auto">
          <h2 className="mb-2">What is a regular polygon?</h2>
          <p>A regular polygon has equal sides and equal&nbsp;interior angles.</p>
        </motion.div>
      </motion.div>
    </Stage>
  );
}

function StepThree({ scrollYProgress }: StepChildProps) {
  const [currentSides, setCurrentSides] = useState(3);
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0, 1, 1, 0],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0, 1, 1, 0],
  );
  const sides = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    [3, 3, 100],
  );
  const polygonFill = useTransform(
    scrollYProgress,
    [0, 1],
    ["#e6ec7d", "#ffb703"]
    // ["#f2e9e4", "#e9c46a"]
    // ["#41b7d1", "#9d4edd"]
  );

  useMotionValueEvent(sides, "change", (latest) => {
    const next = Math.round(latest);
    setCurrentSides((prev) => (prev === next ? prev : next));
  });

  return (
    <Stage>
      <motion.div
        className="h-full w-full flex flex-col md:grid md:grid-cols-[1.5fr_1fr] gap-4 justify-center items-center"
        style={{ opacity: containerOpacity }}
      >
        <div className="relative w-full min-w-60 max-w-160 mx-auto">
            <motion.div className="relative w-full">
              <Polygon
                sides={currentSides}
                polygonFill={polygonFill}
                // stroke="currentColor"
                // strokeWidth={1.5}
              />
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <text
                  x="50"
                  y="50"
                  fontSize="10"
                  className="fill-(--color-foreground) tabular-nums"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="semibold"
                >
                  {currentSides} sides
                </text>
              </svg>
            </motion.div>
        </div>

        {/* Text panel */}
        <motion.div className="relative mx-auto pointer-events-auto" style={{ opacity: textOpacity }}>
          <h2 className="mb-2">Morphing Polygons</h2>
          <p>The polygon approximates a circle as the number of sides approaches infinity.</p>
        </motion.div>
      </motion.div>
    </Stage>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    // <div className="bg-[#edeff4]">
    <div ref={containerRef}>
      <motion.div
        className="fixed top-0 left-0 h-1 bg-current z-50"
        style={{ width: progressWidth }}
      />

      {/* <h1 className="fixed top-4 left-4 z-50">Regular Polygons</h1> */}

      <div className="relative">
        <Step height="250vh">
          {(props) => <StepOne {...props} />}
        </Step>

        <Step height="400vh">
          {(props) => <StepTwo {...props} />}
        </Step>

        <Step height="400vh">
          {(props) => <StepThree {...props} />}
        </Step>

        <div className="h-screen flex items-center justify-center">
          <p className="text-2xl">End of demo - scroll back up!</p>
        </div>
      </div>
    </div>
  );
}
