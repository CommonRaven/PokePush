/**
 * Created by Nitai J. Perez
 * nitai.perez@ironsrc.com
 * on 16/07/2016
 */
'use strict';

const http = require('http');
const co = require('co');
const later = require('later');

const request = require('./request');
const integrations = require('./integrations');

var lastStatus = {
    lastChange: Date.now(),
    status: 'Server Respawn'
};

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
        try {
            let data = yield request('https://status.pokemongoserver.com');
            status = getStatus(data);
        } catch (err) {
            console.warn(`failed fetching servers status: ${err}`);
        }

        if (lastStatus.status === status) {
            console.log(' > no change.');
        } else {
            console.log(`> status changed: ${lastStatus.status} -> ${status}`);
            lastStatus.status = {
                status: status,
                lastChange: Date.now()
            };
            return integrations.send(status, lastStatus.status);
        }
    });
}

//We need a function which handles requests and send response
function handleRequest(req, res) {

    switch (req.url.toLowerCase()) {
        case "/json":
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(lastStatus));
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end(`We don't know any ${req.url.toLowerCase()}, nothing to see here.`);
    }
}

//Create a server
http.createServer(handleRequest).listen(80, () => {
    console.log("Server listening on 80");
});
