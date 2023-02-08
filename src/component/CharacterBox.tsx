import React from "react";

type CharacterBoxProps = {
  value: string;
};

const CharacterBox = ({ value }: CharacterBoxProps) => {
  return (
    <span className="inline-block border-2 text-2xl border-gray-500 p-4 text-center uppercase font-bold">
      {value}
    </span>
  );
};

export default CharacterBox;
