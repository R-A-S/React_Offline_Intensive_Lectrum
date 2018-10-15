// Core
import React, { Component } from 'react';

// Components
import Composer from '../Composer';
import Post from '../Post';
import { Counter } from '../Counter';
import Spinner from '../Spinner';
import Catcher from '../Catcher';
import StatusBar from '../StatusBar';

// Instruments
import Styles from './styles.m.css';
import { GROUP_ID, api } from '../../API';
import { socket } from '../../socket/init';
import { withProfile } from '../../HOC';

@withProfile
export default class Feed extends Component {
    state = {
        posts: [],
        isSpinning: false,
    };

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPostsAsync();

        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) => {
            const { data: createdPost } = JSON.parse(postJSON);

            if (
                currentUserFirstName !== createdPost.firstName &&
                currentUserLastName !== createdPost.lastName
            ) {
                this.setState((prevState) => ({
                    posts: [createdPost, ...prevState.posts],
                }));
            }
        });
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _fetchPostsAsync = async () => {
        try {
            this._setPostsFetchingState(true);

            const posts = await api.fetchPosts();

            this.setState({
                posts,
                isSpinning: false,
            });
        } catch (error) {
            console.log(error.message);
            this._setPostsFetchingState(false);
        }
    };

    _createPostAsync = async (comment) => {
        try {
            this._setPostsFetchingState(true);

            const post = await api.createPost(comment);

            this.setState((prevState) => ({
                posts: [post, ...prevState.posts],
                isSpinning: false,
            }));
        } catch (error) {
            console.log(error.message);
            this._setPostsFetchingState(false);
        }
    };

    render() {
        const { posts, isSpinning } = this.state;
        const postsJSX = posts.map((post) => (
            <Catcher key={post.id}>
                <Post {...post} />
            </Catcher>
        ));

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isSpinning} />
                <StatusBar />
                <Composer createPost={this._createPostAsync} />
                <Counter count={posts.length} />
                {postsJSX}
            </section>
        );
    }
}
