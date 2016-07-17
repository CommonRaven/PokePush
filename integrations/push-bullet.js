/**
 * Created by idoschachter on 17/07/2016.
 */
'use strict';

var Promise = require('bluebird');
var PushBullet = require('pushbullet');

let key = process.env.PUSHBULLET_KEY;
let pusher;

if (key) {
    console.log(`Launching process with Pushbullet key: ${process.env.PUSHBULLET_KEY}`);
    pusher = Promise.promisifyAll(new PushBullet(key));
}

module.exports = (currentStatus, previousStatus, timestamp) => {
    if (!pusher) {
        return Promise.resolve();
    }
    return pusher.noteAsync('ujAwn5dAxi0sjAdP9ajVsq', `PG ${currentStatus}`, `Status change:\n${previousStatus} -> ${currentStatus}\n\n${timestamp}`)
        .catch(err => {
            console.wan(`error sending pushbullet message: ${err}`);
        });
};
