/**
 * @file Sidebar.jsx
 * @description Navigation component displaying the 4 steps of the multi-step form with progress tracking.
 *
 * Key Functionality:
 * - Displays step buttons (1-4) with visual indicators for current and completed steps
 * - Enables step navigation with conditional access based on progress
 * - Responsive design: Hidden labels on mobile, full labels on desktop
 * - Background images: Mobile (portrait SVG) and desktop (landscape SVG) versions
 *
 * Complex Actions:
 * - Access Control: Each step button has conditional onClick handlers that check the progress value:
 *   - Step 1: Can navigate if progress > 1 (completed step 1)
 *   - Step 2: Can navigate if progress >= 2 (completed step 2)
 *   - Step 3: Can navigate if progress >= 3 (completed step 3)
 *   - Step 4: Can navigate if progress > 3 (completed step 3)
 *   - All steps disabled when step === 5 (form submitted)
 * - Visual Styling: Step buttons change color based on current step (active: bg-blue-300, inactive: bg-gray-500/40)
 * - Accessibility: aria-current="step" marks active step, step labels available for screen readers
 */

import React from "react";
import { useFormContext } from "../context/FormContext.jsx";

export const Sidebar = () => {
  const { step, setStep, progress } = useFormContext();
  return (
    <nav
      className="flex absolute uppercase text-white bg-[url(/bg-sidebar-mobile.svg)] w-full h-25/100 inset-x-0 bg-no-repeat bg-center bg-cover shadow-lg z-0 
                    md:relative md:bg-[url(/bg-sidebar-desktop.svg)] md:h-full md:w-3/10 md:rounded-xl md:z-5"
      aria-label="Form steps navigation"
    >
      <div
        className="p-8 2xl:p-10 flex items-start justify-center w-full gap-5 
                      md:flex-col md:justify-normal"
      >
        <div className="flex gap-5 items-center">
          <button
            disabled={step === 5}
            onClick={() => {
              progress > 1 && setStep(1);
            }}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 1 ? "bg-blue-300 text-blue-950" : "bg-gray-500/40 text-gray-200"}`}
            aria-current={step === 1 ? "step" : undefined}
            aria-label="Step 1: Your Info"
          >
            <span aria-hidden="true">1</span>
          </button>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 1</p>
            <h2 className="text-lg font-semibold text-nowrap">Your Info</h2>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <button
            onClick={() => {
              progress >= 2 && setStep(2);
            }}
            disabled={step === 5}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 2 ? "bg-blue-300 text-blue-950" : "bg-gray-500/40 text-gray-200"}`}
            aria-current={step === 2 ? "step" : undefined}
            aria-label="Step 2: Select Plan"
          >
            <span aria-hidden="true">2</span>
          </button>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 2</p>
            <h2 className="text-lg font-semibold text-nowrap">Select Plan</h2>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <button
            disabled={step === 5}
            onClick={() => {
              progress >= 3 && setStep(3);
            }}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 3 ? "bg-blue-300 text-blue-950" : "bg-gray-500/40 text-gray-200"}`}
            aria-current={step === 3 ? "step" : undefined}
            aria-label="Step 3: Add-Ons"
          >
            <span aria-hidden="true">3</span>
          </button>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 3</p>
            <h2 className="text-lg font-semibold text-nowrap">Add-Ons</h2>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <button
            disabled={step === 5}
            onClick={() => {
              progress > 3 && setStep(4);
            }}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 4 ? "bg-blue-300 text-blue-950" : "bg-gray-500/40 text-gray-200"}`}
            aria-current={step === 4 ? "step" : undefined}
            aria-label="Step 4: Summary"
          >
            <span aria-hidden="true">4</span>
          </button>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 4</p>
            <h2 className="text-lg font-semibold text-nowrap">Summary</h2>
          </div>
        </div>
      </div>
    </nav>
  );
};
