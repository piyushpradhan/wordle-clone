import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import { keyboardKeys, keyStateStyles, LetterState } from "../utils/constants";

type KeyboardProps = {
  onClick: (key: string) => void;
};

const Keyboard = ({ onClick }: KeyboardProps) => {
  const appContext = useAppContext();
  const keyboardLetterState = appContext?.appState.keyboardState ?? {};
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { textContent, innerHTML } = e.currentTarget;

    let returnProps: string = textContent ?? "";
    if (textContent !== innerHTML) {
      returnProps = "Backspace";
    }

    e.currentTarget.blur();
    onClick(returnProps);
  };

  return (
    <div className={`flex flex-col`}>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div
          key={rowIndex}
          className="my-1 md:my-2 flex justify-center space-x-1"
        >
          {keyboardRow.map((key, index) => {
            let styles =
              "rounded font-bold uppercase flex-1 py-1 md:py-2 md:text-lg text-sm";

            const letterState = keyStateStyles[keyboardLetterState[key]];

            if (letterState) {
              styles += " text-white px-1 " + letterState;
            } else if (key !== "") {
              styles += " bg-gray-400";
            }

            if (key === "") {
              styles += " pointer-events-none";
            } else {
              styles += " px-1";
            }

            return (
              <button
                onClick={handleClick}
                key={key + index}
                className={styles}
              >
                {key === "delete" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                    ></path>
                  </svg>
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
