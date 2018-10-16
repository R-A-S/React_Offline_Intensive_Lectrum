/* eslint-disable react/no-multi-comp */
// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const log = (message, color) => {
    return console.log(`%c ${message}`, `background: #222; color: ${color}`);
};

class Silo extends Component {
    static getDerivedStateFromProps (nextProps, prevState) {
        log('CHILD → static getDerivedStateFromProps', 'orange');

        if (nextProps.apples > prevState.apples) {
            return {
                apples: nextProps.apples,
            };
        }

        return null;
    }

    constructor () {
        super();

        log('CHILD → constructor', 'wheat');
    }

    state = {
        apples:  0,
        carrots: 5,
    };

    componentDidMount () {
        log('CHILD → componentDidMount', 'lime');
    }

    shouldComponentUpdate () {
        log('CHILD → shouldComponentUpdate', 'olive');

        return true;
    }

    componentDidUpdate () {
        log('CHILD → componentDidUpdate', 'yellow');
    }

    getSnapshotBeforeUpdate () {
        log('CHILD → getSnapshotBeforeUpdate', 'coral');

        return null;
    }

    _yieldCarrot = () =>
        this.setState(({ carrots }) => ({ carrots: carrots + 1 }));

    render () {
        const { apples, carrots } = this.state;

        log('CHILD → render', 'red');

        const vegetables = Array(carrots).fill('🥕');
        const fruits = Array(apples).fill('🍎');

        const fruitsAndVegetablesList = [...vegetables, ...fruits];

        return (
            <>
                <br />
                <br />
                <br />
                <br />
                <h1>📦 Коробка с овощами и фруктами</h1>
                <br />
                <p>{fruitsAndVegetablesList}</p>
                <br />
                <button onClick = { this._yieldCarrot }>Собрать морковь 🥕</button>
            </>
        );
    }
}

// Компонент-фермер, собирает урожай
@hot(module)
export default class Farmer extends Component {
    static getDerivedStateFromProps () {
        log('PARENT → static getDerivedStateFromProps', 'orange');

        return null;
    }

    constructor () {
        super();

        log('PARENT → constructor', 'wheat');
    }

    state = {
        apples: 5,
        name:   'Уолтер',
    };

    componentDidMount () {
        log('PARENT → componentDidMount', 'lime');
    }

    shouldComponentUpdate () {
        log('PARENT → shouldComponentUpdate', 'olive');

        return true;
    }

    componentDidUpdate () {
        log('PARENT → componentDidUpdate', 'yellow');
    }

    getSnapshotBeforeUpdate () {
        log('PARENT → getSnapshotBeforeUpdate', 'coral');

        return null;
    }

    _yieldApples = () => {
        this.setState(({ apples }) => ({ apples: apples + 1 }));
    };

    render () {
        const { name, apples } = this.state;
        const applesList = Array(apples).fill('🍎');

        log('PARENT → render', 'red');

        return (
            <>
                <br />
                <div>
                    Привет, фермер 👩🏼‍🌾 {name}. 👋🏼 У тебя {apples} яблок.
                </div>
                <br />
                {applesList}
                <br />
                <br />
                <button onClick = { this._yieldApples }>Собрать яблоки 🍎</button>
                <Silo apples = { apples } />
            </>
        );
    }
}