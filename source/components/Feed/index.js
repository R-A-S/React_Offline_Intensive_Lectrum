// Core
import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import gsap from 'gsap';

// Components
import Composer from '../Composer';
import Post from '../Post';
import { Counter } from '../Counter';
import Spinner from '../Spinner';
import Catcher from '../Catcher';
import StatusBar from '../StatusBar';
import Postman from '../Postman';

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
        isPostmanAppear: true,
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

        socket.on('remove', (postJSON) => {
            const { data: deletedPost, meta } = JSON.parse(postJSON);

            if (
                currentUserFirstName !== meta.authorFirstName &&
                currentUserLastName !== meta.authorLastName
            ) {
                this.setState((prevState) => ({
                    posts: prevState.posts.filter((post) => post.id !== deletedPost.id),
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost } = JSON.parse(postJSON);

            if (
                currentUserFirstName !== likedPost.firstName &&
                currentUserLastName !== likedPost.lastName
            ) {
                this.setState((prevState) => ({
                    posts: prevState.posts.map(
                        (post) => (post.id === likedPost.id ? likedPost : post),
                    ),
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

    _removePostAsync = async (postId) => {
        try {
            this._setPostsFetchingState(true);

            await api.removePost(postId);

            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== postId),
                isSpinning: false,
            }));
        } catch (error) {
            console.log(error.message);
            this._setPostsFetchingState(false);
        }
    };

    _likePostAsync = async (postId) => {
        try {
            this._setPostsFetchingState(true);

            const likedPost = await api.likePost(postId);

            this.setState(({ posts }) => ({
                posts: posts.map((post) => (post.id === postId ? likedPost : post)),
                isSpinning: false,
            }));
        } catch (error) {
            console.log(error.message);
            this._setPostsFetchingState(false);
        }
    };

    _animateComposerEnter = (composer) => {
        gsap.fromTo(composer, 3, { x: -1000, opacity: 0 }, { x: 0, opacity: 1 });
    };

    _animateCounterEnter = (composer) => {
        gsap.fromTo(composer, 1, { x: -1000, y: -500, opacity: 0 }, { x: 0, y: 0, opacity: 1 });
    };

    _animatePostmanEnter = (postman) => {
        gsap.fromTo(postman, 1, { x: 1000, opacity: 0 }, { x: 0, opacity: 1 });
        setTimeout(() => this.setState({ isPostmanAppear: false }), 5000);
    };

    _animatePostmanExit = (postman) => {
        gsap.fromTo(postman, 1, { x: 0, opacity: 1 }, { x: 1000, opacity: 0 });
    };

    render() {
        const { posts, isSpinning, isPostmanAppear } = this.state;
        const postsJSX = posts.map((post) => (
            <CSSTransition
                classNames={{
                    enter: Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit: Styles.postOutStart,
                    exitActive: Styles.postOutEnd,
                }}
                key={post.id}
                timeout={{ enter: 500, exit: 400 }}>
                <Catcher>
                    <Post
                        {...post}
                        removePost={this._removePostAsync}
                        likePost={this._likePostAsync}
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className={Styles.feed}>
                <Spinner isSpinning={isSpinning} />
                <StatusBar />
                <Transition appear in timeout={3000} onEnter={this._animateComposerEnter}>
                    <Composer createPost={this._createPostAsync} />
                </Transition>
                <Transition appear in timeout={1000} onEnter={this._animateCounterEnter}>
                    <Counter count={posts.length} />
                </Transition>
                <TransitionGroup>{postsJSX}</TransitionGroup>
                <Transition
                    appear
                    in={isPostmanAppear}
                    timeout={1000}
                    onEnter={this._animatePostmanEnter}
                    onExit={this._animatePostmanExit}>
                    <Postman />
                </Transition>
            </section>
        );
    }
}
