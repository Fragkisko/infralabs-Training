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
// "lat": 25.315987,
//"lon": 55.376249,


// Create a new VectorSource for heatmap points
const heatmapSource = new VectorSource();



//"lat": 25.415987,
//"lon": 55.430249,
// Array to hold multiple vessels
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
          "speed": 14.5,
          "direction": "NNE",
          "temperature": 29, 
          "windSpeed": 15, 
          "waveHeight": 1.2, 
          "event": "Port Departure"
        },
        {
          "lat": 25.285987,
          "lon": 55.302249,
          "timestamp": "2024-10-21T10:15:00Z",
          "speed": 13.8,
          "direction": "NE",
          "temperature": 28,
          "windSpeed": 20,
          "waveHeight": 1.5,
          "event": null
        },
        {
          "lat": 25.295987,
          "lon": 55.310249,
          "timestamp": "2024-10-21T10:30:00Z",
          "speed": 12.7,
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
          "speed": 13.0,
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
          "speed": 14.5,
          "direction": "SE",
          "temperature": 26,
          "windSpeed": 17,
          "waveHeight": 2.0,
          "event": null
        },
        {
          "lat": 25.345987,
          "lon": 55.360249,
          "timestamp": "2024-10-21T11:45:00Z",
          "speed": 15.0,
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


map.addLayer(vectorLayer);
console.log("opa re1")

// Update Info Panel Function
function updateInfoPanel(vesselInfo, trailInfo) {
  console.log("opa re")

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
  console.log("opa r2e")
  map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    const vesselInfo = feature.get('vesselInfo');
    const trailInfo = feature.get('trailInfo');

 // Check if geometry exists before accessing it
 const geometry = feature.getGeometry();
 if (geometry) {
   const coords = geometry.getCoordinates();
   console.log("Feature coordinates:", coords);
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

// Store the line features (for turning the line red)
const lineFeatures = [];

// Function to animate the ship gradually
function moveShipGradually() {
  if (trailIndex >= trail.length - 1) return;  // Stop animation when reaching the last point

  // Get current and next points in the trail
  const currentPoint = fromLonLat([trail[trailIndex].lon, trail[trailIndex].lat]);
  const nextPoint = fromLonLat([trail[trailIndex + 1].lon, trail[trailIndex + 1].lat]);

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
      fill: new Fill({ color: 'purple' }),
      stroke: new Stroke({ color: 'black', width: 1 })
    })
  }));
}

if (currentFeature) {
  // Set style to red for the current feature while preserving the data
  currentFeature.setStyle(new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: 'purple' }),
      stroke: new Stroke({ color: 'black', width: 1 })
    })
  }));
}

  // Interpolate the ship's position between the two points based on the fraction
  const newX = currentPoint[0] + fraction * (nextPoint[0] - currentPoint[0]);
  const newY = currentPoint[1] + fraction * (nextPoint[1] - currentPoint[1]);

  // Set the ship's new position
  shipFeature.getGeometry().setCoordinates([newX, newY]);

  // If the ship reaches the next point (fraction >= 1), update the trail and change point color
  if (fraction >= 1.0) {
    // Update the trail with the red color for the passed point
    const pointFeature = new Feature({
      geometry: new Point(fromLonLat([trail[trailIndex].lon, trail[trailIndex].lat]))
    });
    

    // Set the point color to red as soon as the ship passes over it
    pointFeature.setStyle(new Style({
      image: new CircleStyle({
        radius: 5, // Size of the dot
        fill: new Fill({ color: 'purple' }), // Turn point to red after ship passes
        stroke: new Stroke({ color: 'black', width: 1 }),
      })
    }));

    vectorSource.addFeature(pointFeature); // Add the red point to the vector source

    // Add the line between current and next point to the vector source
    const lineCoordinates = [currentPoint, nextPoint]; // The segment between the two points
    const lineString = new LineString(lineCoordinates);
    const lineFeature = new Feature({
      geometry: lineString
    });

    // Initially, make the line blue
    lineFeature.setStyle(new Style({
      stroke: new Stroke({
        color: 'yellow', // Line color
        width: 5 // Line width
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

  // **Change the line color to red immediately after passing a point**
  if (fraction >= 1.0 && lineFeatures.length > 0) {
    // Change the previous line segment color to red
    const previousLineFeature = lineFeatures[trailIndex - 1];
    previousLineFeature.setStyle(new Style({
      stroke: new Stroke({
        color: 'yellow', // Change line to red
        width: 3 // Line width
      })
    }));
  }
}


// Set up the interval to move the ship at regular intervals
const animationInterval = setInterval(moveShipGradually, 1000); 


// Style function for each point in the trail
function styleFunction(feature) {
  const event = feature.get('event'); // Assuming event is stored in each feature's properties
  const iconSrc = getIcon(event);

  if (iconSrc) {
    return new Style({
      image: new Icon({
        src: iconSrc,
        scale: 0.5, // Adjust scale as needed
      }),
    });
  } else {
    return new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: 'blue' }), // Default dot color
        stroke: new Stroke({ color: 'white', width: 1 }),
      }),
    });
  }
}
// Define a function that returns the color based on the event
function getPointColor(event) {
  switch (event) {
      case 'Port Departure':
          return 'pink'; // Port Departure event -> pink
      case 'Speed Change':
          return 'yellow'; // Speed Change event -> yellow
      case 'Port Arrival':
          return 'black'; // Port Arrival event -> black
      default:
          return 'green'; // For null or undefined event -> green
  }
}
// 2. Create a function to style the point based on the event
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

// Create a new Heatmap Layer
const heatmapLayer = new Heatmap({
  source: heatmapSource,
  blur: 15,  // Adjust the blur factor for smoother or sharper heatmap
  radius: 5, // Radius of each point's influence
  weight: function (feature) {
    // Set weight based on a metric, e.g., speed
    const speed = feature.get('trailInfo').speed;
    return speed;  // Assigning speed as the weight for the heatmap
  }
});


// Add the heatmap layer to the map
map.addLayer(heatmapLayer);
// Assuming vessels data is an array of vessel objects
mockData.vessels.forEach(vessel => {
  const trail = vessel.trail;
  const shipFeature = ShipFeature(trail[0].lat, trail[0].lon); // Start at the first point
  
  map.addLayer(new ol.layer.Vector({
    source: new ol.source.Vector({ features: [shipFeature] })
  }));

  let currentPointIndex = 0;

  // Function to move the ship along the trail
  function moveShip() {
    if (currentPointIndex < trail.length - 1) {
      const currentPoint = trail[currentPointIndex];
      const nextPoint = trail[currentPointIndex + 1];

      // Calculate the time interval between points
      const timeInterval = new Date(nextPoint.timestamp) - new Date(currentPoint.timestamp);

      // Smoothly transition between points using a linear interpolation
      const animationStartTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - animationStartTime;
        const fraction = Math.min(elapsed / timeInterval, 1); // Cap fraction at 1

        const currentLat = currentPoint.lat + fraction * (nextPoint.lat - currentPoint.lat);
        const currentLon = currentPoint.lon + fraction * (nextPoint.lon - currentPoint.lon);

        // Update the ship's position
        shipFeature.getGeometry().setCoordinates(ol.proj.fromLonLat([currentLon, currentLat]));

        // Check if we need to move to the next point
        if (fraction < 1) {
          requestAnimationFrame(animate);
        } else {
          currentPointIndex++;
          moveShip(); // Move to the next point in the trail
        }
      };
      animate();
    }
  }

  moveShip(); // Start moving the ship along its trail
});
