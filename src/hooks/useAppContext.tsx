import React, { createContext, ReactNode, useContext, useState } from "react";
import { getRandomWord } from "../utils/helper";

type AppContextType = {
  appState: AppStateType;
  addGuess: (guess: string) => void;
  startNewGame: () => void;
  setGuesses: (guesses: string[]) => void;
};

type AppStateType = {
  answer: string;
  guesses: string[];
};

const initialState: AppStateType = {
  answer: getRandomWord(),
  guesses: [],
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppStateType>(initialState);

  function addGuess(guess: string) {
    setAppState((prevState) => ({
      ...prevState,
      guesses: [...prevState.guesses, guess],
    }));
  }

  function startNewGame() {
    setAppState(initialState);
  }

  function setGuesses(guesses: string[]) {
    setAppState((prevState) => ({
      ...prevState,
      guesses: guesses,
    }));
  }

  return (
    <AppContext.Provider
      value={{
        appState,
        addGuess,
        startNewGame,
        setGuesses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
