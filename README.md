# Novicell Map
**A simple component to lazy load a single google map with a marker on it.**

## Usage

Written in pure Vanilla JS, it has *no dependencies*, and is easy to implement with the [novicell-frontend setup](https://github.com/Novicell/novicell-frontend).

## Requirements

To use this you need a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

For this component to be smart, it need something to get the LAT, LNG and ZOOMLEVEL, for the marker, and append it to the map-element, as data-attibutes.

**Here's some plugin suggestions for some of the popular CMS's:**
- [Umbraco](https://our.umbraco.org/projects/backoffice-extensions/angulargooglemaps)
- [Drupal](https://www.drupal.org/project/gmap)
- [Wordpress](http://www.advancedcustomfields.com/resources/google-map/)

### Install with npm

```bash
npm install novicell-map --save
```

## Setup

First add an HTML elemnt and set `data-lat`, `data-lng` and `data-zoom`, and set a height for your map with CSS (inline css is just for demo):

**Markup**
```html
<div style="height:300px;" id="map-canvas" data-lat="56.109574" data-lng="10.155361" data-zoom="15"></div>
```

Then include the js file in your js bundle or in your HTML:

**JS bundle**
```javascript
scripts: [
    vendorPath + "novicell-map/js/novicell.map.js"
    ...
]
```

**HTML**
```html
    <script src="/node_modules/novicell-map/js/novicell.map.js"></script>
```

Then call the `init`-method with an apikey and a selector, from your `master.js`-file:
```javascript
document.addEventListener("DOMContentLoaded", function () {
    novicell.map.init({
        apiKey: 'YOUR API KEY HERE',
        selector: '#map-canvas'
    });
});
```

## Options
```javascript
novicell.map.init({
    apiKey: 'YOUR API KEY HERE',
    selector: '#map-canvas',
    title: 'Novicell HQ international',              
    icon: {
      url: 'test-pin.png',
      size: {
        width: 50,
        height: 50
      }
    },
    infoWindow: '<div class="marker-content">' +
      '<div class="siteNotice">' +
      '</div>' +
      '<h1 class="marker-content-header">Novicell HQ</h1>' +
      '<div class="marker-content-body">' +
      '<p><b>Office hours:</b><br />8.00am – 4.00pm</p>' +
      '<p><b>Phone</b><br />+45 8619 0550</p>' +
      '<p><b>Email</b><br /><a href="mailto:info@novicell.dk" title="Send us an email">test@novicell.dk</a></p>' +
      '<p><strong>Novicell Aarhus</strong><br />Søren Nymarks Vej 6<br />8270 Højbjerg</p>' +
      '</div>' +
      '</div>',
    mapOptions: {
      disableDefaultUI: false,
      draggable: false,
      scrollwheel: false,
      styles: [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.landcover", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural.terrain", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [{ "visibility": "on" }, { "weight": "0.64" }] }, { "featureType": "poi.park", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "lightness": "19" }, { "saturation": "0" }] }, { "featureType": "poi.place_of_worship", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }, { "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": "0" }, { "lightness": "41" }, { "gamma": "1.27" }] }, { "featureType": "transit.station.airport", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit.station.bus", "elementType": "all", "stylers": [{ "visibility": "on" }, { "hue": "#ff0000" }] }, { "featureType": "transit.station.rail", "elementType": "all", "stylers": [{ "visibility": "on" }, { "saturation": "23" }, { "lightness": "0" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d3f3f4" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "color": "#ffffff" }, { "weight": "0.01" }, { "visibility": "off" }] }]
    }
});
```


## Extension

When extending the script, make sure to make a singleton for the `novicell` and the `novicell.map` objects before adding your own methods.

```javascript
'use strict';

var novicell = novicell || {};
novicell.map = novicell.map || {};
novicell.map.extentions = novicell.map.extentions || new function () {
    this.test = function() {
        console.log('test');
    };
}();
```
Next you need to include your js-files in your js bundle or in your HTML, and then call the `init`-method from your `master.js`.
Make sure to load you:

**JS bundle**
```javascript
scripts: [
    vendorPath + "novicell-map/js/novicell.map.js"
    projectPath + "/components/novicell.map.extentions.js"
    ...
]
```

**HTML**
```html
    <script src="/node_modules/novicell-map/js/novicell.map.js"></script>
    <script src="/scripts/components/novicell.map.extentions.js"></script>
```

Then call the `test`-method from your `master.js`:
```javascript

document.addEventListener("DOMContentLoaded", function() {
    novicell.map.init();
    novicell.map.extentions.test();
    ...
});
```

## Custom cluster

If you need a custom cluster in your Google Map, there is a library for this:
https://github.com/gmaps-marker-clusterer/gmaps-marker-clusterer/blob/master/examples/custom-css_example.html

```javascript
options = {
cssClass: 'custom-pin'
};
```

```javascript
var markerCluster = new MarkerClusterer(map, markers, options);
```

## License
The Novicell Map is licensed under the MIT Open Source license.
