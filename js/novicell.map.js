'use strict';
/**
* @name Novicell Map
* @desc A simple plugin to load a map with an optional custom marker
* @example html: <div id="map-canvas" data-lat="56.109574" data-lng="10.155361" data-zoom="15"></div>
* @example js: novicell.map.init();
* @author Danni Larsen - DLA, Mark Lønquist - MLO
*/

var novicell = novicell || {};
novicell.map = novicell.map || new function() {
    var self = this;
    var isLoaded = false;
    var options = {};

    this.init = function(opts) {
        options = opts;
        
        if(!options.selector){
            console.error('novicell.maps: selector is not defined!');
            return;
        };

        if(!options.apiKey){
            console.error('novicell.maps: apiKey is not defined!');
            return;
        };

        var element = document.querySelector(options.selector);

        if (!isLoaded && element && isScrolledIntoView(element)) {
            load();
        } else {
            document.onscroll = function () {
                if (!isLoaded && element && isScrolledIntoView(element)) {
                    load();
                }
            };
        }
    };

    this.initialize = function() {
        var element = document.querySelector(options.selector);

        // Get lat / lng form the map element's attributes
        var lat = parseFloat(element.getAttribute('data-lat').replace(',', '.')),
            lng = parseFloat(element.getAttribute('data-lng').replace(',', '.'));

        // Get zoom level
        var zoomLevelProp = parseInt(element.getAttribute('data-zoom'));
        var zoomLevel = zoomLevelProp > 0 ? zoomLevelProp : options.mapOptions.zoomLevel;

        // Set cordinates of the map
        var coordinates = new google.maps.LatLng(lat, lng);

        // Set default options
        var defaults = {
            mapOptions: {
                zoom: zoomLevel,
                disableDefaultUI: false,
                draggable: false,
                scrollwheel: false,
                center: coordinates
            }
        };

        // Set options
        options = merge_options(defaults, options);

        // Set the google maps element
        var map = new google.maps.Map(element, options.mapOptions);

        var markerOptions = {
            position: coordinates,
            map: map
        }

        // Set icon
        if(options.hasOwnProperty('icon')) {
            markerOptions['icon'] = {};
            if(options.icon.hasOwnProperty('url')) {
                markerOptions.icon['url'] = options.icon.url;
            };
            if(options.icon.hasOwnProperty('size')) {
                markerOptions.icon['scaledSize'] = new google.maps.Size(options.icon.size.width, options.icon.size.height);
            };
        };

        // Set title
        if(options.hasOwnProperty('title')) {
            markerOptions.title = options.title;
        };

        // Set marker
        var marker = new google.maps.Marker(markerOptions);

        // Set infowindow
        if(options.hasOwnProperty('infoWindow')) {
            var infoWindow = new google.maps.InfoWindow({
                content: options.infoWindow
            });

            //Add eventlistner for click on marker
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }

        // Recalculate center on resize
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }

    function load() {
        isLoaded = true;
        // Async load the GMaps API and run "initialize"
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=novicell.map.initialize&key='+options.apiKey;
        document.body.appendChild(script);
    }

    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;

        return (elemBottom >= 0) && (elemTop <= window.innerHeight);
    }

    function merge_options(obj,src) {
        Object.keys(src).forEach(function(key) {
            if(obj[key] instanceof Object) {
                merge_options(obj[key], src[key]);
            } else {
                obj[key] = src[key];
            }
         });
         return obj;
     }

}();