import React from "react";
import CharacterBox from "./CharacterBox";
import { LETTER_LENGTH } from "../utils/constants";

type WordRowProps = {
  letters: string;
  result: string[];
};

const WordRow = ({ letters = "", result }: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - letters.length;
  const lettersArray = letters
    .split("")
    .concat(Array(lettersRemaining).fill(""));

  return (
    <div className="grid grid-cols-5 gap-2 md:gap-4">
      {lettersArray.map((char, index) => (
        <CharacterBox
          key={`${char}-${index}`}
          value={char}
          guessState={result[index]}
        />
      ))}
    </div>
  );
};

export default WordRow;
