import {EARTH_RADIUS} from './utils.js';
import {convert} from './latlng.js';

/**
 * Returns the distance, in meters, between to LatLngs. You can optionally 
 * specify a custom radius. The radius defaults to the radius of the Earth.
 * @param {LatLng} from
 * @param {LatLng} to
 * @param {number} [radius]
 * @returns {number} distance
 */
export default function computeDistanceBetween(from, to, radius = EARTH_RADIUS) 
{

}