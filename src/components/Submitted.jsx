/**
 * @file Submitted.jsx
 * @description Step 5 component displaying the success/confirmation message after form submission.
 *
 * Key Functionality:
 * - Shows thank you message with checkmark icon
 * - Displays confirmation text explaining next steps
 * - Uses animated entrance with fade + vertical slide effect
 * - Marks the final step in the form flow
 *
 * Complex Actions:
 * - Motion Animation: Entry animation uses motion library with custom spring physics:
 *   - initial: { opacity: 0, y: -100 } (starts transparent, above viewport)
 *   - animate: { opacity: 1, y: 0 } (fades in while sliding down)
 *   - transition: spring physics with bounce=0.5, damping=9 (smooth, slight bounce effect)
 *   - Duration: 0.8s with 0.2s delay for staggered appearance
 * - Accessibility: role="status" with aria-live="polite" announces success to screen readers
 *   - aria-atomic="true" ensures entire message is read when announced
 */

import React from "react";
import { AnimatePresence, motion, spring } from "motion/react";

export const Submitted = () => {
  return (
    <AnimatePresence>
      <div
        className="mx-auto my-auto flex flex-col h-full w-full place-content-center md:p-15 3xl:p-25"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <motion.div
          className=" text-center grid gap-5"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: spring,
            bounce: 0.5,
            damping: 9,
          }}
        >
          <motion.img
            src="/icon-thank-you.svg"
            className="mx-auto"
            alt="Checkmark icon indicating successful submission"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: spring,
              bounce: 0.5,
              damping: 9,
            }}
          ></motion.img>
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
