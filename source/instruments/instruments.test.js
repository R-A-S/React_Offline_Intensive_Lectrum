import { sum, delay } from './';

describe('helpers:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('should throw if call with non number', () => {
        expect(() => sum('привет', 'приветик!!')).toThrow();
    });

    test('should add two number', () => {
        expect(sum(2, 2)).toBe(4);
        expect(sum(1, 3)).toBe(4);
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay(3000)).resolves.toBe('success');
    });
});
