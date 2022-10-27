// const {fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes} = require('./iss');
const {nextISSTimesForMyLocation} = require('./iss');

const printflyTime = flyTime => {
  for (const time of flyTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((err, flyTimes) => {
  if (err) {
    return console.log("It didnt work!", err);
  }
  printflyTime(flyTimes);
});


// TEST CODES FOR REFERENCE:
// fetchISSFlyOverTimes({ latitude: 53.544389, longitude: -113.4909267 }, (err,data) => {
//   if(err) {
//     console.log(err);
//     return;
//   };
//   console.log(data)
// })

// fetchCoordsByIp ("38.40.96.225", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data)
// })

// fetchMyIP((err,ip) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(ip);
// });