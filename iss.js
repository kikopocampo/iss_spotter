const request = require('request');

const fetchMyIP = callback => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) return callback(err,null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const bodyInfo = JSON.parse(body);
    return callback(null, bodyInfo.ip);
  });
};

const fetchCoordsByIp = (ip,callback) => {
  request(`http://ipwho.is/${ip}`, (err, response, body) => {
    if (err) {
      return callback(err, null);
    }
    const bodyInfo = JSON.parse(body);
    // console.log(bodyInfo['success'])
    if (bodyInfo['success'] === false) {
      const msg = `Success status was ${bodyInfo['success']}. Server message says: ${bodyInfo['message']} when fetching for IP ${bodyInfo['ip']}`;
      return callback(Error(msg), null);
    }
    const result = {
      latitude: bodyInfo.latitude,
      longitude: bodyInfo.longitude,
    };
    return callback(null, result);

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const {latitude,longitude} = coords;
  request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (err, response, body) => {
    if (err) {
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS data. Response ${body}`;
      return callback(Error(msg), null);
    }
    const bodyInfo = JSON.parse(body);
    return callback(null, bodyInfo.response);
  });
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }
    fetchCoordsByIp(ip,(err,coords) => {
      if (err) {
        return callback(err, null);
      }
      fetchISSFlyOverTimes(coords,(err,flyTimes) => {
        if (err) {
          return callback(err,null);
        }
        return callback(null,flyTimes);
      });
    });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};