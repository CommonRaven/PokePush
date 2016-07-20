/**
 * Created by Nitai J. Perez
 * nitai.perez@ironsrc.com
 * on 16/07/2016
 */
'use strict';

const http = require('http');
const co = require('co');
const later = require('later');
const express = require('express');

const request = require('./request');
const integrations = require('./integrations');

var lastStatus = {
    lastChange: Date.now(),
    status: 'Server Respawn'
};

later.setInterval(tick, later.parse.recur().every(2).minute());
tick(true);

function getStatus(body) {
    var find = '<h2>Status:';
    body = body.substring(body.indexOf(find) + find.length);
    body = body.split('>')[1].split('<')[0];
    return body;
}

function tick(disableReport) {
    return co(function *() {
        console.log(`Checking server status (${(new Date())})`);
        let status;
        try {
            let data = yield request('https://status.pokemongoserver.com');
            status = getStatus(data);
        } catch (err) {
            console.warn(`failed fetching servers status: ${err}`);
        }

        if (lastStatus.status === status) {
            console.log(' > no change.');
        } else {
            let lastStatusText = lastStatus.status;
            console.log(`> status changed: ${lastStatusText} -> ${status}`);
            lastStatus = {
                status: status,
                lastChange: Date.now()
            };
                yield integrations.send(status, lastStatusText);                
            if (disableReport !== true) {
            }
        }
    }).catch(console.error);
}

var app = express();

app.get('/json', (req, res) => {
    res.json(lastStatus);
});

module.exports = app;