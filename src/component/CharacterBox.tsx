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
      className={`border md:border-2 text-2xl dark:text-white border-gray-500 uppercase font-bold aspect-square flex justify-center items-center ${stateStyle}`}
    >
      {value}
    </span>
  );
};

export default CharacterBox;
