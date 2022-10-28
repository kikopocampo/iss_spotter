const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIp = body => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = coord => {
  const {latitude,longitude} = JSON.parse(coord);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const {response} = JSON.parse(data);
      return response;
    });
};



module.exports = {
  // fetchMyIP,
  // fetchCoordsByIp,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};


