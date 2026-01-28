import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./layout/Footer.jsx";
import { FirstForm } from "./components/FirstForm";
import { SecondForm } from "./components/SecondForm";
import { ThirdForm } from "./components/ThirdForm.jsx";
import { FourthForm } from "./components/FourthForm.jsx";
import { useFormContext } from "./context/FormContext.jsx";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
function App() {
  const { step, setStep } = useFormContext();
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
      <nav className="z-0">{windowWidth < 756 && <Sidebar />}</nav>
      <main
        className="mx-auto my-auto w-95/100 min-h-7/10 max-h-7/10 bg-white p-5 rounded-2xl flex gap-10 shadow-xl z-10 
                       md:min-h-0 md:min-w-200 md:w-5/10 md:h-full 3xl:h-6/10 md:z-3"
      >
        {windowWidth > 756 && <Sidebar />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={
              !reduceMotion && windowWidth >= 756
                ? { opacity: 0, x: 20 }
                : { opacity: 0 }
            }
            animate={
              !reduceMotion && windowWidth >= 756
                ? { opacity: 1, x: 0 }
                : { opacity: 1 }
            }
            exit={
              !reduceMotion && windowWidth >= 756
                ? { opacity: 0, x: -20 }
                : { opacity: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : windowWidth >= 756 ? 0.3 : 0.18,
              ease: "easeOut",
            }}
            className="w-full"
          >
            {step === 1 && <FirstForm />}
            {step === 2 && <SecondForm />}
            {step === 3 && <ThirdForm />}
            {step === 4 && <FourthForm />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
