// Core
import React, { Component } from 'react';

// Instruments
import { withProfile } from '../../HOC';
import Styles from './styles.m.css';

@withProfile
export default class Postman extends Component {
    render() {
        const { avatar, currentUserFirstName } = this.props;

        return (
            <section className={Styles.postman}>
                <img src={avatar} />
                <span>
                    Welcome online, <b>{currentUserFirstName}</b>
                </span>
            </section>
        );
    }
}
