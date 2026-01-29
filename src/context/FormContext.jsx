/**
 * @file FormContext.jsx
 * @description Global form state management using React Context API.
 *
 * Key Functionality:
 * - Maintains form data across all 5 steps using a single state object
 * - Tracks current step (1-5) for navigation
 * - Tracks progress (1-5) for marking completed steps (affects sidebar button access)
 * - Provides price lookup tables for plans and add-ons
 *
 * State Structure:
 * - step: Current form page (1=personal info, 2=plan, 3=add-ons, 4=summary, 5=submitted)
 * - progress: Highest completed step (allows navigation only to completed or current step)
 * - formData: Object containing all user inputs and calculations
 *   - name, email, phone: User personal information
 *   - plan: Selected plan ID ("arcade", "advanced", "pro", or empty)
 *   - billing: "monthly" or "yearly"
 *   - onlineServices, largerStorage, customizableProfile: Boolean flags for selected add-ons
 *   - finalPrice: Calculated total (plan price + sum of selected addon prices)
 *
 * Complex Actions:
 * - Price Tables: planPrices object uses 2-level nesting for lookup:
 *   - planPrices[billing][planId] → returns price (e.g., planPrices["monthly"]["arcade"] = 9)
 * - Add-on Prices: addonPrices object uses 2-level nesting for lookup:
 *   - addonPrices[billing][addonKey] → returns price (e.g., addonPrices["yearly"]["onlineServices"] = 10)
 *   - All yearly prices are 10x the monthly price (e.g., $9/mo = $90/yr)
 * - Usage Pattern: Components access context via useFormContext() custom hook
 *   - Used for form field bindings, price calculations, and step navigation
 */

import React, { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

export function FormProvider({ children }) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    billing: "monthly",
    onlineServices: false,
    largerStorage: false,
    customizableProfile: false,
    finalPrice: 0,
  });

  const planPrices = {
    monthly: { arcade: 9, advanced: 12, pro: 15 },
    yearly: { arcade: 90, advanced: 120, pro: 150 },
  };

  const addonPrices = {
    monthly: {
      onlineServices: 1,
      largerStorage: 2,
      customizableProfile: 2,
    },
    yearly: {
      onlineServices: 10,
      largerStorage: 20,
      customizableProfile: 20,
    },
  };

  const value = {
    step,
    setStep,
    formData,
    setFormData,
    planPrices,
    addonPrices,
    progress,
    setProgress,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within a FormProvider");
  return context;
}

export default FormContext;
