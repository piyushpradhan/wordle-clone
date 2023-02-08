import React from "react";
import { characterStateStyles } from "../utils/constants";

type CharacterBoxProps = {
  value: string;
  guessState: string;
};

const CharacterBox = ({ value, guessState }: CharacterBoxProps) => {
  const stateStyle = characterStateStyles[guessState];
  return (
    <span
      className={`inline-block border-2 text-2xl border-gray-500 p-4 text-center uppercase font-bold before:inline-block before:content=['_'] aspect-square ${stateStyle}`}
    >
      {value}
    </span>
  );
};

export default CharacterBox;
