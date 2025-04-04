
## Earthquake Data Visualization with Leaflet

In this project, I created an interactive web map using **Leaflet.js**, **D3.js**, and the **USGS GeoJSON earthquake feed** to visualize recent earthquake activity around the world.

The map includes:

- A **tile-based street map** as the base layer using OpenStreetMap.
- **Circle markers** representing earthquakes from the past week, styled by:
  - **Color** based on earthquake **depth**
  - **Radius** based on earthquake **magnitude**
- A custom **color scale** using a rainbow gradient where **deeper earthquakes appear darker** (e.g., deep purple), and shallower ones appear brighter.
- **Popups** on each marker displaying the magnitude and location of the earthquake.

## Skills Demonstrated:
- GeoJSON parsing with D3
- Built an interactive map with Leaflet.js  
- Styled markers by depth and magnitude using custom logic  
- Created a dynamic legend to explain the color scale  

## Resources:
This project was developed with guidance from class examples such as 15.2 BasicNYCBoroughs and SchoolDistrictChoropleth, assistance from my tutor Angel, and additional support and clarification using ChatGPT.