import React, { useState, ChangeEvent } from "react";
import WordRow from "./component/WordRow";
import { useAppContext } from "./hooks/useAppContext";
import { GUESS_LENGTH, LETTER_LENGTH } from "./utils/constants";
import { computeGuess } from "./utils/helper";

function App() {
  const [guess, setGuess] = useState<string>("");
  const appContext = useAppContext();

  let rows = [...(appContext?.appState.rows ?? [])];

  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess, result: computeGuess(guess) });
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

  const isGameOver = appContext?.appState.rows.length === GUESS_LENGTH;

  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-black/40 pb-2 my-2">
        <h1 className="text-4xl text-center">Wordle clone</h1>

        <div>
          <input
            type="text"
            className="w-1/2 p-2 border-2 border-gray-500"
            value={guess}
            onChange={updateGuess}
          />
        </div>
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

      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded-lg border-2 border-gray-500 text-center"
        >
          Game over!
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
