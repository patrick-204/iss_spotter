// index.js
// const { fetchMyIP } = require('./iss');
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('24.150.7.31', (error, coordinates) => {
  if (error) {
    console.log("Coudln't get Coordinates" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});