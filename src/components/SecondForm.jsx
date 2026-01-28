/**
 * @file SecondForm.jsx
 * @description Step 2 form component for selecting a subscription plan (Arcade/Advanced/Pro).
 *
 * Key Functionality:
 * - Displays 3 plan options with dynamic pricing based on billing period (monthly/yearly)
 * - Includes a billing toggle switch (Monthly ↔ Yearly)
 * - Updates total price when plan is selected or billing period changes
 * - Includes "2 months free" badge for yearly billing
 *
 * Complex Actions:
 * - Dynamic Price Calculation: When plan selection or billing period changes:
 *   1. Calculates base price from planPrices object based on selected plan and billing
 *   2. Iterates through all addon keys and sums their prices if selected
 *   3. Updates finalPrice = planBase + addonsTotal
 *   - This allows price changes to cascade when returning from later steps with add-ons selected
 * - Billing Toggle: Changes all displayed prices and recalculates total to reflect monthly/yearly rates
 *   - Prices are 10x higher for yearly (e.g., $9/mo = $90/yr)
 * - Navigation: Advancing to Step 3 increments both step AND progress (marks step 2 as completed)
 */

import React from "react";
import { useFormContext } from "../context/FormContext.jsx";

export const SecondForm = () => {
  const {
    step,
    setStep,
    progress,
    setProgress,
    formData,
    setFormData,
    addonPrices,
    planPrices,
  } = useFormContext();

  const options = [
    {
      id: "arcade",
      title: "Arcade",
      icon: "/icon-arcade.svg",
      price: formData.billing === "monthly" ? "$9/mo" : "$90/yr",
      priceInt: formData.billing === "monthly" ? 9 : 90,
    },
    {
      id: "advanced",
      title: "Advanced",
      icon: "/icon-advanced.svg",
      price: formData.billing === "monthly" ? "$12/mo" : "$120/yr",
      priceInt: formData.billing === "monthly" ? 12 : 120,
    },
    {
      id: "pro",
      title: "Pro",
      icon: "/icon-pro.svg",
      price: formData.billing === "monthly" ? "$15/mo" : "$150/yr",
      priceInt: formData.billing === "monthly" ? 15 : 150,
    },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(step + 1);
        setProgress(progress + 1);
      }}
      className="mx-auto my-auto flex flex-col h-full w-full place-content-between md:p-5 2xl:p-15 3xl:p-25"
      aria-label="Step 2: Select Plan"
    >
      <div className="flex flex-col place-content-between md:place-content-center-safe gap-2 md:gap-8 h-full">
        {/* Heading section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-start text-2xl md:text-3xl font-bold">
            Select your plan
          </h1>
          <p className="text-gray-400 font-semibold" id="billing-description">
            You have the option of monthly or yearly billing.
          </p>
        </div>
        {/* Radio section */}
        <fieldset
          className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 w-full"
          aria-describedby="billing-description"
        >
          <legend className="sr-only">Plan selection</legend>
          {options.map((option) => (
            <label key={option.id} className="block cursor-pointer">
              <input
                type="radio"
                name="plan"
                value={option.id}
                required
                className="peer sr-only"
                checked={formData.plan === option.id}
                onChange={() => {
                  const newPlan = option.id;
                  setFormData((prev) => {
                    const planBase = planPrices[prev.billing][newPlan] ?? 0;
                    let addonsTotal = 0;
                    for (const key of Object.keys(addonPrices[prev.billing])) {
                      if (prev[key]) {
                        addonsTotal += addonPrices[prev.billing][key];
                      }
                    }
                    return {
                      ...prev,
                      plan: newPlan,
                      finalPrice: planBase + addonsTotal,
                    };
                  });
                }}
              />
              <div
                className="md:border-2 border border-gray-400 rounded-lg md:rounded-xl transition-all hover:scale-102 h-full gap-3 p-2 md:p-4
              flex md:flex-col md:gap-5 md:place-content-between
                peer-checked:border-blue-900 peer-checked:ring-1 peer-checked:ring-blue-950"
              >
                <div>
                  <img src={option.icon} alt={`${option.id} icon`} />
                </div>
                <div className="flex flex-col place-self-start">
                  <span className="  md:text-lg font-semibold">
                    {option.title}
                  </span>
                  <span className=" text-sm md:text-sm font-semibold text-gray-400">
                    {option.price}
                  </span>
                  {formData.billing === "yearly" && (
                    <span className="text-xs font-semibold text-blue-900">
                      2 months free
                    </span>
                  )}
                </div>
              </div>
            </label>
          ))}
        </fieldset>
        <div />
        <div className="bg-gray-100 rounded-lg gap-4 md:gap-6 flex items-center justify-center p-3 md:p-4">
          <span
            className={`${formData.billing === "monthly" && "text-slate-800"} text-gray-400 font-semibold`}
            aria-label={
              formData.billing === "monthly"
                ? "Monthly billing selected"
                : "Monthly billing"
            }
          >
            Monthly
          </span>
          <div className="relative inline-block w-11 h-5">
            <input
              id="switch-component"
              type="checkbox"
              aria-label="Toggle between monthly and yearly billing"
              aria-checked={formData.billing === "yearly"}
              checked={formData.billing === "yearly"}
              onChange={(e) => {
                const checked = e.target.checked;
                const newBilling = checked ? "yearly" : "monthly";

                setFormData((prev) => {
                  const planBase = planPrices[newBilling][prev.plan] ?? 0;
                  let addonsTotal = 0;
                  for (const key of Object.keys(addonPrices[newBilling])) {
                    if (prev[key]) {
                      addonsTotal += addonPrices[newBilling][key];
                    }
                  }
                  return {
                    ...prev,
                    billing: newBilling,
                    finalPrice: planBase + addonsTotal,
                  };
                });
              }}
              className="peer appearance-none w-11 h-5  rounded-full bg-slate-800 cursor-pointer transition-colors duration-300"
            />
            <label
              htmlFor="switch-component"
              className="absolute top-0 left-0 w-5 h-5 scale-60 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6  cursor-pointer"
            ></label>
          </div>
          <span
            className={`${formData.billing === "yearly" && "text-slate-800"} text-gray-400 font-semibold`}
            aria-label={
              formData.billing === "yearly"
                ? "Yearly billing selected"
                : "Yearly billing"
            }
          >
            Yearly
          </span>
        </div>
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
        >
          Next Step
        </button>
      </div>
    </form>
  );
};
