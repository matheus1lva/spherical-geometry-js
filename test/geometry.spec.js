import test from 'ava';
import {
  computeArea,
  computeDistanceBetween,
  computeHeading,
  computeLength,
  computeOffset,
  computeOffsetOrigin,
  computeSignedArea,
  equalLatLngs,
  interpolate,
} from '../src/index.js';
import { closeTo } from './assert.js';
import { googleMaps, loadGoogleMapsData } from './data/google-maps.js';
import * as places from './data/places.js';

test.before(async () => {
  await loadGoogleMapsData();
});

test('computeArea', (t) => {
  closeTo(
    t,
    computeArea([places.london, places.donostia, places.newyork]),
    googleMaps['computeArea(london, donostia, newyork)']
  );

  closeTo(t, computeArea(places.path), googleMaps['computeArea(...path)']);
});

test('computeDistanceBetween', (t) => {
  closeTo(
    t,
    computeDistanceBetween(places.london, places.newyork),
    googleMaps['computeDistanceBetween(london, newyork)']
  );
});

test('computeHeading', (t) => {
  closeTo(
    t,
    computeHeading(places.london, places.newyork),
    googleMaps['computeHeading(london, newyork)']
  );
});

test('computeLength', (t) => {
  closeTo(
    t,
    computeLength([
      places.london,
      places.newyork,
      places.moscow,
      places.sydney,
    ]),
    googleMaps['computeLength(london, newyork, moscow, sydney)']
  );
});

test('computeOffset', (t) => {
  t.true(
    equalLatLngs(
      computeOffset(places.london, 5576353.232683, -71.669371),
      googleMaps['computeOffset(london, 5576353.232683, -71.669371)']
    )
  );
});

test('computeOffsetOrigin', (t) => {
  /**
   * @param {import('../src/index.js').LatLngLike | null} a
   * @param {import('../src/index.js').LatLngLike | null} b
   */
  function equal(a, b) {
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    return equalLatLngs(a, b);
  }

  t.true(
    equal(
      computeOffsetOrigin(places.london, 3000, 10),
      googleMaps['computeOffsetOrigin(london, 3000, 10)']
    )
  );
  t.true(
    equal(
      computeOffsetOrigin(places.london, 5576353.232683, -71.669371),
      googleMaps['computeOffsetOrigin(london, 5576353.232683, -71.669371)']
    )
  );
});

test('computeSignedArea', (t) => {
  closeTo(
    t,
    computeSignedArea([places.london, places.donostia, places.newyork]),
    googleMaps['computeSignedArea(london, donostia, newyork)']
  );
});

test('interpolate', (t) => {
  t.deepEqual(
    interpolate(places.newyork, places.sydney, 0.7).toJSON(),
    googleMaps['interpolate(newyork, sydney, 0.7)']
  );
});
