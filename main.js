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

//  import { defaults as defaultControls } from 'ol/control'; // Default controls for the map (zoom, rotation, etc.)
// import { MapEvent } from 'ol'; // Event class for handling map events


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([55.430249,25.415987]),
    zoom: 10
  })
});

//"lat": 25.415987,
//"lon": 55.430249,

var mockData = {
  "vesselPositions": [
    {
      "lat": 25.276987,
      "lon": 55.296249,
      "timestamp": "2024-10-21T10:00:00Z",
      "speed": 14.5,
      "direction": "NNE"
    },
    {
      "lat": 25.285987,
      "lon": 55.302249,
      "timestamp": "2024-10-21T10:15:00Z",
      "speed": 13.8,
      "direction": "NE"
    },
    {
      "lat": 25.295987,
      "lon": 55.310249,
      "timestamp": "2024-10-21T10:30:00Z",
      "speed": 12.7,
      "direction": "ENE"
    },
    {
      "lat": 25.305987,
      "lon": 55.320249,
      "timestamp": "2024-10-21T10:45:00Z",
      "speed": 13.0,
      "direction": "E"
    },
    {
      "lat": 25.315987,
      "lon": 55.330249,
      "timestamp": "2024-10-21T11:00:00Z",
      "speed": 12.5,
      "direction": "ESE"
    },
    {
      "lat": 25.325987,
      "lon": 55.340249,
      "timestamp": "2024-10-21T11:15:00Z",
      "speed": 13.2,
      "direction": "SE"
    },
    {
      "lat": 25.335987,
      "lon": 55.350249,
      "timestamp": "2024-10-21T11:30:00Z",
      "speed": 14.0,
      "direction": "SSE"
    },
    {
      "lat": 25.345987,
      "lon": 55.360249,
      "timestamp": "2024-10-21T11:45:00Z",
      "speed": 14.8,
      "direction": "S"
    },
    {
      "lat": 25.355987,
      "lon": 55.370249,
      "timestamp": "2024-10-21T12:00:00Z",
      "speed": 15.1,
      "direction": "SSW"
    },
    {
      "lat": 25.365987,
      "lon": 55.380249,
      "timestamp": "2024-10-21T12:15:00Z",
      "speed": 13.9,
      "direction": "SW"
    },
    {
      "lat": 25.375987,
      "lon": 55.390249,
      "timestamp": "2024-10-21T12:30:00Z",
      "speed": 12.6,
      "direction": "WSW"
    },
    {
      "lat": 25.385987,
      "lon": 55.400249,
      "timestamp": "2024-10-21T12:45:00Z",
      "speed": 12.1,
      "direction": "W"
    },
    {
      "lat": 25.395987,
      "lon": 55.410249,
      "timestamp": "2024-10-21T13:00:00Z",
      "speed": 11.8,
      "direction": "WNW"
    },
    {
      "lat": 25.405987,
      "lon": 55.420249,
      "timestamp": "2024-10-21T13:15:00Z",
      "speed": 12.0,
      "direction": "NW"
    },
    {
      "lat": 25.415987,
      "lon": 55.430249,
      "timestamp": "2024-10-21T13:30:00Z",
      "speed": 12.4,
      "direction": "NNW"
    },
    {
      "lat": 25.425987,
      "lon": 55.440249,
      "timestamp": "2024-10-21T13:45:00Z",
      "speed": 13.2,
      "direction": "N"
    }
    
  ]
};

// Sort vesselPositions by timestamp
mockData.vesselPositions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

console.log(mockData)


var coordinates = mockData.vesselPositions.map(function(position) {
  return fromLonLat([position.lon, position.lat]);  // Convert each point
});

const vectorSource = new VectorSource();

// Create a new Vector Layer to hold the vessel position features
const vectorLayer = new VectorLayer({
  source: vectorSource,
  visible: true, // Set it as visible initially
});

const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.backgroundColor = 'gray';
tooltip.style.color = 'white';
tooltip.style.padding = '5px';
tooltip.style.borderRadius = '5px';
tooltip.style.visibility = 'hidden'; // Initially hidden
document.body.appendChild(tooltip);

// Loop through the mock data to create features and add them to the vector source
mockData.vesselPositions.forEach(position => {
  // Create a new feature for each position
  const feature = new Feature({
    geometry: new Point(fromLonLat([position.lon, position.lat])), // Create a point geometry
  
    data: {
      timestamp: position.timestamp,
      speed: position.speed,
      direction: position.direction
    }
  
  });

  // Style the feature (green dot)
  feature.setStyle(new Style({
    image: new CircleStyle({
      radius: 5, // Size of the dot
      fill: new Fill({ color: 'green' }), // Fill color of the dot
      stroke: new Stroke({ color: 'black', width: 1 }) // Optional stroke around the dot
    })
  }));

  // Add the feature to the vector source
  vectorSource.addFeature(feature);
});
const lineString = new LineString(coordinates);

// Create a feature for the line
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
// Add the vector layer to the map
map.addLayer(vectorLayer);

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

  if (feature && feature.getGeometry().getType() === 'Point') {
    // Access the data from the feature
    const data = feature.get('data'); 
    if (data) {
      tooltip.innerHTML = `
        <strong>Timestamp:</strong> ${data.timestamp}<br>
        <strong>Speed:</strong> ${data.speed} knots<br>
        <strong>Direction:</strong> ${data.direction}
      `;
      tooltip.style.left = evt.originalEvent.pageX + 10 + 'px'; // Position to the right of the mouse
      tooltip.style.top = evt.originalEvent.pageY + 10 + 'px'; // Position slightly below the mouse
      tooltip.style.visibility = 'visible'; // Show the tooltip
    }
  } else {
    tooltip.style.visibility = 'hidden'; // Hide the tooltip when not hovering over a point
  }
});