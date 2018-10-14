// Core
import React, { Component } from 'react';
import moment from 'moment';
import { string, number, shape, arrayOf } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from '../../HOC';

@withProfile
export default class Post extends Component {
    static propTypes = {
        avatar: string.isRequired,
        currentUserFirstName: string.isRequired,
        currentUserLastName: string.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        firstName: string.isRequired,
        id: string.isRequired,
        lastName: string.isRequired,
        likes: arrayOf(
            shape({
                firstName: string.isRequired,
                lastName: string.isRequired,
            }).isRequired,
        ).isRequired,
    };

    render() {
        const { avatar, firstName, lastName, comment, created } = this.props;

        return (
            <section className={Styles.post}>
                <span className={Styles.cross} />
                <img src={avatar} />
                <a>
                    {firstName} {lastName}
                </a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}
