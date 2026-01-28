/**
 * @file ThirdForm.jsx
 * @description Step 3 form component for selecting optional add-ons (Online Service, Larger Storage, Customizable Profile).
 *
 * Key Functionality:
 * - Displays 3 optional add-ons as checkboxes with dynamic pricing
 * - Prices update based on selected billing period (monthly/yearly)
 * - Updates total price when add-ons are toggled
 * - Allows multiple add-ons to be selected
 *
 * Complex Actions:
 * - Price Recalculation on Addon Toggle: When a checkbox is toggled:
 *   1. Determines if the addon is being toggled on or off
 *   2. Iterates through all addon keys using reduce() to sum prices
 *   3. For each addon, checks: if it's the current toggle key, use the new toggle state; else use current state
 *   4. Updates finalPrice = planBase + new addonsTotal
 *   - This complex logic ensures correct price calculation regardless of which addon is being toggled
 * - Visual Feedback: Selected add-ons highlight with bg-blue-900/10 and blue border + ring effect
 * - Navigation: Advancing to Step 4 increments both step AND progress (marks step 3 as completed)
 */

import React from "react";
import { useFormContext } from "../context/FormContext.jsx";

export const ThirdForm = () => {
  const {
    step,
    setStep,
    progress,
    setProgress,
    formData,
    setFormData,
    planPrices,
    addonPrices,
  } = useFormContext();

  const options = [
    {
      key: "onlineServices",
      service: "Online service",
      benefit: "Access to multiplayer games",
      price: formData.billing === "monthly" ? "$1/mo" : "$10/yr",
      priceInt: formData.billing === "monthly" ? 1 : 10,
    },
    {
      key: "largerStorage",
      service: "Larger storage",
      benefit: "Extra 1TB of cloud save",
      price: formData.billing === "monthly" ? "$2/mo" : "$20/yr",
      priceInt: formData.billing === "monthly" ? 2 : 20,
    },
    {
      key: "cusomizableProfile",
      service: "Customizable profile",
      benefit: "Custom theme on your profile",
      price: formData.billing === "monthly" ? "$2/mo" : "$20/yr",
      priceInt: formData.billing === "monthly" ? 2 : 20,
    },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(step + 1);
        setProgress(progress + 1);
      }}
      className="mx-auto my-auto flex flex-col h-full w-full place-content-between md:p-15 3xl:p-25"
      aria-label="Step 3: Add-Ons Selection"
    >
      <div className=" gap-5 md:gap-10 flex flex-col">
        <div className="flex flex-col gap-3">
          <h1 className="uppercase text-2xl md:text-3xl font-bold">
            Pick add-ons
          </h1>
          <p
            className="text-gray-400 text-lg font-semibold"
            id="addons-description"
          >
            Add-ons help enhance your gaming experience.
          </p>
        </div>

        <fieldset
          className="flex flex-col gap-5"
          aria-describedby="addons-description"
        >
          <legend className="sr-only">Available add-ons</legend>
          {options.map((option) => (
            <label
              htmlFor={option.service}
              className="block cursor-pointer hover:scale-102"
              key={option.key}
            >
              <div>
                <div
                  className={
                    "border border-gray-400 rounded-lg w-full p-2 md:p-5 flex items-center justify-between  " +
                    (formData[option.key]
                      ? "bg-blue-900/10 border-blue-900 ring-2 ring-blue-900/50"
                      : "")
                  }
                >
                  <div className="flex items-center gap-5">
                    <input
                      type="checkbox"
                      name={option.service}
                      id={option.service}
                      className="scale-150"
                      checked={!!formData[option.key]}
                      onChange={() =>
                        setFormData((prev) => {
                          const toggled = !prev[option.key];
                          const addonsTotal = Object.keys(
                            addonPrices[prev.billing],
                          ).reduce((sum, key) => {
                            let isSelected;
                            if (key === option.key) {
                              isSelected = toggled;
                            } else {
                              isSelected = !!prev[key];
                            }

                            if (isSelected) {
                              return sum + addonPrices[prev.billing][key];
                            } else {
                              return sum;
                            }
                          }, 0);
                          const planBase =
                            planPrices[prev.billing][prev.plan] ?? 0;
                          const finalPrice = Math.max(
                            0,
                            planBase + addonsTotal,
                          );
                          return { ...prev, [option.key]: toggled, finalPrice };
                        })
                      }
                    />
                    <div className="text-start">
                      <h2 className="md:text-lg font-semibold">
                        {option.service}
                      </h2>
                      <span
                        className={
                          " text-sm md:text-sm font-semibold text-gray-400 "
                        }
                      >
                        {option.benefit}
                      </span>
                    </div>
                  </div>
                  <span>{option.price}</span>
                </div>
              </div>
            </label>
          ))}
        </fieldset>
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
          aria-label="Go back to previous step"
        >
          Go Back
        </button>
        <button
          type="submit"
          className="bg-blue-950 text-white w-fit p-3 rounded-lg self-end px-7 font-semibold"
          aria-label="Proceed to next step: Order Summary"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};
