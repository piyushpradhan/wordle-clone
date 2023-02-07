import { describe, expect, it } from 'vitest';
import { getRandomWord } from '../utils/helper';

describe('word helper', () => {
    it('random word', () => {
        expect(getRandomWord()).toBeTruthy();
        expect(getRandomWord().length).toEqual(5);
    })
})
