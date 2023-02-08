import React, { createContext, ReactNode, useContext, useState } from "react";
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
};

const initialState: AppStateType = {
  answer: getRandomWord(),
  rows: [],
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppStateType>(initialState);

  function addGuess(guess: string) {
    setAppState((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, { guess, result: computeGuess(guess) }],
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
