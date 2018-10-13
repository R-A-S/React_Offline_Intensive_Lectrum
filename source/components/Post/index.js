// Core
import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName:  string.isRequired,
    };

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <img src = { avatar } />
                <a>
                    {currentUserFirstName} {currentUserLastName}
                </a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Hello Lectrum!!</p>
            </section>
        );
    }
}
