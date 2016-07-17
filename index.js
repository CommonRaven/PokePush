/**
 * Created by Nitai J. Perez
 * nitai.perez@ironsrc.com
 * on 16/07/2016
 */

var later = require('later');
var request = require('request');
var dateFormat = require('dateformat');
var PushBullet = require('pushbullet');

var pusher = new PushBullet(process.env.PUSHBULLET_KEY);
var STATUS = 'Online';

console.log(`Launching process with Pushbullet key: ${process.env.PUSHBULLET_KEY}`);

later.setInterval(tick, later.parse.recur().every(5).minute());
tick();

function tick() {
    console.log(`Checking server status (${(new Date())})`);
    request('https://status.pokemongoserver.com/', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const status = getStatus(body);

            if (STATUS === status) {
                console.log(' >  No change.');
                return;
            }
            console.log(` > Status change found: ${STATUS} -> ${status}`);

            var ts = dateFormat(new Date(), 'dd/mm HH:MM');

            pusher.note('ujAwn5dAxi0sjAdP9ajVsq', `PG ${status}`, `Status change:\n${STATUS} -> ${status}\n\n${ts}`, error => {
                if (error) {
                    console.warn(` > Failed to reported status change: ${status}`);
                    console.error(error);
                } else {
                    console.log(` > Reported status change: ${status}`);
                    STATUS = status;
                }
            });
        } else {
            console.warn(' > Failed http query');
            console.error(error);
        }
    });
}

function getStatus(body) {
    var find = '<h2>Status:';
    body = body.substring(body.indexOf(find) + find.length);
    body = body.split('>')[1].split('<')[0];
    return body;
}
