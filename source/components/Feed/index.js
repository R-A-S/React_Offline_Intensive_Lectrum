// Core
import React, { Component } from 'react';

// Components
import Composer from '../Composer';
import Post from '../Post';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    render() {
        return (
            <section className = { Styles.feed }>
                <Composer />
                <Post />
            </section>
        );
    }
}
