// Core
import { EventEmitter } from 'events';

// Instruments
import dispatcher from './dispatcher';
import { FETCH_POSTS } from './types';

export default new class PostsStore extends EventEmitter {
    constructor() {
        super();
        this.store = {
            posts:           [],
            isSpinning:      false,
            isPostmanAppear: true,
        };

        dispatcher.register((action) => {
            switch (action.type) {
                case FETCH_POSTS:
                    this.fetchPosts(action.payload);
                    break;
                default:
                    return false;
            }
        });
    }

    subscribe(callback) {
        this.on('change', callback);
    }

    unsubscribe(callback) {
        this.removeListener('change', callback);
    }

    update() {
        this.emit('change');
    }

    getStore() {
        return this.store;
    }

    getPosts() {
        return this.store.posts;
    }

    fetchPosts(posts) {
        this.store.posts = posts;
        this.update();
    }
}();
