// Core
import React, { Component } from 'react';
import moment from 'moment';
import { string, number, shape, arrayOf } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from '../../HOC';

// Components
import Like from '../Like';

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

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return firstName === currentUserFirstName && lastName === currentUserLastName ? (
            <span className={Styles.cross} onClick={this._removePost} />
        ) : null;
    };

    _removePost = () => {
        const { id, removePost } = this.props;

        removePost(id);
    };

    render() {
        const { avatar, firstName, lastName, comment, created, id, likes, likePost } = this.props;
        const cross = this._getCross();

        return (
            <section className={Styles.post}>
                {cross}
                <img src={avatar} />
                <a>
                    {firstName} {lastName}
                </a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like id={id} likes={likes} likePost={likePost} />
            </section>
        );
    }
}
