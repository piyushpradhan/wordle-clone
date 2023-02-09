import React from "react";
import { useAppContext } from "../hooks/useAppContext";

function ToggleSwitch() {
  const appContext = useAppContext();
  function toggleMode() {
    appContext?.toggleMode();
  }
  return (
    <div className="absolute top-8 md:top-4 right-4 md:right-8 flex flex-row space-x-1">
      <div className="relative cursor-pointer" onClick={toggleMode}>
        <div
          className={`absolute rounded-full z-10 dark:bg-white bg-gray-900 w-5 h-5 top-0.5 left-0.5 transition-all duration-200 ease-in-out ${
            appContext?.appState.mode === "dark" && "translate-x-6"
          }`}
        ></div>
        <div className="z-0 bg-gray-200 dark:bg-white/25 w-12 h-6 rounded-full"></div>
      </div>
      <p className="w-8 hidden md:block font-bold dark:text-white">
        {appContext?.appState.mode === "dark" ? "Dark" : "Light"}
      </p>
    </div>
  );
}

export default ToggleSwitch;
