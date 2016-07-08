import {convert} from './latlng.js';
import {toRadians} from './utils.js'

/**
 * Returns the heading from one LatLng to another LatLng. Headings are expresss
 * in degrees clockwise from North within the range [-180, 180).
 * @param {LatLng} from
 * @param {LatLng} to
 * @returns {number}
 */
export default function computeHeading(from, to) {
	from = convert(from); to = convert(to);
	const fromLat = toRadians(from.lat()),
		toLat = toRadians(to.lat()),
		deltaLng = toRadians(to.lng()) - toRadians(from.lng());
	
	return 
}