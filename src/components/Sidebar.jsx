import React from "react";
import { useFormContext } from "../context/FormContext.jsx";

export const Sidebar = () => {
  const { step, setStep, progress } = useFormContext();
  return (
    <div className="flex absolute uppercase text-white bg-[url(/bg-sidebar-mobile.svg)] w-full h-25/100 inset-x-0 bg-no-repeat bg-center bg-cover shadow-lg z-0 
                    md:relative md:bg-[url(/bg-sidebar-desktop.svg)] md:h-full md:w-3/10 md:rounded-xl md:z-5 ">
      <div className="p-8 2xl:p-10 flex items-start justify-center w-full gap-5 
                      md:flex-col md:justify-normal">
        <div className="flex gap-5 items-center">
          <div
          
            onClick={() =>{ progress > 1 && setStep(1)}}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 1 ? "bg-blue-900 text-white" : "bg-gray-500/40 text-gray-200"}`}
          >
            <span>1</span>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 1</p>
            <h2 className="text-lg font-semibold ">Your Info</h2>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div
          onClick={() =>{ progress >= 2 && setStep(2)}}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 2 ? "bg-blue-900 text-white" : "bg-gray-500/40 text-gray-200"}`}
          >
            <span>2</span>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 2</p>
            <h2 className="text-lg font-semibold">Select Plan</h2>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div
          onClick={() =>{ progress >= 3 && setStep(3)}}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 3 ? "bg-blue-900 text-white" : "bg-gray-500/40 text-gray-200"}`}
          >
            <span>3</span>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 3</p>
            <h2 className="text-lg font-semibold">Add-Ons</h2>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div
          onClick={() =>{ progress > 3 && setStep(4)}}
            className={`cursor-pointer flex rounded-full h-8 w-8 items-center justify-center border ${step === 4 ? "bg-blue-900 text-white" : "bg-gray-500/40 text-gray-200"}`}
          >
            <span>4</span>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-300">Step 4</p>
            <h2 className="text-lg font-semibold">Summary</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
