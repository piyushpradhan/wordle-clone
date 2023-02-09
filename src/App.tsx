import React, { useState, ChangeEvent } from "react";
import Keyboard from "./component/Keyboard";
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

  const isGameOver = appContext?.appState.gameState !== "playing";

  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-black/40 pb-2 my-2">
        <h1 className="text-4xl text-center">Wordle clone</h1>
      </header>

      <main className="grid grid-rows-6 gap-4">
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
          className="absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded-lg border-2 border-gray-500 text-center"
        >
          Game over!
          <p>The answer was: {appContext?.appState.answer}</p>
          <button
            className="block border rounded bg-green-500 p-2 mt-4 mx-auto"
            onClick={startNewGame}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
