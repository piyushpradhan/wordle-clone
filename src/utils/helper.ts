import data from '../data/words.json';
import { LetterState } from './constants';

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

export function computeGuess(
    guess: string,
    answer: string
): string[] {
    const result: string[] = [];

    if (guess.length !== answer.length) {
        return result;
    }

    const answerArray = answer.split('');

    const guessArray = guess.split('');

    const answerLetterCount: Record<string, number> = {};

    guessArray.forEach((letter, index) => {
        const currentAnswerLetter = answerArray[index];

        answerLetterCount[currentAnswerLetter] = answerLetterCount[
            currentAnswerLetter
        ]
            ? answerLetterCount[currentAnswerLetter] + 1
            : 1;

        if (currentAnswerLetter === letter) {
            result.push(LetterState.MATCH);
        } else if (answerArray.includes(letter)) {
            result.push(LetterState.PRESENT);
        } else {
            result.push(LetterState.MISS);
        }
    });

    result.forEach((curResult, resultIndex) => {
        if (curResult !== LetterState.PRESENT) {
            return;
        }

        const guessLetter = guessArray[resultIndex];

        answerArray.forEach((currentAnswerLetter, answerIndex) => {
            if (currentAnswerLetter !== guessLetter) {
                return;
            }

            if (result[answerIndex] === LetterState.MATCH) {
                result[resultIndex] = LetterState.MISS;
            }

            if (answerLetterCount[guessLetter] <= 0) {
                result[resultIndex] = LetterState.MISS;
            }
        });

        answerLetterCount[guessLetter]--;
    });

    return result;
}

export function isValidWord(word: string): boolean {
    return data.includes(word);
}
