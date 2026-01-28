/**
 * @file App.jsx
 * @description Root component for the multi-step form application.
 *
 * Key Functionality:
 * - Manages the main layout structure with responsive sidebar (mobile: top, desktop: left)
 * - Preloads critical assets (SVG images) to optimize performance
 * - Handles window resize detection to toggle sidebar visibility based on viewport width (756px breakpoint)
 * - Provides step-based form navigation with smooth animations
 * - Integrates motion library for entrance/exit animations with accessibility support (respects prefers-reduced-motion)
 *
 * Complex Actions:
 * - Animation Logic: Different animations apply based on window width and user's motion preferences:
 *   - Desktop (≥756px): Fade + horizontal slide (40px from right on entry, -40px to left on exit)
 *   - Mobile (<756px): Fade only (no slide movement for better mobile UX)
 *   - Respects prefers-reduced-motion: Disables all animations if user has motion reduction enabled
 * - Window Resize Handler: Tracks viewport width to conditionally render sidebar (mobile-only vs desktop-only)
 */

import { useState, useEffect } from "react";
import { preload } from "react-dom";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./layout/Footer.jsx";
import { FirstForm } from "./components/FirstForm";
import { SecondForm } from "./components/SecondForm";
import { ThirdForm } from "./components/ThirdForm.jsx";
import { FourthForm } from "./components/FourthForm.jsx";
import { Submitted } from "./components/Submitted.jsx";
import { useFormContext } from "./context/FormContext.jsx";
import {
  AnimatePresence,
  motion,
  spring,
  useReducedMotion,
} from "motion/react";

// Preload critical images immediately on app load
preload("/bg-sidebar-mobile.svg", { as: "image" });
preload("/bg-sidebar-desktop.svg", { as: "image" });
preload("/icon-thank-you.svg", { as: "image" });
preload("/icon-arcade.svg", { as: "image" });
preload("/icon-advanced.svg", { as: "image" });
preload("/icon-pro.svg", { as: "image" });
preload("/icon-checkmark.svg", { as: "image" });

function App() {
  const { step } = useFormContext();
  const reduceMotion = useReducedMotion();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-sky-200/50 h-svh  flex flex-col">
      {windowWidth < 756 && <Sidebar />}
      <main
        className="mx-auto my-auto w-95/100 min-h-7/10 max-h-7/10 bg-white p-5 rounded-2xl flex gap-10 shadow-xl z-10 
                       md:min-h-0 md:min-w-200 md:w-6/10 md:h-full 3xl:h-6/10 md:z-3"
        aria-label="Multi-step form"
      >
        {windowWidth > 756 && <Sidebar />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={
              !reduceMotion && windowWidth >= 756
                ? { opacity: 0, x: 40 }
                : { opacity: 0 }
            }
            animate={
              !reduceMotion && windowWidth >= 756
                ? { opacity: 1, x: 0 }
                : { opacity: 1 }
            }
            exit={
              !reduceMotion && windowWidth >= 756
                ? { opacity: 0, x: -40 }
                : { opacity: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : windowWidth >= 756 ? 0.4 : 0.3,
              ease: "easeOut",
              type: spring,
              bounce: 0.5,
            }}
            className="w-full"
          >
            {step === 1 && <FirstForm />}
            {step === 2 && <SecondForm />}
            {step === 3 && <ThirdForm />}
            {step === 4 && <FourthForm />}
            {step === 5 && <Submitted />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
