import data from '../data/words.json';

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

export const LetterState = {
    MISS: "miss",
    PRESENT: "present",
    MATCH: "match",
} as const;

export function computeGuess(guess: string, word: string) {
    const guessArray = guess.split("");
    const wordArray = word.split("");
    const result: string[] = [];

    guessArray.forEach((letter, index) => {
        if (letter === wordArray[index]) {
            result.push(LetterState.MATCH);
        } else if (wordArray.includes(letter)) {
            result.push(LetterState.PRESENT);
        } else {
            result.push(LetterState.MISS);
        }
    });

    return result;
}
