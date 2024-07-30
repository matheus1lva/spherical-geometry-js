import test from 'ava';
import { equalLatLngs } from '../dist/index.js';
import { buenosaires, sydney } from './data/places.js';

test('should be equal to itself', (t) => {
  t.true(equalLatLngs(sydney, sydney));
  t.false(equalLatLngs(sydney, buenosaires));
});

test('should be equal to LatLngLiteral version', (t) => {
  t.true(equalLatLngs(sydney, sydney.toJSON()));
  t.false(equalLatLngs(sydney, buenosaires.toJSON()));
});
