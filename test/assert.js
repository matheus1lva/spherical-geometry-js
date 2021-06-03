import { floatEqual } from '../src/float-equal.js';

/**
 * Assert that a float number is close to another value.
 * @param {import('ava').ExecutionContext} t
 * @param {number} actual Actual float value.
 * @param {number} expected Expected float value
 */
export function closeTo(t, actual, expected) {
  t.true(floatEqual(expected, actual), `${expected} not close to ${actual}`);
}
