import test from 'ava';
import { LatLng } from '../src/index.js';
import { closeTo } from './assert.js';
import { googleMaps, loadGoogleMapsData } from './data/google-maps.js';
import {
  buenosaires,
  donostia,
  london,
  moscow,
  newyork,
  sydney,
} from './data/places.js';

test.before(async () => {
  await loadGoogleMapsData();
});

test('should construct a point', (t) => {
  t.notThrows(() => new LatLng(0, 0));
});

test('should wrap large coordinates if specified', (t) => {
  const point = new LatLng(300, 300, false);
  closeTo(t, point.lat(), 90);
  closeTo(t, point.lng(), -60);
});

test('should not wrap large coordinates if not specified', (t) => {
  const point = new LatLng(300, 300, true);
  closeTo(t, point.lat(), 300);
  closeTo(t, point.lng(), 300);
});

test('should convert to string like Google Maps', (t) => {
  t.is(sydney.toString(), googleMaps['toString()']);
  t.is(String(sydney), googleMaps['toString()']);
});

test('should convert to URL value like Google Maps', (t) => {
  t.is(sydney.toUrlValue(), googleMaps['toUrlValue()']);
  t.is(sydney.toUrlValue(3), googleMaps['toUrlValue(3)']);
});

test('should be equal to itself', (t) => {
  t.is(sydney.equals(sydney), true);
  t.is(sydney.equals(buenosaires), false);
});

test('should be equal to LatLngLiteral version', (t) => {
  t.is(sydney.equals(sydney.toJSON()), true);
  t.is(sydney.equals(buenosaires.toJSON()), false);
});

test('should work with Array.from', (t) => {
  const arr = Array.from(sydney);
  closeTo(t, arr[0], sydney.lng());
  closeTo(t, arr[1], -33.873651);
  t.is(arr.length, 2);
  t.true(Array.isArray(arr));
});

const points = [donostia, london, newyork, sydney, moscow, buenosaires];

test('should alias latitude', (t) => {
  for (const place of points) {
    t.is(place.lat(), place.y);
    t.is(place.lat(), place.latitude);
    t.is(place.lat(), place[1]);
  }
});

test('should alias longitude', (t) => {
  for (const place of points) {
    t.is(place.lng(), place.x);
    t.is(place.lng(), place[0]);
    t.is(place.lng(), place.long);
    t.is(place.lng(), place.lon);
    t.is(place.lng(), place.longitude);
  }
});

test('should return an iterator', (t) => {
  let i = 0;
  for (const n of london) {
    t.deepEqual(n, london[i]);
    i++;
  }
  t.deepEqual(i, 2);
});
