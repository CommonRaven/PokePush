/**
 * Created by idoschachter on 17/07/2016.
 */
'use strict';

const slack = require('./slack');
const pushBullet = require('./push-bullet');

module.exports.send = (currentStatus, previousStatus) => {
    return Promise.any([
        slack(currentStatus, previousStatus),
        pushBullet(currentStatus, previousStatus)
    ]);
};
