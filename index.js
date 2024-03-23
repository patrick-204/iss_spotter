// index.js
// const { fetchMyIP } = require('./iss');
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// call function to fetch IP
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

// call function to get coordinates of IP
fetchCoordsByIP('24.150.7.31', (error, coordinates) => {
  if (error) {
    console.log("Coudln't get Coordinates" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});

// get the iss flyover time and duration
fetchISSFlyOverTimes({ latitude: 43.3255196, longitude: -79.7990319 }, (error, riseTimeAndDuration) => {
  if (error) {
    console.log("Coudln't iss data" , error);
    return;
  }

  console.log('It worked! Returned flyover time and duration:' , riseTimeAndDuration);
});