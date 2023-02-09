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
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
