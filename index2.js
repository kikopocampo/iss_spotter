const {nextISSTimesForMyLocation} = require('./iss_promised');
const printflyTime = require('./flytime');


// fetchMyIP()
//   .then(body => fetchCoordsByIp(body))
//   .then(coord => fetchISSFlyOverTimes(coord))
//   .then(times => console.log(times))

nextISSTimesForMyLocation()
  .then(data => printflyTime(data))
  .catch(error => console.log("Failed: ", error.message));
