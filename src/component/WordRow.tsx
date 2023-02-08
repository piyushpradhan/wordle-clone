import React from "react";
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

  return (
    <div className="grid grid-cols-5 gap-4">
      {lettersArray.map((char) => (
        <CharacterBox key={char} value={char} />
      ))}
    </div>
  );
};

export default WordRow;
