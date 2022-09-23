const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=fa3749e2839c932b2bf77ada2368962b&query=" +
		latitude +
		"," +
		longitude +
		"&units=f";

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback(
				"Unable to connect to weather service!",
				undefined
			);
		} else if (response.body.error) {
			callback("Unable to find location", undefined);
		} else {
			callback(
				undefined,
				response.body.current.weather_descriptions[0] +
					". It is currently " +
					response.body.current.temperature +
					" degress out."
			);
		}
	});
};

module.exports = forecast;
