import { sum } from './';

describe('helpers:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('should throw if call with non number', () => {
        expect(sum).toBeInstanceOf(Function);
    });
});
