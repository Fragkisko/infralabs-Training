import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer'; // Class for creating vector layers
import { Vector as VectorSource } from 'ol/source'; // Class for vector source, storing features
import Feature from 'ol/Feature'; // Class for creating features (like points)
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'; // Classes for styling features
import Point from 'ol/geom/Point'; // Import Point for creating point geometries
import LineString from 'ol/geom/LineString'; // Import LineString for drawing lines
import { Icon } from 'ol/style'; // Import Icon for image-based styling
import { Heatmap } from 'ol/layer';

import arrivalIcon from './arrival.png';  // Path to the arrival icon
import departureIcon from './departure.png';  // Path to the departure icon
import speedIcon from './speed.png';  // Path to the speed change icon



// Function to get the appropriate icon based on the event type
function getIcon(event) {
  switch (event) {
    case 'Port Arrival':
      return arrivalIcon; // Path to arrival.png
    case 'Port Departure':
      return departureIcon; // Path to departure.png
    case 'Speed Change':
      return speedIcon; // Path to speed.png
    default:
      return null; // Fallback to default dot if no event
  }
}
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([55.376249,25.315987]),
    zoom: 10
  })
});

const vesselsArray = [];



// Extract the vessel from the mock data
const mockData = {
  "vessels": [
    {
      "name": "Ocean Voyager",
      "type": "Cargo",
      "IMO": "1234567",
      "status": "In Transit",
      "trail": [
        {
          "lat": 25.276987,
          "lon": 55.296249,
          "timestamp": "2024-10-21T10:00:00Z",
          "speed": 19.5,
          "direction": "NNE",
          "temperature": 29, 
          "windSpeed": 1, 
          "waveHeight": 1.2, 
          "event": "Port Departure"
        },
        {
          "lat": 25.285987,
          "lon": 55.302249,
          "timestamp": "2024-10-21T10:15:00Z",
          "speed": 33.8,
          "direction": "NE",
          "temperature": 28,
          "windSpeed": 9,
          "waveHeight": 1.5,
          "event": null
        },
        {
          "lat": 25.295987,
          "lon": 55.310249,
          "timestamp": "2024-10-21T10:30:00Z",
          "speed": 22.7,
          "direction": "ENE",
          "temperature": 27,
          "windSpeed": 18,
          "waveHeight": 1.7,
          "event": null
        },
        {
          "lat": 25.305987,
          "lon": 55.320249,
          "timestamp": "2024-10-21T10:45:00Z",
          "speed": 3.0,
          "direction": "E",
          "temperature": 26,
          "windSpeed": 22,
          "waveHeight": 1.9,
          "event": "Speed Change"
        },
        {
          "lat": 25.325987,
          "lon": 55.330249,
          "timestamp": "2024-10-21T11:15:00Z",
          "speed": 16.5,
          "direction": "SE",
          "temperature": 26,
          "windSpeed": 37,
          "waveHeight": 2.0,
          "event": null
        },
        {
          "lat": 25.345987,
          "lon": 55.360249,
          "timestamp": "2024-10-21T11:45:00Z",
          "speed": 19.0,
          "direction": "S",
          "temperature": 25,
          "windSpeed": 25,
          "waveHeight": 1.8,
          "event": "Restricted Zone Entry Warning"
        },
        {
          "lat": 25.355987,
          "lon": 55.370249,
          "timestamp": "2024-10-21T12:00:00Z",
          "speed": 16.2,
          "direction": "SSW",
          "temperature": 24,
          "windSpeed": 30,
          "waveHeight": 2.2,
          "event": null
        },
        {
          "lat": 25.385987,
          "lon": 55.400249,
          "timestamp": "2024-10-21T13:00:00Z",
          "speed": 15.1,
          "direction": "W",
          "temperature": 24,
          "windSpeed": 22,
          "waveHeight": 1.5,
          "event": "Speed Change"
        },
        {
          "lat": 25.415987,
          "lon": 55.430249,
          "timestamp": "2024-10-21T13:30:00Z",
          "speed": 12.4,
          "direction": "NNW",
          "temperature": 23,
          "windSpeed": 19,
          "waveHeight": 1.2,
          "event": "Port Arrival"
        }
      ],
      
      "geofencingZones": [
        {
          "name": "Restricted Zone",
          "coordinates": [
            { "lat": 25.335987, "lon": 55.340249 },
            { "lat": 25.375987, "lon": 55.390249 },
            { "lat": 25.355987, "lon": 55.370249 }
          ],
          "warningMessage": "Entering restricted area!"
        },
        // Add more zones if needed
      ]
    },
    {
      "name": "Sea Explorer",
      "type": "Tanker",
      "IMO": "7654321",
      "status": "Docked",
      "trail": [
          {
              "lat": 25.315987,
              "lon": 55.376249,
              "timestamp": "2024-10-22T11:00:00Z",
              "speed": 12.3,
              "direction": "E",
              "temperature": 28,
              "windSpeed": 10,
              "waveHeight": 1.0,
              "event": "Port Departure"
          },
          {
              "lat": 25.325987,
              "lon": 55.382249,
              "timestamp": "2024-10-22T11:15:00Z",
              "speed": 12.5,
              "direction": "ENE",
              "temperature": 27,
              "windSpeed": 15,
              "waveHeight": 1.1,
              "event": "Port Arrival"
          },
          /* More trail points */
      ],
      "geofencingZones": [
          {
              "name": "High Traffic Area",
              "coordinates": [
                  { "lat": 25.325987, "lon": 55.360249 },
                  { "lat": 25.355987, "lon": 55.390249 },
                  { "lat": 25.335987, "lon": 55.370249 }
              ],
              "warningMessage": "Entering high traffic area!"
          }
      ]
  }
]
};

// Adding the vessel to the array
mockData.vessels.forEach((vessel, index) => {
  vesselsArray[index] = [
    vessel.IMO,          // [i][0] Vessel ID (IMO)
    vessel.name,         // [i][1] Vessel Name
    vessel.status,       // [i][2] Vessel Status
    vessel.trail         // [i][3] Vessel Trail (Array of trail points)
  ];
});





const vectorSource = new VectorSource();

// Create a new Vector Layer to hold the vessel position features
const vectorLayer = new VectorLayer({
  source: vectorSource,
  visible: true, // Set it as visible initially
});

// Add the tooltip div to the DOM
const tooltip = document.createElement('div');
tooltip.id = 'tooltip';
document.body.appendChild(tooltip);

// Loop through each vessel in mockData
mockData.vessels.forEach(vessel => {
  // Loop through each trail point for the vessel
  vessel.trail.forEach(trailPoint => {
    const feature = new Feature({
      geometry: new Point(fromLonLat([trailPoint.lon, trailPoint.lat])),
      vesselInfo: {
        name: vessel.name,
        type: vessel.type,
        status: vessel.status,
      },
      trailInfo: {
        timestamp: trailPoint.timestamp,
        speed: trailPoint.speed,
        direction: trailPoint.direction,
        temperature: trailPoint.temperature,
        windSpeed: trailPoint.windSpeed,
        waveHeight: trailPoint.waveHeight,
        event: trailPoint.event
      }
    });
  
    const icon = getIcon(trailPoint.event);
  
    // Style the feature with the appropriate icon or dot
    feature.setStyle(new Style({
      image: icon ? new Icon({
        src: icon,
        scale: 0.05, // You can adjust the scale based on your preference
      }) : new CircleStyle({
        radius: 5, // Size of the dot
        fill: new Fill({ color: 'green' }), // Default green fill
        stroke: new Stroke({ color: 'black', width: 1 }) // Optional stroke around the dot
      })
    }));
  
    vectorSource.addFeature(feature);
  });
  
});

// Add lines between the points from the mockData
mockData.vessels.forEach(vessel => {
  // Sort the trail points by timestamp to connect them in sequence
  const sortedTrail = vessel.trail.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Extract coordinates from sorted trail points
  const coordinates = sortedTrail.map(point => fromLonLat([point.lon, point.lat]));

  // Create a LineString feature from the sorted coordinates
  const lineString = new LineString(coordinates);
  
  const lineFeature = new Feature({
    geometry: lineString
  });
// Style the line (e.g., blue color)
lineFeature.setStyle(new Style({
  stroke: new Stroke({
    color: 'blue', // Line color
    width: 2 // Line width
  })
}));

// Add the line feature to the vector source
vectorSource.addFeature(lineFeature);
});

// Create a vector source to hold speed features
const speedSource = new VectorSource();

// Add speed points to the vector source based on the vessel trail data
mockData.vessels.forEach((point) => {
  const speed = point.speed; // Access speed from mock data

  // Create a feature for each point and set geometry & speed attribute
  const feature = new Feature({
    geometry: new Point(fromLonLat([point.longitude, point.latitude])),
    speed: speed, // Set speed as an attribute for weighting
  });

  speedSource.addFeature(feature); // Add feature to the source
});

map.addLayer(vectorLayer);

// Update Info Panel Function
function updateInfoPanel(vesselInfo, trailInfo) {

  const infoPanel = document.getElementById('info-panel');

  infoPanel.innerHTML = `
    <button id="toggleLayerButton">Hide Trails and Points</button>
    <h2>Vessel Information</h2>
    
    <p><strong>Name:</strong> ${vesselInfo.name}</p>
    <p><strong>Type:</strong> ${vesselInfo.type}</p>
    <p><strong>Status:</strong> ${vesselInfo.status}</p>
    <h3>Trail Information</h3>

    <p><strong>Temperature:</strong> ${trailInfo.temperature}°C</p>
    <p><strong>Wind Speed:</strong> ${trailInfo.windSpeed} knots</p>
    <p><strong>Wave Height:</strong> ${trailInfo.waveHeight} m</p>
    ${trailInfo.event ? `<p><strong>Event:</strong> ${trailInfo.event}</p>` : ''}
    
  `;

  // Add event listener to the button
  const toggleButton = document.getElementById('toggleLayerButton');
  let isLayerVisible = true; // Initial visibility state
  toggleButton.addEventListener('click', function() {
    isLayerVisible = !isLayerVisible; // Toggle visibility flag
    vectorLayer.setVisible(isLayerVisible); // Toggle the layer's visibility

    // Update button text based on visibility state
    toggleButton.innerText =! isLayerVisible ? 'Show Trails and Points' : 'Hide Trails and Points' ;
  });

  // Optional: Style the button if needed
  toggleButton.style.marginTop = '10px'; // Adjust spacing
  toggleButton.style.padding = '5px 10px';
}

// Map click event to detect green dot clicks
map.on('click', function (evt) {
  map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    const vesselInfo = feature.get('vesselInfo');
    const trailInfo = feature.get('trailInfo');

 // Check if geometry exists before accessing it
 const geometry = feature.getGeometry();
 if (geometry) {
   const coords = geometry.getCoordinates();
 }

    if (vesselInfo && trailInfo) {
      updateInfoPanel(vesselInfo, trailInfo);
    }
  });
});

export default {
  // other configurations...
  build: {
    sourcemap: false, // Disable source maps
  },
}
const toggleButton = document.getElementById('toggleLayerButton');

// Initialize the visibility flag
let isLayerVisible = true;

// Event listener for the button
toggleButton.addEventListener('click', function() {
  isLayerVisible = !isLayerVisible; // Toggle visibility flag
  vectorLayer.setVisible(isLayerVisible); // Toggle the layer's visibility
  
  // Optional: Update button text to indicate the current state
  toggleButton.innerText = isLayerVisible ? 'Hide Trails and Points' : 'Show Trails and Points';
});

map.on('pointermove', function(evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
    return feature;
  });

  if (feature) {
    const trailInfo = feature.get('trailInfo');
    if (trailInfo) {
      tooltip.innerHTML = `
        <strong>Timestamp:</strong> ${trailInfo.timestamp}<br>
        <strong>Speed:</strong> ${trailInfo.speed} knots<br>
        <strong>Direction:</strong> ${trailInfo.direction}<br>
        <strong>Temperature:</strong> ${trailInfo.temperature}°C<br>
        <strong>Wind Speed:</strong> ${trailInfo.windSpeed} knots<br>
        <strong>Wave Height:</strong> ${trailInfo.waveHeight} m<br>
        ${trailInfo.event ? `<strong>Event:</strong> ${trailInfo.event}<br>` : ''}
      `;
      
      tooltip.style.left = `${evt.originalEvent.pageX + 10}px`;
      tooltip.style.top = `${evt.originalEvent.pageY + 10}px`;
      tooltip.style.visibility = 'visible';
    }
  } else {
      tooltip.style.visibility = 'hidden';
  }
});



// Create a new feature to represent the moving ship
const shipFeature = new Feature({
  geometry: new Point(fromLonLat([mockData.vessels[0].trail[0].lon, mockData.vessels[0].trail[0].lat]))
});

// Style the feature with an icon (replace 'ship-icon.png' with the actual path of the ship image)
shipFeature.setStyle(new Style({
  image: new Icon({
    src: 'ship.png', // Path to ship image
    scale: 0.1, // Adjust size if necessary
  })
}));

vectorSource.addFeature(shipFeature);


// Animation Variables
let trailIndex = 0; // Start at the first trail point
const trail = mockData.vessels[0].trail; // Get the trail of the ship
let fraction = 0.0; // Start the ship at the beginning of the segment (fraction = 0)
const stepSize = 0.11; // Adjust this for the ship's movement speed (smaller for slower movement)

// Function to interpolate smoothly between two points
function interpolatePosition(start, end, progress) {
  const lon = start.lon + (end.lon - start.lon) * progress;
  const lat = start.lat + (end.lat - start.lat) * progress;
  return fromLonLat([lon, lat]);
}

function isNearZone(shipLat, shipLon, zoneLat, zoneLon, threshold = 0.001) {
  const latDiff = Math.abs(shipLat - zoneLat);
  const lonDiff = Math.abs(shipLon - zoneLon);
  return latDiff <= threshold && lonDiff <= threshold;
}

// Store the line features (for turning the line red)
const lineFeatures = [];

// Function to animate the ship gradually
function moveShipGradually() {
  if (trailIndex >= trail.length - 1) return;  // Stop animation when reaching the last point

  // Get current and next points in the trail
  const currentPoint = fromLonLat([trail[trailIndex].lon, trail[trailIndex].lat]);
  const nextPoint = fromLonLat([trail[trailIndex + 1].lon, trail[trailIndex + 1].lat]);

  const speed = trail[trailIndex].speed;          // Get speed from current trail point
  const speedColor = getSpeedColor(speed); 

// Find the current feature at the specified point
const currentFeature = vectorSource.getFeatures().find(f => {
  const coords = f.getGeometry().getCoordinates();
  return coords[0] === currentPoint[0] && coords[1] === currentPoint[1];
});

if (currentFeature) {
  // Set style to red for the current feature while preserving the data
  currentFeature.setStyle(new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: 'blue' }),
      stroke: new Stroke({ color: 'black', width: 1 })
    })
  }));
}

  // Interpolate the ship's position between the two points based on the fraction
  const newX = currentPoint[0] + fraction * (nextPoint[0] - currentPoint[0]);
  const newY = currentPoint[1] + fraction * (nextPoint[1] - currentPoint[1]);

  // Set the ship's new position
  shipFeature.getGeometry().setCoordinates([newX, newY]);
  console.log(`Ship coordinates updated: Longitude: ${newX}, Latitude: ${newY}`);

  // After updating vessel's position in moveShipGradually
  const currentPosition = shipFeature.getGeometry().getCoordinates();

  checkGeofencingAlerts(currentPosition);

  // If the ship reaches the next point (fraction >= 1), update the trail and change point color
  if (fraction >= 1.0) {
// Update the trail with the red color for the passed point
    const pointFeature = new Feature({
    geometry: new Point(fromLonLat([trail[trailIndex].lon, trail[trailIndex].lat]))
});





    const nextSpeed = trail[trailIndex + 1].speed;  // Get the speed at the next point
    const lineColor = getSpeedColor(nextSpeed);  // Determine color based on speed

    const lineCoordinates = [currentPoint, nextPoint];
    const lineString = new LineString(lineCoordinates);
    const lineFeature = new Feature({
      geometry: lineString
    });
    
    lineFeature.setStyle(new Style({
      stroke: new Stroke({
        color: lineColor,  // Use the color based on next point's speed
        width: 5
      })
    }));

    // Add the line feature to the vector source
    vectorSource.addFeature(lineFeature);
    lineFeatures.push(lineFeature); // Store the line features for later updates

    // Move to the next point
    trailIndex++;
    fraction = 0.0; // Reset fraction for the next point
  } else {
    fraction += stepSize; // Gradually increase fraction to move the ship smoothly
  }

}


// Set up the interval to move the ship at regular intervals
const animationInterval = setInterval(moveShipGradually, 1000); 


//Create a function to style the point based on the event
function createPointStyle(feature) {
  const event = feature.get('event');  // Get the event from the feature
  const color = getPointColor(event);  // Get the color based on the event

  return new ol.style.Style({
      image: new ol.style.Circle({
          radius: 6,  // Size of the circle
          fill: new ol.style.Fill({
              color: color  // Fill color
          }),
          stroke: new ol.style.Stroke({
              color: 'black',  // Border color
              width: 1  // Border width
          })
      })
  });
}

function getSpeedColor(speed) {
  if (speed <= 5) return 'green';          // Low speed
  if (speed <= 10) return 'yellow';         // Medium speed
  if (speed <= 15) return 'orange';         // low  High speed
  if (speed <= 20) return 'brown';          // Low speed
  return 'red';                             // Very high speed
}
// Reference to the dropdown element
const vesselSelect = document.getElementById('vesselSelect');

// Populate the dropdown with vessels from mock data
mockData.vessels.forEach(vessel => {
  const option = document.createElement('option');
  option.value = vessel.IMO;  // Set IMO or any unique identifier as the value
  option.textContent = vessel.name;  // Display vessel name
  vesselSelect.appendChild(option);
});
// Define a variable to store the selected vessel's trail
let selectedVesselTrail = [];

// Optional: Handle dropdown change to display selected vessel info
vesselSelect.addEventListener('change', function() {
  const selectedIMO = this.value;
  const selectedVessel = mockData.vessels.find(v => v.IMO === selectedIMO);
  console.log('Selected Vessel:', selectedVessel);
  // Update other info panel elements with selected vessel's data as needed
  
});

// Function to create geofencing zones on the map
function addGeofencingZones() {
  mockData.vessels.forEach(vessel => {
    vessel.geofencingZones.forEach(zone => {
      const zoneCoordinates = zone.coordinates.map(coord => fromLonLat([coord.lon, coord.lat]));
      const polygon = new Polygon([zoneCoordinates]);
      const feature = new Feature({
        geometry: polygon,
        name: zone.name,
        warningMessage: zone.warningMessage,
      });

      // Set a style for the zone (optional)
      feature.setStyle(new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.1)',
        }),
      }));

      vectorSource.addFeature(feature);
    });
  });
}
function checkGeofencingAlerts(currentPosition) {
  const features = vectorSource.getFeatures(); // Get all features in vector source (includes zones and vessel trail points)
  features.forEach(feature => {
    if (feature.getGeometry().getType() === 'Polygon') {
      const polygon = feature.getGeometry();
      const distance = polygon.getClosestPoint(currentPosition);

      // Trigger alert if within a certain threshold distance
      if (distance < 500) {  // Adjust distance as needed
        displayGeofencingAlert(feature.get('warningMessage'));
      }
    }
  });
}
// Function to display geofencing alert in the info panel
function displayGeofencingAlert(message) {
  const infoPanel = document.getElementById('infoPanel');  // Adjust ID as needed
  infoPanel.innerHTML = `<p><strong>Alert:</strong> ${message}</p>`;
}



function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}


function checkGeofencingAlert(currentLat, currentLon, vessel) {
  // Define proximity threshold (in meters)
  const proximityThreshold = 500; 

  vessel.geofencingZones.forEach(zone => {
    zone.coordinates.forEach(coord => {
      const distance = calculateDistance(currentLat, currentLon, coord.lat, coord.lon);

      // If within threshold, show warning in the info panel
      if (distance <= proximityThreshold) {
        displayWarning(zone.warningMessage);
      }
    });
  });
}

// Function to display warning in the info panel
function displayWarning(message) {
  const infoPanel = document.getElementById('infoPanel');
  infoPanel.textContent = `Alert: ${message}`;
}
