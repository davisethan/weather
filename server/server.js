var cors = require('cors');
var dotenv = require('dotenv');
var express = require('express');
var currentWeather = require('./currentWeather')

// Create server
dotenv.config();
var app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use(currentWeather);

// Port
app.listen(process.env.PORT, function(){
    console.log(`http://localhost:${process.env.PORT} live...`);
});
