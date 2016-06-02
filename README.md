# Spherical Geometry Library

This library provides classes and functions for the computation of geometric data on the surface of the Earth.

This library ports a small but useful subset of classes from the Google Maps Javascript API version 3, to use as a seperate module or in node.

## How to use
```js
import * as geometry from 'spherical-geometry';
```
Import the module using a loader like [SystemJS](https://github.com/systemjs/systemjs).

Notes:
* The API is nearly identical to the Google Maps Javascript API.
* All computed lengths are returned in **meters**.

## API
Classes and libraries ported from the Google Maps Javascript API:
* [google.maps.geometry.spherical](https://developers.google.com/maps/documentation/javascript/3.exp/reference#spherical)
* [google.maps.LatLng](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLng)
* [google.maps.LatLngBounds](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLngBounds)