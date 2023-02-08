import { describe, expect, it } from 'vitest';
import { computeGuess, getRandomWord, LetterState } from '../utils/helper';

describe('word helper', () => {
    it('random word', () => {
        expect(getRandomWord()).toBeTruthy();
        expect(getRandomWord().length).toEqual(5);
    })
});

describe("compute guess", () => {
    it('works with match and miss', () => {
        expect(computeGuess("hello", "heart")).toEqual([
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MISS,
            LetterState.MISS,
            LetterState.MISS,
        ]);
    });

    it('works with all present', () => {
        expect(computeGuess("waste", "sweat")).toEqual([
            LetterState.PRESENT,
            LetterState.PRESENT,
            LetterState.PRESENT,
            LetterState.PRESENT,
            LetterState.PRESENT,
        ]);
    });

    it('works with all match', () => {
        expect(computeGuess("hello", "hello")).toEqual([
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MATCH,
        ]);
    });

    it('works will all miss', () => {
        expect(computeGuess("guard", "boost")).toEqual([
            LetterState.MISS,
            LetterState.MISS,
            LetterState.MISS,
            LetterState.MISS,
            LetterState.MISS,
        ]);
    });

    it('only does one match when two identical letters are present in answer', () => {
        expect(computeGuess("sweat", "sweet")).toEqual([
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MISS,
            LetterState.MATCH,
        ]);
    });

    it('when 2 letters are present but guess has only 1 of them, only one should be marked present', () => {
        expect(computeGuess("allol", "colon")).toEqual([
            LetterState.MISS,
            LetterState.MISS,
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MISS
        ]);
    });

    it('when 2 letters are present in guess but answer only has 1 of them', () => {
        expect(computeGuess("colon", "allol")).toEqual([
            LetterState.MISS,
            LetterState.MISS,
            LetterState.MATCH,
            LetterState.MATCH,
            LetterState.MISS
        ]);
    });
})
