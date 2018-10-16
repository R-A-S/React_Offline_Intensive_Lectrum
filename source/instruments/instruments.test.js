import { sum } from './';

describe('helpers:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('should throw if call with non number', () => {
        expect(() => sum('привет', 'приветик!!')).toThrow();
    });

    test('should add two number', () => {
        expect(sum(2, 2)).toBe(4);
    });
});
