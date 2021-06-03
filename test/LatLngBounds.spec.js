import test from 'ava';
import { LatLngBounds } from '../src/index.js';
import { googleMaps, loadGoogleMapsData } from './data/google-maps.js';
import { bigIsland, hawaii, newyork, oahu } from './data/places.js';

test.before(async () => {
  await loadGoogleMapsData();
});

test('should construct bounds', (t) => {
  t.notThrows(() => new LatLngBounds());
  t.notThrows(() => new LatLngBounds([0, 0]));
  t.notThrows(() => new LatLngBounds([0, 0], [1, 1]));
});

test('should convert to string like Google Maps', (t) => {
  t.is(hawaii.toString(), googleMaps['bounds.toString()']);
  t.is(String(hawaii), googleMaps['bounds.toString()']);
});

test('should convert to URL value like Google Maps', (t) => {
  t.is(hawaii.toUrlValue(), googleMaps['bounds.toUrlValue()']);
  t.is(hawaii.toUrlValue(3), googleMaps['bounds.toUrlValue(3)']);
});

test('should be equal to itself', (t) => {
  t.true(hawaii.equals(hawaii));
  t.false(hawaii.equals(bigIsland));
});

test('should be equal to LatLngBoundsLiteral version', (t) => {
  t.true(hawaii.equals(hawaii.toJSON()));
  t.false(hawaii.equals(bigIsland.toJSON()));
});

test('should return true if a point is contained in the bounds', (t) => {
  const corner = oahu.getNorthEast();
  const outerCorner = bigIsland.getSouthWest();
  t.true(hawaii.contains(corner));
  t.false(hawaii.contains(outerCorner));
});

test('should return true if bounds intersect', (t) => {
  t.true(hawaii.intersects(bigIsland));
  t.true(hawaii.intersects(oahu));
});

test('should return true if empty', (t) => {
  t.true(new LatLngBounds([0, 0], [0, 0]).isEmpty());
  t.false(hawaii.isEmpty());
});

test('should be able to extend its bounds', (t) => {
  const oahu1 = new LatLngBounds(oahu.getSouthWest(), oahu.getNorthEast());
  t.deepEqual(oahu1.extend(newyork).toJSON(), googleMaps['bounds.extend()']);
});

test('should be able to find the union of two bounds', (t) => {
  const hawaii1 = new LatLngBounds(
    hawaii.getSouthWest(),
    hawaii.getNorthEast()
  );
  const hawaii2 = new LatLngBounds(
    hawaii.getSouthWest(),
    hawaii.getNorthEast()
  );
  t.deepEqual(hawaii1.union(oahu).toJSON(), googleMaps['bounds.union(oahu)']);
  t.deepEqual(
    hawaii2.union(bigIsland).toJSON(),
    googleMaps['bounds.union(bigIsland)']
  );
});
