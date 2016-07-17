/**
 * Created by Nitai J. Perez
 * nitai.perez@ironsrc.com
 * on 16/07/2016
 */
'use strict';

const co = require('co');
const later = require('later');
const dateFormat = require('dateformat');

const request = require('./request');
const integrations = require('./integrations');

var prevStatus = 'Online';

later.setInterval(tick, later.parse.recur().every(5).minute());
tick();

function getStatus(body) {
    var find = '<h2>Status:';
    body = body.substring(body.indexOf(find) + find.length);
    body = body.split('>')[1].split('<')[0];
    return body;
}

function tick() {
    return co(function *() {
        console.log(`Checking server status (${(new Date())})`);
        let status;
        let ts = dateFormat(new Date(), 'dd/mm HH:MM');
        try {
            let data = yield request('https://status.pokemongoserver.com');
            status = getStatus(data);
        } catch (err) {
            console.warn(`failed fetching servers status: ${err}`);
        }

        if (prevStatus === status) {
            console.log(' > no change.');
        } else {
            console.log(`> status changed: ${prevStatus} -> ${status}`);
            return integrations.send(status, prevStatus, ts);
        }
    });
}
