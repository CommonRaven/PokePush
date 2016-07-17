/**
 * Created by idoschachter on 17/07/2016.
 */
'use strict';
const request = require('request');
const Promise = require('bluebird');

module.exports = url => {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode === 200) {
                resolve(body);
            } else {
                reject(new Error('error fetching data'));
            }
        });
    });
};
