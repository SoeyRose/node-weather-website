// get directory, filename using path core module

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));const hbs = require("hbs");

const hbs = require("hbs");
const path = require("path");
const express = require("express");
const forecast = require("./utils/forecast.js");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(
	__dirname,
	"../public"
);
const viewsPath = path.join(__dirname, "../template/views");
const partialPath = path.join(
	__dirname,
	"../template/partials"
);

//.use to customise the server by uping the folfer
app.use(express.static(publicDirectoryPath));

// Setup handlebars engine and views location
//.set use to set the template engine
app.set("view engine", "hbs");
//tell express to use the path
app.set("views", viewsPath);
//setup partials using gbs
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Nicole Santiago",
	});
});

//Help route
app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Message",
		message: "This will guide you",
		name: "Nicole Santiago",
	});
});

// About route
app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		name: "Nicole Santiago",
	});
});

// Weather route
app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Address must be provided",
		});
	}
	// geocode(
	// 	req.query.address,
	// 	(error, { latitude, longitude, location } = {}) => {
	// 		if (error) {
	// 			return res.send({ error });
	// 		}

	// 		forecast(
	// 			latitude,
	// 			longitude,
	// 			(error, forecastData) => {
	// 				if (error) {
	// 					return res.send({ error });
	// 				}

	// 				res.send({
	// 					forecast: forecastData,
	// 					location,
	// 					address: req.query.address,
	// 				});
	// 			}
	// 		);
	// 	}
	// );
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term.",
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Nicole Santiago",
		Error: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Nicole Santiago",
		Error: "Page not found!",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
