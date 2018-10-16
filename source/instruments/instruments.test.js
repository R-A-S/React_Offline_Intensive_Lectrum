import { sum } from './';

describe('helpers:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });
});
