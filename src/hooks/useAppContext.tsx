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
};

const initialState: AppStateType = {
  answer: getRandomWord(),
  rows: [],
  gameState: "playing",
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppStateType>(initialState);

  function addGuess(guess: string) {
    const result = computeGuess(guess);
    const didWin = result.every((i) => i === LetterState.MATCH);
    const rows = [...appState.rows, { guess, result }];
    setAppState((prevState) => ({
      ...prevState,
      rows: rows,
      gameState: didWin
        ? "won"
        : rows.length !== GUESS_LENGTH
        ? "playing"
        : "lost",
    }));
  }

  function startNewGame() {
    setAppState(initialState);
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
