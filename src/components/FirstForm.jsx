/**
 * @file FirstForm.jsx
 * @description Step 1 form component for collecting personal information (name, email, phone).
 *
 * Key Functionality:
 * - Collects user's personal details: name, email address, and phone number
 * - All fields are required for form submission
 * - Uses real-time form state updates via context
 * - Submits and advances to Step 2 when all fields are valid
 *
 * Complex Actions:
 * - Controlled Inputs: All inputs are controlled components that update the shared FormContext state
 *   - onChange handlers destructure formData and update only the relevant field
 *   - Pattern: setFormData({ ...formData, [fieldName]: e.target.value })
 * - Form Validation: HTML5 native validation (required, type="email", type="tel")
 * - Navigation: Form submission increments step from 1 to 2 without modifying progress (allows back navigation)
 */

import React from "react";
import { useFormContext } from "../context/FormContext.jsx";

export const FirstForm = () => {
  const { step, setStep, formData, setFormData } = useFormContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(step + 1);
      }}
      className="mx-auto my-auto flex flex-col h-full w-full place-content-between md:gap-10 2xl:p-15 3xl:p-25"
      aria-label="Step 1: Personal Information"
    >
      <div className=" gap-5 2xl:gap-10 flex flex-col">
        <div className="flex flex-col gap-3">
          <h1 className="uppercase text-2xl md:text-3xl font-bold">
            Personal Info
          </h1>
          <p
            className="text-gray-400 text-lg font-semibold"
            id="personal-info-description"
          >
            Please provide your name, email address, and phone number.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            required
            id="name"
            value={formData.name}
            placeholder="e.g. Stephen King"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-2 font-semibold border-gray-400 text-gray-500 rounded-lg text-xl p-2 px-4 w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email Adress
          </label>
          <input
            type="email"
            required
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="e.g. stephenking@lorem.com"
            className="border-2 border-gray-400 text-gray-500 font-semibold rounded-lg text-xl p-2 px-4 w-full outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="font-semibold">
            Phone Number
          </label>
          <input
            type="tel"
            required
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="e.g. 1 234 567 890"
            className="border-2 border-gray-400 text-gray-500 font-semibold rounded-lg text-xl p-2 px-4 w-full outline-none"
          />
        </div>
      </div>

      <div
        className="flex justify-end absolute bottom-0 bg-white w-full inset-x-0 p-3 px-5
                         md:relative md:inset-auto md:p-0 md:px-0 md:w-auto "
      >
        <button
          type="submit"
          className="bg-blue-950 text-white w-fit p-3 rounded-lg self-end px-7 font-semibold"
          aria-label="Proceed to next step: Select Plan"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};
