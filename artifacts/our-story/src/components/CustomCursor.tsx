import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main cursor snaps instantly
  const mainX = useSpring(cursorX, { stiffness: 1000, damping: 60 });
  const mainY = useSpring(cursorY, { stiffness: 1000, damping: 60 });

  // Trailing dot lags behind
  const trailX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 22 });

  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const update = () => {
      cursorX.set(posRef.current.x);
      cursorY.set(posRef.current.y);
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // don't show on touch/mobile
  }

  return (
    <>
      {/* Trailing glow dot */}
      <motion.div
        style={{ x: trailX, y: trailY, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: clicking ? 2.5 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-8 h-8 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(233,105,142,0.25) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Main heart cursor */}
      <motion.div
        style={{ x: mainX, y: mainY, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: clicking ? 0.75 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 0 6px rgba(233,105,142,0.9))" }}
          >
            <path
              d="M11 18.5C11 18.5 1.5 12.5 1.5 6.5C1.5 3.46 3.96 1 7 1C8.96 1 10.68 2.04 11 3C11.32 2.04 13.04 1 15 1C18.04 1 20.5 3.46 20.5 6.5C20.5 12.5 11 18.5 11 18.5Z"
              fill="hsl(345 70% 65%)"
              stroke="hsl(345 80% 75%)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
