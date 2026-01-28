import React from "react";
import { AnimatePresence, motion, spring } from "motion/react";

export const Submitted = () => {
  return (
    <AnimatePresence>
      <div className="mx-auto my-auto flex flex-col h-full w-full place-content-center md:p-15 3xl:p-25">
        <motion.div className=" text-center grid gap-5"
         initial={{opacity: 0, y: -100}}
         animate={{opacity: 1, y: 0}}
         exit={{opacity: 0, y: -50}}
         transition={{duration: 0.8,delay: 0.2, type: spring, bounce: 0.5, damping: 9}}
         
        >
          <img src="/icon-thank-you.svg" className="mx-auto" alt="" />
          <h2 className="text-blue-950 text-4xl font-bold">Thank you!</h2>
          <span className="text-gray-400 text-[17px] font-semibold">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. IF you ever need support, please feel free to email us
            at support@loremgaming.com
          </span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
