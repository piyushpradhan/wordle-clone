import React, { useEffect, useState } from "react";
import { LETTER_LENGTH } from "../utils/constants";
import { isValidWord } from "../utils/helper";
import { useAppContext } from "./useAppContext";

const useGuess = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] => {
  const [guess, setGuess] = useState("");
  const appContext = useAppContext();

  function addGuessLetter(letter: string) {
    setGuess((currentGuess) => {
      const newGuess =
        letter.length === 1 && currentGuess.length !== LETTER_LENGTH
          ? currentGuess + letter
          : currentGuess;

      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === LETTER_LENGTH && isValidWord(newGuess)) {
            appContext?.addGuess(newGuess);
            return "";
          }
      }
      if (currentGuess.length === LETTER_LENGTH) return currentGuess;
      return newGuess;
    });
  }

  function onKeyDown(e: KeyboardEvent) {
    if (appContext?.appState.gameState === "playing") {
      const letter = e.key;
      addGuessLetter(letter);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return [guess, setGuess, addGuessLetter];
};

export default useGuess;
