const request = require('request');

const fetchMyIP = callback => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) return callback(err,null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    return callback(null, body);
  });
};



module.exports = {fetchMyIP};