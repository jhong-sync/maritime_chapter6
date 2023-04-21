const AisParser = require("aisparser");
/*
 * !AIVDM,1,1,,A,13P`Lg001t0nUbN4RGrs4ku00@;:,0*4D
 * !AIVDM,1,1,,B,13P`Lg001p0nUbN4RGrs4k00;@;:,0*1C
 */
function checkInstantaneousVelocityThreshold() {
  const aisData1 = {
    timestamp: 1681882017322,
    latitude: 37.5,
    longitude: 126.9,
    heading: 30,
  };
  const aisData2 = {
    timestamp: 1681882027322,
    latitude: 37.501,
    longitude: 129.901,
    heading: 35,
  };

  const speed = calculateInstantaneousVelocity(aisData1, aisData2);

  // threshold 비교
  const threshold = 10;
  if (speed > threshold) {
    console.log(`속도(${speed}m/s)가 임계값(${threshold}m/s)을 초과`);
  } else {
    console.log(`속도(${speed}m/s)가 임계값(${threshold}m/s) 이하`);
  }
}

function calculateInstantaneousVelocity(aisData1, aisData2) {
  const lat1 = aisData1.latitude;
  const lon1 = aisData1.longitude;
  const lat2 = aisData2.latitude;
  const lon2 = aisData2.longitude;

  const time1 = aisData1.timestamp;
  const time2 = aisData2.timestamp;

  const distance = calculateDistance(lat1, lon1, lat2, lon2);

  const timeDiff = Math.abs(time2 - time1) / 1000;

  const speed = distance / timeDiff;

  return speed;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // 지구의 반지름 (m)
  const φ1 = (lat1 * Math.PI) / 180; // 위도1 (radian)
  const φ2 = (lat2 * Math.PI) / 180; // 위도2 (radian)
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // 위도 차이 (radian)
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // 경도 차이 (radian)

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // 두 지점 간의 거리 (m)

  return d;
}

checkInstantaneousVelocityThreshold();
