export const LETTER_LENGTH = 5;
export const GUESS_LENGTH = 6;

export const LetterState = {
    MISS: "MISS",
    PRESENT: "PRESENT",
    MATCH: "MATCH",
} as const;

export const characterStateStyles = {
    [LetterState.MISS.toString()]: "bg-gray-500 border border-gray-500",
    [LetterState.PRESENT.toString()]: "bg-yellow-500 border border-gray-500",
    [LetterState.MATCH.toString()]: "bg-green-500 border border-gray-500",
} as const;
