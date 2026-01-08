"use client";

import { ReactNode } from "react";

type StageProps = {
  children: ReactNode;
  className?: string;
};

export function Stage({ children, className = "" }: StageProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center pointer-events-none p-4 md:p-8 max-w-[90rem] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
