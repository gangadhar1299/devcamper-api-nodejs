const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: 'bKppGFaYPXJyYESxJY0zDOuMap3Sqtkx',
    formatter: null
}


const geocoder = NodeGeocoder(options);

module.exports = geocoder;