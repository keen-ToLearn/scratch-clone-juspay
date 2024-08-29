export const motionFunctions = [
    {
        what: 'move',
        options: { dir: 'r', units: 30 }
    }, {
        what: 'move',
        options: { dir: 'l', units: 30 }
    }, {
        what: 'move',
        options: { dir: 'u', units: 30 }
    }, {
        what: 'move',
        options: { dir: 'd', units: 30 }
    }, {
        what: 'move',
        options: { dir: 'm', units: 30 }
    }, {
        what: 'turn',
        options: { dir: 'r', deg: 30, reset: false }
    }, {
        what: 'turn',
        options: { dir: 'l', deg: 30, reset: false }
    }, {
        what: 'turn',
        options: { reset: true }
    }, {
        what: 'goto',
        options: { x: 100, y: 100, random: false }
    }, {
        what: 'goto',
        options: { random: true }
    }
];

export const lookFunctions = [
    {
        what: 'say',
        default: 'Hello!',
        timed: true,
        time: 2
    }, {
        what: 'say',
        default: 'Hello!',
        timed: false
    }, {
        what: 'think',
        default: 'Hmm..',
        timed: true,
        time: 2
    }, {
        what: 'think',
        default: 'Hmm..',
        timed: false
    }, {
        what: 'costume',
        next: true
    }, {
        what: 'costume',
        next: false,
        which: 1
    }, {
        what: 'resize',
        definite: true,
        to: 110
    }, {
        what: 'resize',
        definite: false,
        by: 10
    }
];

export const eventFunctions = [
    { what: 'flag' },
    { what: 'sprite' }
];

export const controlFunctions = [
    {
        what: 'wait',
        for: 1
    }, {
        what: 'repeat',
        times: 10
    }, {
        what: 'forever'
    }
];