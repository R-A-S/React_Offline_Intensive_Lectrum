import dom from 'react-test-renderer';
import { Counter } from './';

const renderTree = dom.create(<Counter count = { 5 } />).toJSON();

test('counter component should correspond to its snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});
