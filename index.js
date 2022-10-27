const {fetchMyIP} = require('./iss');

fetchMyIP((err,ip) => {
  if (err) {
    // console.log(err);
    return;
  }
  // console.log(ip);
});