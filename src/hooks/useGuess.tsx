import React, { useEffect, useState } from "react";
import { LETTER_LENGTH } from "../utils/constants";
import { useAppContext } from "./useAppContext";

const useGuess = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [guess, setGuess] = useState("");
  const appContext = useAppContext();

  function onKeyDown(e: KeyboardEvent) {
    const letter = e.key;
    setGuess((currentGuess) => {
      const newGuess =
        letter.length === 1 ? currentGuess + letter : currentGuess;
      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === LETTER_LENGTH) {
            appContext?.addGuess(newGuess);
            return "";
          }
      }
      if (currentGuess.length === LETTER_LENGTH) return currentGuess;
      return newGuess;
    });
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return [guess, setGuess];
};

export default useGuess;
