import {EARTH_RADIUS} from './utils.js';
import {convert} from './latlng.js';

/**
 * Returns the signed area of a closed path. The signed area may be used to 
 * determine the orientation of the path. The computed area uses the same units 
 * as the radius. The radius defaults to the Earth's radius in meters, in which 
 * case the area is in square meters.
 * @param {LatLng[]} loop
 * @param {number} [radius]
 * @returns {number}
 */
export default function computeOffset(
	from, distance, heading, radius = EARTH_RADIUS
) {
	
}