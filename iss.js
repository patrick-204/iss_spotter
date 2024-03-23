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

    // parse the body
    const parsedBody = JSON.parse(body);

    // if parsing the body of the response isn't successful then throw error msg and error
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    } 

    // find the latitude and set latitude property
    data.latitude = parsedBody.latitude;

    // find the longitude and set longitude property
    data.longitude = parsedBody.longitude;

    // call the callback function with null for err and the data object as args
    callback(null, data);

  });
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  // define array to push the risetime and duration obj to
  let data = [];

  // use request to get risetime and duration from iss
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  
  request(url, (error, response, body) => {
    // if there's an error print to command line and handle error
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching risetime and duration. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // parse the body
    const parsedBody = JSON.parse(body);

    // push the risetime and duration object to the data array
    data.push(parsedBody.response);

    // call the callback function with null for err and the data object as args
    callback(null, data);

  }); 
  
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};
