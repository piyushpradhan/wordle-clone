import React from "react";
import { computeGuess } from "../utils/helper";
import CharacterBox from "./CharacterBox";

const LETTER_LENGTH = 5;

type WordRowProps = {
  letters: string;
};

const WordRow = ({ letters = "" }: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - letters.length;
  const lettersArray = letters
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  const guessStates = computeGuess(letters);

  return (
    <div className="grid grid-cols-5 gap-4">
      {lettersArray.map((char, index) => (
        <CharacterBox
          key={`${char}-index`}
          value={char}
          guessState={guessStates[index]}
        />
      ))}
    </div>
  );
};

export default WordRow;
