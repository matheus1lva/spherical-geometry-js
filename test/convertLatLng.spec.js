import test from 'ava';
import { convertLatLng } from '../dist/index.js';
import { london, newyork, sydney } from './data/places.js';

test('should clone LatLngs', (t) => {
  const copy = convertLatLng(sydney);
  t.not(copy, sydney);
  t.true(copy.equals(sydney));
});

test('should convert Google Maps LatLngs', (t) => {
  const fakeGoogleMapsLatLng = {
    lat() {
      return london.lat();
    },
    lng() {
      return london.lng();
    },
  };
  t.deepEqual(convertLatLng(fakeGoogleMapsLatLng), london);
});

test('should convert Google Maps LatLngLiterals', (t) => {
  const fakeGoogleMapsLatLng = {
    lat: london.lat(),
    lng: london.lng(),
  };
  t.deepEqual(convertLatLng(fakeGoogleMapsLatLng), london);
});

test('should convert GTFS objects', (t) => {
  const gtfsStopPoint = {
    lat: newyork.lat(),
    lon: newyork.lng(),
  };
  t.deepEqual(convertLatLng(gtfsStopPoint), newyork);
});

test('should convert Javascript Coordinates from Geolocation API', (t) => {
  class Coordinates {
    /**
     *
     * @param {number} latitude
     * @param {number} longitude
     */
    constructor(latitude, longitude) {
      this._la = latitude;
      this._lo = longitude;
    }

    get latitude() {
      return this._la;
    }

    get longitude() {
      return this._lo;
    }
  }

  const coords = new Coordinates(newyork.lat(), newyork.lng());
  t.deepEqual(convertLatLng(coords), newyork);
});

test('should convert GeoJSON', (t) => {
  /** @type {[number, number]} */
  const geoJson = [newyork.lng(), newyork.lat()];
  t.deepEqual(convertLatLng(geoJson), newyork);
});

test("should convert GeoJSON that's sort of an array", (t) => {
  const geoJson = {
    0: newyork.lng(),
    1: newyork.lat(),
  };
  t.deepEqual(convertLatLng(geoJson), newyork);
});

test('should convert objects with x and y', (t) => {
  const place = {
    x: newyork.lng(),
    y: newyork.lat(),
  };
  t.deepEqual(convertLatLng(place), newyork);
});

test('should not convert other objects', (t) => {
  /** @type {any} */
  const notPlace = {
    foo: 10,
    bar: 12,
  };
  t.throws(() => convertLatLng(notPlace), { instanceOf: TypeError });
});
