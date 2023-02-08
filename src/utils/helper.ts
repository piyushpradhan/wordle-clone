import data from '../data/words.json';

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

export const LetterState = {
    MISS: "MISS",
    PRESENT: "PRESENT",
    MATCH: "MATCH",
} as const;

export function computeGuess(
    guess: string,
    answerString: string
): string[] {
    const result: string[] = [];

    if (guess.length !== answerString.length) {
        return result;
    }

    const answer = answerString.split('');

    const guessAsArray = guess.split('');

    const answerLetterCount: Record<string, number> = {};

    guessAsArray.forEach((letter, index) => {
        const currentAnswerLetter = answer[index];

        answerLetterCount[currentAnswerLetter] = answerLetterCount[
            currentAnswerLetter
        ]
            ? answerLetterCount[currentAnswerLetter] + 1
            : 1;

        if (currentAnswerLetter === letter) {
            result.push(LetterState.MATCH);
        } else if (answer.includes(letter)) {
            result.push(LetterState.PRESENT);
        } else {
            result.push(LetterState.MISS);
        }
    });

    result.forEach((curResult, resultIndex) => {
        if (curResult !== LetterState.PRESENT) {
            return;
        }

        const guessLetter = guessAsArray[resultIndex];

        answer.forEach((currentAnswerLetter, answerIndex) => {
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
