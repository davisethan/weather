var express = require('express');
var currentWeather = require('./currentWeather')

// Constants
var PORT = 3030;

// Create server
var app = express();
app.use(express.json());

// Routes
app.use(currentWeather);

// Port
app.listen(PORT);
