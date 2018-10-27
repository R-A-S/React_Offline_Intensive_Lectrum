// Instruments
import { MAIN_URL, TOKEN } from '../config';

export default new class Api {
    async fetchPosts() {
        const response = await fetch(`${MAIN_URL}?size=20`, {
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

    async removePost(id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                authorization: TOKEN,
            },
        });

        if (response.status !== 204) {
            throw new Error('Post was not deleted.');
        }

        return null;
    }

    async likePost(id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method:  'PUT',
            headers: {
                authorization: TOKEN,
            },
        });

        if (response.status !== 200) {
            throw new Error('Post was not liked.');
        }

        const { data: post } = await response.json();

        return post;
    }
}();
