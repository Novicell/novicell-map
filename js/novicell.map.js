'use strict';
/**
 * @name Novicell Map
 * @desc A simple plugin to lazy load a map with an optional custom marker
 * @example html: <div id="map-canvas" data-lat="56.109574" data-lng="10.155361" data-zoom="15"></div>
 * @example js: novicell.map.init();
 * @author Danni Larsen - DLA, Mark Lønquist - MLO, Emil Ankersen - EAN
 */

var novicell = novicell || {};
novicell.map = novicell.map || new function () {
    var self = this;
    var isLoaded = false;
    var options = {};
    var markers = [];

    this.init = function (opts) {
        options = opts;

        if (!options.selector) {
            console.error('novicell.maps: selector is not defined!');
            return;
        }

        if (!options.apiKey) {
            console.error('novicell.maps: apiKey is not defined!');
            return;
        }

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

    this.initialize = function () {
        var element = document.querySelector(options.selector);

        // Set default options
        var defaults = {
            mapOptions: {
                zoom: 10,
                disableDefaultUI: false,
                draggable: false,
                scrollwheel: false,
                center: {
                    lat: 55.56265,
                    lng: 9.760596
                }
            }
        };

        // Set options
        options = merge_options(defaults, options);

        // Set the google maps element
        var map = new google.maps.Map(element, options.mapOptions);

        var icon = {};

        var markerOptions = {
            icon: icon,
            map: map
        };

        // Set infowindow
        if (options.hasOwnProperty('infoWindow')) {
            var infoWindow = new google.maps.InfoWindow({
                content: 'options.infoWindow'
            });
        }

        // Set icon
        if (options.hasOwnProperty('icon')) {
            if (options.icon.hasOwnProperty('url')) {
                icon.url = options.icon.url;
            }

            if (options.icon.hasOwnProperty('size')) {
                icon.scaledSize = new google.maps.Size(options.icon.size.width, options.icon.size.height);
            }
        }

        // Set Markers
        for (let i = 0; i < options.markers.length; i++) {
            let marker = options.markers[i];

            let mapMarker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(marker.lat), parseFloat(marker.lng)),
                title: marker.title,
                icon: icon,
                map: map
            });

            markers.push(mapMarker);

            // Set infowindow eventhandler
            google.maps.event.addListener(mapMarker, 'click', function () {
                infoWindow.setContent(marker.infoWindow);
                infoWindow.open(map, mapMarker);
                // Offset top on open infoWindow
                map.panTo(mapMarker.getPosition());
                map.panBy(0, -200);
            });
        }

        // Fit markers on map
        var bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        map.fitBounds(bounds);
        var listener = google.maps.event.addListener(map, "idle", function () {
            if (map.getZoom() > 16) {
                map.setZoom(15);
            }
            google.maps.event.removeListener(listener);
        });
    };

    function load() {
        isLoaded = true;
        // Async load the GMaps API and run "initialize"
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=novicell.map.initialize&key=' + options.apiKey;
        document.body.appendChild(script);
    }

    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;

        return (elemBottom >= 0) && (elemTop <= window.innerHeight);
    }

    function merge_options(obj, src) {
        Object.keys(src).forEach(function (key) {
            if (obj[key] instanceof Object) {
                merge_options(obj[key], src[key]);
            } else {
                obj[key] = src[key];
            }
        });
        return obj;
    }

}();
