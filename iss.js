const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch public IP address from JSON API
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    // if there's an error print to command line and handle error
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // take the json string and transform to object
    const data = JSON.parse(body);

    callback(null, data['ip']);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch public IP address from JSON API
  const url = `http://ipwho.is/${ip}`;

  // define object fr latitude and longitude
  const data = {
    latitude: '',
    longitude: ''
  };

  request(url, (error, response, body) => {
    // if there's an error print to command line and handle error
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const coordKeys = Object.keys(JSON.parse(body));
    const coordVals = Object.values(JSON.parse(body));

    // find the latitude and set latitude property
    for (let item in coordKeys) {
      if (coordKeys[item] === 'latitude') {
        data.latitude = coordVals[item];
      }
    }

    // find the longitude and set longitude property
    for (let item in coordKeys) {
      if (coordKeys[item] === 'longitude') {
        data.longitude = coordVals[item];
      }
    }

    // call the callback function with null for err and the data object as args
    callback(null, data);

  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};
