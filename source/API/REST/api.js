// Instruments
import { MAIN_URL, TOKEN } from '../config';

export default new class Api {
    async fetchPosts() {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
        });

        if (response.status !== 200) {
            throw new Error('Posts were not loaded.');
        }

        const { data: posts } = await response.json();

        return posts;
    }

    async createPost(comment) {
        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                authorization:  TOKEN,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        });

        if (response.status !== 200) {
            throw new Error('Post was not created.');
        }

        const { data: post } = await response.json();

        return post;
    }
}();
