var express = require('express');
var cors = require('cors');
var currentWeather = require('./currentWeather')

// Constants
var PORT = 3030;

// Create server
var app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use(currentWeather);

// Port
app.listen(PORT);
