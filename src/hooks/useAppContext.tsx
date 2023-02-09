import React, { createContext, ReactNode, useContext, useState } from "react";
import { GUESS_LENGTH, LetterState } from "../utils/constants";
import { computeGuess, getRandomWord } from "../utils/helper";

type GuessRow = {
  guess: string;
  result?: string[];
};

type AppContextType = {
  appState: AppStateType;
  addGuess: (guess: string) => void;
  startNewGame: () => void;
};

type AppStateType = {
  answer: string;
  rows: GuessRow[];
  gameState: "playing" | "won" | "lost";
  keyboardState: { [letter: string]: string };
};

const initialState: AppStateType = {
  answer: getRandomWord(),
  rows: [],
  gameState: "playing",
  keyboardState: {},
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppStateType>(initialState);

  function addGuess(guess: string) {
    const result = computeGuess(guess, appState.answer);
    const didWin = result.every((i) => i === LetterState.MATCH);
    const rows = [...appState.rows, { guess, result }];
    const keyboardLetterState = appState.keyboardState;
    result.forEach((res, index) => {
      const resultGuessLetter = guess[index];
      const currentLetterState = keyboardLetterState[resultGuessLetter];
      switch (currentLetterState) {
        case LetterState.MATCH:
          break;
        case LetterState.PRESENT:
          if (res === LetterState.MISS) {
            break;
          }
        // eslint-disable-next-line no-fallthrough
        // let it fall through if it doesn't miss
        default:
          keyboardLetterState[resultGuessLetter] = res;
          break;
      }
    });
    setAppState((prevState) => ({
      ...prevState,
      rows: rows,
      gameState: didWin
        ? "won"
        : rows.length !== GUESS_LENGTH
        ? "playing"
        : "lost",
      keyboardState: keyboardLetterState,
    }));
  }

  function startNewGame() {
    setAppState((prevState) => ({
      ...initialState,
      answer: getRandomWord(),
      keyboardState: {},
    }));
  }

  return (
    <AppContext.Provider
      value={{
        appState,
        addGuess,
        startNewGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
