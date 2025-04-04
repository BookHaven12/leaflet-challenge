// Create the 'basemap' tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let baseMaps = {
  "Street Map": streetmap
};

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [40.73, -74.0059], 
  zoom: 2,
  layers: [streetmap]
});

// Then add the 'basemap' tile layer to the map.
L.control.layers(baseMaps, null, {  //added null since I'm not passing any overlays
  collapsed: false
}).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.5,
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth is the third coordinate
      color: "#000000", // Border color is black
      radius: getRadius(feature.properties.mag), // Magnitude is in properties
      stroke: true,
      weight: 1
    };

  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    if (depth >= 90) return "#6a3d9a";     // deep purple 
    else if (depth >= 70) return "#1f78b4"; // blue
    else if (depth >= 50) return "#33a02c"; // green
    else if (depth >= 30) return "#ff7f00"; // orange
    else if (depth >= 10) return "#e31a1c"; // red
    else if (depth >= -10) return "#fb9a99"; // light pink
    else return "#ffff33";                 // bright yellow 
  }
  
  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude == 0) return 1; // size 1 so that it shows up on the map
    else return magnitude * 3; // * 10 increases size for better visibility
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },

    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<strong>Magnitude:</strong> ${feature.properties.mag}<br>
         <strong>Location:</strong> ${feature.properties.place}`
      );
    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let labels = [-10, 10, 30, 50, 70, 90];

    // Initialize depth intervals and colors for the legend
    for (let i = 0; i < labels.length; i++) {

    // Loop through our depth intervals to generate a label with a colored square for each interval.
      let from = labels[i];    //set starting value
      let to = labels[i + 1];  //set ending value
    
      div.innerHTML +=    //for writing HTML inside the legend
    //adds the text label using and if/else statement 
      `<i style="background:${getColor(from)};   
      "></i> ${from}${to ? '&ndash;' + to : '+'}<br>`;
    }

    return div;
    };

  // Finally, add the legend to the map.
  
  legend.addTo(map);
 });