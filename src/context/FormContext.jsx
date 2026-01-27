import React, { createContext, useContext, useState } from "react";

// Minimaler Form-Kontext (Grundgerüst)
const FormContext = createContext(null);

export function FormProvider({ children }) {
  const [step, setStep] = useState(2);
  const [progress, setProgress] = useState(2);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    billing: "monthly",
    onlineServices: false,
    largerStorage: false,
    cusomizableProfile: false,
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
      cusomizableProfile: 2,
    },
    yearly: {
      onlineServices: 10,
      largerStorage: 20,
      cusomizableProfile: 20,
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
    setProgress
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
