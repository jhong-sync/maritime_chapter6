function qqq() {
  var { KalmanFilter } = require("kalman-filter");

  // AIS data
  const aisData = [
    { time: 1, lat: 37.5, lon: 126.9, speed: 10, heading: 30 },
    { time: 2, lat: 37.501, lon: 129.901, speed: 11, heading: 35 },
    { time: 3, lat: 37.503, lon: 126.904, speed: 9, heading: 40 },
    { time: 4, lat: 37.505, lon: 126.907, speed: 12, heading: 45 },
    { time: 5, lat: 37.508, lon: 126.911, speed: 8, heading: 50 },
    { time: 6, lat: 37.511, lon: 126.915, speed: 9, heading: 55 },
    { time: 7, lat: 37.514, lon: 126.919, speed: 7, heading: 60 },
    { time: 8, lat: 37.518, lon: 126.925, speed: 10, heading: 65 },
    { time: 9, lat: 37.522, lon: 126.931, speed: 11, heading: 70 },
    { time: 10, lat: 37.526, lon: 126.938, speed: 12, heading: 75 },
  ];
  let coordinates = [];
  for (let item of aisData) {
    coordinates.push([item.lon, item.lat]);
  }

  // Initialize Kalman filter
  const kFilter = new KalmanFilter({
    observation: 2,
    dynamic: "constant-speed",
  });

  // Loop over AIS data to estimate positions
  const result = kFilter.filterAll(coordinates);
  console.log("result", result);
}

qqq();
