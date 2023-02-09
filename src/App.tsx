import React, { useState, ChangeEvent } from "react";
import Keyboard from "./component/Keyboard";
import ToggleSwitch from "./component/ToggleSwitch";
import WordRow from "./component/WordRow";
import { useAppContext } from "./hooks/useAppContext";
import useGuess from "./hooks/useGuess";
import { GUESS_LENGTH, LETTER_LENGTH } from "./utils/constants";
import { computeGuess } from "./utils/helper";

function App() {
  const [guess, setGuess, addGuessLetter] = useGuess();
  const appContext = useAppContext();

  let rows = [...(appContext?.appState.rows ?? [])];

  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess });
  }
  const remainingGuessCount = GUESS_LENGTH - rows.length;
  rows = rows.concat(Array(remainingGuessCount).fill(""));

  function updateGuess(e: ChangeEvent<HTMLInputElement>) {
    const newGuess = e.target.value;
    if (newGuess.length === LETTER_LENGTH) {
      appContext?.addGuess(newGuess);
      setGuess("");
      return;
    }

    setGuess(newGuess);
  }

  function startNewGame() {
    appContext?.startNewGame();
    setGuess("");
  }

  function onKeyboardClick(key: string) {
    addGuessLetter(key);
  }

  function toggleMode() {
    appContext?.toggleMode();
  }

  const isGameOver = appContext?.appState.gameState !== "playing";

  return (
    <div
      className={`w-screen h-screen absolute ${
        appContext?.appState.mode === "dark" && "dark bg-gray-900"
      }`}
    >
      <ToggleSwitch />

      <div className="mx-auto w-64 sm:w-80 md:w-96 relative my-4">
        <header className="border-b border-black/40 dark:border-white/25 pb-2 my-2">
          <h1 className="dark:text-white text-black py-2 md:py-4 text-3xl md:text-4xl font-bold uppercase text-center">
            Wordle
          </h1>
        </header>

        <main className="grid grid-rows-6 gap-2 md:gap-4 py-4">
          {rows.map((word, index) => {
            return (
              <WordRow
                key={`${word}-${index}`}
                letters={word.guess}
                result={word.result ?? []}
              />
            );
          })}
        </main>

        <Keyboard onClick={onKeyboardClick} />

        {isGameOver && (
          <div
            role="modal"
            className="absolute bg-white dark:border-white/75 dark:bg-gray-900 dark:text-white left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded-lg border-2 border-gray-500 text-center"
          >
            <p className="py-2 font-bold uppercase text-2xl">Game over!</p>
            <p>
              The word was: <strong>{appContext?.appState.answer}</strong>
            </p>
            <button
              className="block px-4 text-white border rounded bg-green-600 font-bold py-2 mt-4 mx-auto border-none outline-none"
              onClick={startNewGame}
            >
              New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
