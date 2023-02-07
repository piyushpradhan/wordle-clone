import data from '../data/words.json';

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}
