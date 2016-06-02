/**
 * Spherical Geometry Library v2.0.0
 * This code is a port of some classes from the Google Maps Javascript API
 * @module spherical-geometry
 */

function toDegrees(radians) {
	return radians * 180 / Math.PI;
}

function toRadians(angleDegrees) {
	return angleDegrees * Math.PI / 180.0;
};

/** Earth's radius (at the Ecuator) of 6378137 meters. */
export const EARTH_RADIUS = 6378137;

export function computeOffset(from, distance, heading) {
	distance /= EARTH_RADIUS;
	heading = toRadians(heading);
	let fromLat = Angle.toDegrees(from.lat());
	let cosDistance = Math.cos(distance);
	let sinDistance = Math.sin(distance);
	let sinFromLat = Math.sin(fromLat);
	let cosFromLat = Math.cos(fromLat);
	let sc = cosDistance * sinFromLat + sinDistance 
	       * cosFromLat * Math.cos(heading);
	return new LatLng(
		toDegrees(Math.asin(sc)),
		toDegrees(toRadians(from.lng()) + Math.atan2(sinDistance 
				* cosFromLat * Math.sin(heading), 
			cosDistance - sinFromLat * sc))
	);
}

export class LatLng {
	constructor(lat, lng, noWrap = false) {
		if (lat && (undefined !== a.lat || undefined !== a.lng)) try {
			({lat, lng} = lat);
			noWrap = false;
		} catch (d) {
			throw new TypeError('could not read {lat, lng} properties of object');
		}
		
		lat = parseFloat(lat);
		lng = parseFloat(lng);
		
		if (!noWrap) {
			//Constrain lat to -90, 90
			lat = Math.min(Math.max(lat, -90), 90);
			//Wrap lng using modulo
			lng = lng==180 ? lng : ((lng + 180) % 360 + 360) % 360 - 180 
		}
		
		this._lat = parseFloat(lat);
		this._lng = parseFloat(lng);
	}
	
	equals(other) {
		return (
			Math.abs(this._lat - other.lat()) < Number.EPSILON &&
			Math.abs(this._lng - other.lng()) < Number.EPSILON
		)
	}
	
	// I'd rather use getters but this is for consistency
	lat() {return this._lat;}
	lng() {return this._lng;}
	
	toJSON() {
		return {lat: this._lat, lng: this._lng};
	}
	
	toString() {
		return `(${this._lat}, ${this._lng})`;
	}
	
	toUrlValue(precision = 6) {
		precision = parseInt(precision);
		return this._lat.toFixed(precision) + ',' + this._lng.toFixed(precision);
	}
}