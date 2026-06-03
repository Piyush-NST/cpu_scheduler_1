"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function NeonCursor() {
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailingXSpring = useSpring(cursorX, { damping: 40, stiffness: 200, mass: 1 });
  const trailingYSpring = useSpring(cursorY, { damping: 40, stiffness: 200, mass: 1 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 -ml-12 -mt-12 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: trailingXSpring,
          y: trailingYSpring,
          background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0) 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: "radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(6,182,212,0) 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: "#ffffff",
          boxShadow: "0 0 10px #06B6D4, 0 0 20px #06B6D4",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
