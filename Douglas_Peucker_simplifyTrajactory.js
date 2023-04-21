function getDistance(point1, point2) {
  var lat1 = point1.latitude;
  var lon1 = point1.longitude;
  var lat2 = point2.latitude;
  var lon2 = point2.longitude;
  var R = 6371; // Earth's radius in km
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var lat1 = (lat1 * Math.PI) / 180;
  var lat2 = (lat2 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return distance;
}

function simplifyTrajectory(trajectory, threshold) {
  var dmax = 1;
  var index = 0;
  var end = trajectory.length - 1;

  // Find the point with the maximum distance
  for (var i = 1; i < end; i++) {
    var d = getDistance(trajectory[i], trajectory[0]);
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  if (dmax > threshold) {
    var left = trajectory.slice(0, index + 1);
    var right = trajectory.slice(index);
    var result1 = simplifyTrajectory(left, threshold);
    var result2 = simplifyTrajectory(right, threshold);
    return result1.slice(0, result1.length - 1).concat(result2);
  }

  // Otherwise, return the endpoints of the trajectory
  else {
    return [trajectory[0], trajectory[end]];
  }
}

var trajectoryExample = [
  { latitude: 52.52, longitude: 13.405 },
  { latitude: 52.5163, longitude: 13.3779 },
  { latitude: 52.5137, longitude: 13.3648 },
  { latitude: 52.5079, longitude: 13.3347 },
  { latitude: 52.5043, longitude: 13.3194 },
  { latitude: 52.5022, longitude: 13.3102 },
  { latitude: 52.4977, longitude: 13.2877 },
  { latitude: 52.4939, longitude: 13.2686 },
  { latitude: 52.4902, longitude: 13.2509 },
  { latitude: 52.4852, longitude: 13.2282 },
];
// var simplifiedTrajectory = simplifyTrajectory(trajectoryExample, 50); // Threshold in km
var simplifiedTrajectory = simplifyTrajectory(trajectoryExample, 0.5); // Threshold in km
console.log("simplifiedTrajectory", simplifiedTrajectory);
