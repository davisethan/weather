# weather

## client
```bash
# Install packages
npm install
# Start frontend server
npm start
```

## server
```bash
# Install packages
npm install
# Start backend server
node server.js
```

### Current weather by city name
HTTP POST path: /current-weather/city-name\
HTTP POST JSON body eg: {"cityName":"Portland"}

### Current weather by zip code
HTTP POST path: /current-weather/zip-code\
HTTP POST JSON body eg: {"zipCode":97035}

### Current weather by latitude and longitude
HTTP POST path: /current-weather/latitude-longitude\
HTTP POST JSON body eg: {"latitude":45,"longitude":-122}

### Current weather eg
```
{
    "temperature": 45.63,
    "cityName": "Clackamas",
    "latitude": 45,
    "longitude": -122,
    "weather": "Clouds",
    "weatherIconURL": "http://openweathermap.org/img/wn/04d@2x.png"
}
```
