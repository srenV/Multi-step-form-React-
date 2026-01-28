/**
 * @file FourthForm.jsx
 * @description Step 4 form component for reviewing the complete order summary before submission.
 *
 * Key Functionality:
 * - Displays selected plan with billing period and price
 * - Lists all selected add-ons with individual prices
 * - Shows total price calculation (plan + all add-ons)
 * - Provides "Change" links to navigate back to previous steps to modify selections
 * - Uses <details> elements for collapsible sections that expand to show change options
 *
 * Complex Actions:
 * - Conditional Rendering: Add-ons only display in summary if they are selected (formData[addon] === true)
 *   - Uses individual conditions: formData.onlineServices &&, formData.largerStorage &&, etc.
 * - Dynamic Details Sections: Each item uses <details> elements with state-dependent styling:
 *   - group-open: Applies styles when section is expanded (bold text, animation)
 *   - group-open:animate-fade-in: Smooth fade animation for "Change" button
 * - Navigation: "Change" buttons set step to specific values (1, 2, or 3) without modifying progress
 *   - Allows user to modify selections while maintaining "completed" status for sidebar
 * - Final Submission: Submitting advances to Step 5 and increments progress (marks form as submitted)
 */

import React from "react";
import { useFormContext } from "../context/FormContext.jsx";

export const FourthForm = () => {
  const {
    step,
    setStep,
    progress,
    setProgress,
    formData,
    addonPrices,
    planPrices,
  } = useFormContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(step + 1);
        setProgress(progress + 1);
      }}
      className="mx-auto my-auto flex flex-col h-full w-full place-content-between md:p-5 2xl:p-15 3xl:p-25"
      aria-label="Step 4: Order Summary and Confirmation"
    >
      {/* Heading section */}
      <div className="flex flex-col gap-3">
        <h1 className="uppercase text-2xl md:text-3xl font-bold">
          Finishing up
        </h1>
        <p
          className="text-gray-400 text-lg font-semibold"
          id="summary-description"
        >
          Double-check everything look OK before confirming.
        </p>
      </div>

      {/* Main section */}
      <div
        className="bg-blue-800/20 rounded-lg flex flex-col gap-10 md:gap-5 p-3 overflow-scroll"
        role="region"
        aria-labelledby="summary-description"
        aria-label="Order summary"
      >
        <div className="flex gap-1 flex-col ">
          <details className="group md:p-2 cursor-pointer">
            <summary className=" list-none flex items-center justify-between group-open:font-bold ">
              <div className="capitalize text-gray-500 group-open:text-blue-900 ">
                {formData.plan} ({formData.billing})
              </div>
              <span className="group-open:translate-y-2 text-blue-900 font-semibold">
                +${planPrices[formData.billing]?.[formData.plan] || 0}
                {formData.billing === "monthly" ? "/mo" : "/yr"}
              </span>
            </summary>
            <div className=" group-open:animate-fade-in flex flex-col gap-3">
              <button
                className="underline font-semibold text-gray-500 place-self-start"
                onClick={() => setStep(1)}
              >
                Change
              </button>
              <div className="group-open:border-b group-open:border-gray-400" />
            </div>
          </details>
        </div>

        {formData.onlineServices && (
          <div className="flex gap-1 flex-col ">
            <details className="group md:p-2 cursor-pointer">
              <summary className=" list-none flex items-center justify-between group-open:font-bold">
                <span className="text-gray-500 group-open:text-blue-900">
                  Online service
                </span>
                <span className="group-open:translate-y-2 text-blue-900 font-semibold">
                  +$
                  {formData.billing === "monthly"
                    ? addonPrices.monthly.onlineServices
                    : addonPrices.yearly.onlineServices}
                  /yr
                </span>
              </summary>
              <div className=" group-open:animate-fade-in flex flex-col gap-3">
                <button
                  className="underline font-semibold text-gray-500 place-self-start"
                  onClick={() => setStep(2)}
                >
                  Change
                </button>
                <div className="group-open:border-b group-open:border-gray-400" />
              </div>
            </details>
          </div>
        )}

        {formData.largerStorage && (
          <div className="flex gap-1 flex-col ">
            <details className="group md:p-2 cursor-pointer">
              <summary className="list-none flex items-center justify-between group-open:font-bold">
                <span className="text-gray-500 group-open:text-blue-900">
                  Larger storage
                </span>
                <span className="group-open:translate-y-2 text-blue-900 font-semibold">
                  +$
                  {formData.billing === "monthly"
                    ? addonPrices.monthly.largerStorage
                    : addonPrices.yearly.largerStorage}
                  /yr
                </span>
              </summary>
              <div className=" group-open:animate-fade-in flex flex-col gap-3">
                <button
                  className="underline font-semibold text-gray-500 place-self-start"
                  onClick={() => setStep(2)}
                >
                  Change
                </button>
                <div className="group-open:border-b group-open:border-gray-400" />
              </div>
            </details>
          </div>
        )}

        {formData.cusomizableProfile && (
          <div className="flex gap-1 flex-col ">
            <details className="group md:p-2 cursor-pointer">
              <summary className=" list-none flex items-center justify-between group-open:font-bold">
                <span className="text-gray-500 group-open:text-blue-900">
                  Cusomizable Profile
                </span>{" "}
                <span className="group-open:translate-y-2 text-blue-900 font-semibold">
                  {" "}
                  +$
                  {formData.billing === "monthly"
                    ? addonPrices.monthly.cusomizableProfile
                    : addonPrices.yearly.cusomizableProfile}
                  /yr
                </span>
              </summary>
              <div className=" group-open:animate-fade-in flex flex-col gap-3">
                <button
                  className="underline font-semibold text-gray-500 place-self-start"
                  onClick={() => setStep(2)}
                >
                  Change
                </button>
              </div>
            </details>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5">
        <h2 className="font-semibold text-gray-500">
          Total{" "}
          <span>
            {formData.billing === "monthly" ? "(per month)" : "(per year)"}
          </span>
        </h2>
        <strong className="text-xl text-blue-900 ">
          ${formData.finalPrice}
          {formData.billing === "monthly" ? "/mo" : "/yr"}
        </strong>
      </div>

      {/* Navigation section */}
      <div
        className="flex justify-between absolute bottom-0 bg-white w-full inset-x-0 p-3 px-5
                    md:relative md:inset-auto md:p-0 md:px-0 md:w-auto"
      >
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="font-semibold text-gray-400"
        >
          Go Back
        </button>
        <button
          type="submit"
          className="bg-blue-950 text-white w-fit p-3 rounded-lg self-end px-7 font-semibold"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
