// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import Feed from '../../components/Feed';
import { Provider } from '../../HOC';

// Instruments
import avatar from '../../theme/assets/homer';

const options = {
    avatar,
    currentUserFirstName: 'Андрей',
    currentUserLastName: 'Присняк',
};

@hot(module)
export default class Root extends Component {
    render() {
        return (
            <>
                <Provider value={options}>
                    <Feed />
                </Provider>
            </>
        );
    }
}
