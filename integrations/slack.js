/**
 * Created by idoschachter on 17/07/2016.
 */
'use strict';

const Promise = require('bluebird');
const Slack = require('node-slack');

const hookUrl = process.env.SLACK_URL || null;

let slack;
if (hookUrl) {
    slack = new Slack(hookUrl);
}

module.exports = (currentStatus, previousStatus) => {
    if (!slack) {
        return Promise.resolve();
    }

    var color;
    switch (currentStatus.toLowerCase()) {
        case 'online':
            color = 'good';
            break;
        case 'offline':
            color = 'danger';
            break;
        case 'unstable':
            color = 'warning';
            break;
        default:
            color = undefined;
    }
    let message = {
        text: `Servers status changed: ${currentStatus}`,
        attachments: [
            {
                color: color,
                fields: [
                    {
                        title: `currently: ${currentStatus}`,
                        value: `previously: ${previousStatus}`
                    }
                ]
            }
        ]
    };
    return slack.send(message)
        .catch(err => {
            console.error(`error sending slack message: ${err}`);
        });
};
