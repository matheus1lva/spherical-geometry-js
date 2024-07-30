"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  EARTH_RADIUS: () => EARTH_RADIUS,
  LatLng: () => LatLng,
  LatLngBounds: () => LatLngBounds,
  computeArea: () => computeArea,
  computeDistanceBetween: () => computeDistanceBetween,
  computeHeading: () => computeHeading,
  computeLength: () => computeLength,
  computeOffset: () => computeOffset,
  computeOffsetOrigin: () => computeOffsetOrigin,
  computeSignedArea: () => computeSignedArea,
  convertLatLng: () => convert,
  convertLatLngLiteral: () => convertLiteral,
  equalLatLngs: () => equals,
  interpolate: () => interpolate,
  toDegrees: () => toDegrees,
  toRadians: () => toRadians
});
module.exports = __toCommonJS(src_exports);

// src/utils.js
var EARTH_RADIUS = 6378137;
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}
function toRadians(angleDegrees) {
  return angleDegrees * Math.PI / 180;
}

// src/float-equal.js
function floatEqual(a, b) {
  if (a === b) {
    return true;
  }
  const diff = Math.abs(a - b);
  return diff < Number.EPSILON;
}

// src/convert.js
function convert(like) {
  if (like instanceof LatLng) {
    return new LatLng(like[LAT], like[LNG]);
  } else if ("lat" in like && "lng" in like) {
    if (typeof like.lat == "function" && typeof like.lng == "function") {
      return new LatLng(like.lat(), like.lng());
    } else {
      return new LatLng(parseFloat(like.lat), parseFloat(like.lng));
    }
  } else if ("lat" in like && "long" in like) {
    return new LatLng(parseFloat(like.lat), parseFloat(like.long));
  } else if ("lat" in like && "lon" in like) {
    return new LatLng(parseFloat(like.lat), parseFloat(like.lon));
  } else if ("latitude" in like && "longitude" in like) {
    return new LatLng(parseFloat(like.latitude), parseFloat(like.longitude));
  } else if (typeof like[0] === "number" && typeof like[1] === "number") {
    return new LatLng(like[1], like[0]);
  } else if ("x" in like && "y" in like) {
    return new LatLng(parseFloat(like.y), parseFloat(like.x));
  } else {
    throw new TypeError(`Cannot convert ${like} to LatLng`);
  }
}
function convertLiteral(literal) {
  return new LatLng(literal.lat, literal.lng);
}
function equals(one, two) {
  one = convert(one);
  two = convert(two);
  return floatEqual(one[LAT], two[LAT]) && floatEqual(one[LNG], two[LNG]);
}

// src/latlng.js
var LAT = "latitude";
var LNG = "longitude";
var LatLng = class {
  /**
   * @param {number} lat
   * @param {number} lng
   * @param {boolean} noWrap
   */
  constructor(lat, lng, noWrap = false) {
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      throw TypeError("lat or lng are not numbers");
    }
    if (!noWrap) {
      lat = Math.min(Math.max(lat, -90), 90);
      lng = lng == 180 ? lng : ((lng + 180) % 360 + 360) % 360 - 180;
    }
    Object.defineProperty(this, LAT, { value: lat });
    Object.defineProperty(this, LNG, { value: lng });
    this.length = 2;
    Object.freeze(this);
  }
  /**
   * Comparison function
   * @param {LatLng} other
   * @returns {boolean}
   */
  equals(other) {
    return equals(this, other);
  }
  /**
   * Returns the latitude in degrees.
   * (I'd rather use getters but this is for consistency)
   * @returns {number}
   */
  lat() {
    return this[LAT];
  }
  /**
   * Returns the longitude in degrees.
   * (I'd rather use getters but this is for consistency)
   * @returns {number}
   */
  lng() {
    return this[LNG];
  }
  /** @type {number} alias for lng */
  get x() {
    return this[LNG];
  }
  /** @type {number} alias for lat */
  get y() {
    return this[LAT];
  }
  /** @type {number} alias for lng */
  get 0() {
    return this[LNG];
  }
  /** @type {number} alias for lat */
  get 1() {
    return this[LAT];
  }
  /** @type {number} alias for lng */
  get long() {
    return this[LNG];
  }
  /** @type {number} alias for lng */
  get lon() {
    return this[LNG];
  }
  /**
   * Converts to JSON representation. This function is intended to be used via
   * JSON.stringify.
   * @returns {LatLngLiteral}
   */
  toJSON() {
    return { lat: this[LAT], lng: this[LNG] };
  }
  /**
   * Converts to string representation.
   * @returns {string}
   */
  toString() {
    return `(${this[LAT]}, ${this[LNG]})`;
  }
  /**
   * Returns a string of the form "lat,lng" for this LatLng. We round the
   * lat/lng values to 6 decimal places by default.
   * @param {number} [precision=6]
   * @returns {string}
   */
  toUrlValue(precision = 6) {
    precision = parseInt(precision);
    return parseFloat(this[LAT].toFixed(precision)) + "," + parseFloat(this[LNG].toFixed(precision));
  }
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < this.length) {
          return { value: this[i++], done: false };
        } else {
          return { done: true };
        }
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  }
};

// src/compute-distance-between.js
function computeDistanceBetweenHelper(from, to) {
  const radFromLat = toRadians(from.lat());
  const radFromLng = toRadians(from.lng());
  const radToLat = toRadians(to.lat());
  const radToLng = toRadians(to.lng());
  return 2 * Math.asin(
    Math.sqrt(
      Math.pow(Math.sin((radFromLat - radToLat) / 2), 2) + Math.cos(radFromLat) * Math.cos(radToLat) * Math.pow(Math.sin((radFromLng - radToLng) / 2), 2)
    )
  );
}
function computeDistanceBetween(from, to, radius = EARTH_RADIUS) {
  from = convert(from);
  to = convert(to);
  return computeDistanceBetweenHelper(from, to) * radius;
}

// src/compute-signed-area.js
function sphericalExcess(a, b, c) {
  const polygon = [a, b, c, a];
  const distances = [];
  let sumOfDistances = 0;
  for (let i = 0; i < 3; i++) {
    distances[i] = computeDistanceBetweenHelper(polygon[i], polygon[i + 1]);
    sumOfDistances += distances[i];
  }
  const semiPerimeter = sumOfDistances / 2;
  let tan = Math.tan(semiPerimeter / 2);
  for (let i = 0; i < 3; i++) {
    tan *= Math.tan((semiPerimeter - distances[i]) / 2);
  }
  return 4 * Math.atan(Math.sqrt(Math.abs(tan)));
}
function sphericalSign(a, b, c) {
  const matrix = [a, b, c].map((point) => {
    const lat = toRadians(point.lat());
    const lng = toRadians(point.lng());
    return [
      Math.cos(lat) * Math.cos(lng),
      Math.cos(lat) * Math.sin(lng),
      Math.sin(lat)
    ];
  });
  return 0 < matrix[0][0] * matrix[1][1] * matrix[2][2] + matrix[1][0] * matrix[2][1] * matrix[0][2] + matrix[2][0] * matrix[0][1] * matrix[1][2] - matrix[0][0] * matrix[2][1] * matrix[1][2] - matrix[1][0] * matrix[0][1] * matrix[2][2] - matrix[2][0] * matrix[1][1] * matrix[0][2] ? 1 : -1;
}
function computeSphericalExcess(a, b, c) {
  return sphericalExcess(a, b, c) * sphericalSign(a, b, c);
}
function computeSignedArea(loop, radius = EARTH_RADIUS) {
  if (loop.length < 3) return 0;
  loop = loop.map((v) => convert(v));
  let total = 0;
  for (var i = 1; i < loop.length - 1; i++) {
    total += computeSphericalExcess(loop[0], loop[i], loop[i + 1]);
  }
  return total * radius * radius;
}

// src/compute-area.js
function computeArea(path, radius = EARTH_RADIUS) {
  return Math.abs(computeSignedArea(path, radius));
}

// src/compute-heading.js
function fmod(angle, start, end) {
  end -= start;
  return ((angle - start) % end + end) % end + start;
}
function computeHeading(from, to) {
  from = convert(from);
  to = convert(to);
  const fromLat = toRadians(from.lat());
  const toLat = toRadians(to.lat());
  const deltaLng = toRadians(to.lng()) - toRadians(from.lng());
  const angle = toDegrees(
    Math.atan2(
      Math.sin(deltaLng) * Math.cos(toLat),
      Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(deltaLng)
    )
  );
  return fmod(angle, -180, 180);
}

// src/compute-length.js
function computeLength(path, radius = EARTH_RADIUS) {
  let length = 0;
  for (let i = 0; i < path.length - 1; i++)
    length += computeDistanceBetween(path[i], path[i + 1], radius);
  return length;
}

// src/compute-offset.js
function computeOffset(from, distance, heading, radius = EARTH_RADIUS) {
  from = convert(from);
  distance /= radius;
  heading = toRadians(heading);
  const fromLat = toRadians(from.lat());
  const cosDistance = Math.cos(distance);
  const sinDistance = Math.sin(distance);
  const sinFromLat = Math.sin(fromLat);
  const cosFromLat = Math.cos(fromLat);
  const sc = cosDistance * sinFromLat + sinDistance * cosFromLat * Math.cos(heading);
  return new LatLng(
    toDegrees(Math.asin(sc)),
    toDegrees(
      toRadians(from.lng()) + Math.atan2(
        sinDistance * cosFromLat * Math.sin(heading),
        cosDistance - sinFromLat * sc
      )
    )
  );
}

// src/compute-offset-origin.js
function computeOffsetOrigin(to, distance, heading, radius = EARTH_RADIUS) {
  to = convert(to);
  distance /= radius;
  heading = toRadians(heading);
  const quarterRadian = Math.PI / 2;
  const toLat = toRadians(to.lat());
  const toLng = toRadians(to.lng());
  const cosDistance = Math.cos(distance);
  const sinDistance = Math.sin(distance);
  const lngHeading = Math.cos(heading);
  const latHeading = Math.sin(heading);
  const lngSinHeading = sinDistance * lngHeading;
  const latSinHeading = sinDistance * latHeading;
  const sinToLat = Math.sin(toLat);
  const lngSinHeadingSquared = lngSinHeading * lngSinHeading;
  const cosDistanceSquared = cosDistance * cosDistance;
  const lotsOfMathSquared = lngSinHeadingSquared * cosDistanceSquared + cosDistanceSquared * cosDistanceSquared - cosDistanceSquared * sinToLat * sinToLat;
  if (0 > lotsOfMathSquared) return null;
  const lotsOfMath = Math.sqrt(lotsOfMathSquared);
  const distByLng = cosDistanceSquared + lngSinHeadingSquared;
  const moreMath = (lngSinHeading * sinToLat + lotsOfMath) / distByLng;
  const evenMoreMath = (sinToLat - lngSinHeading * moreMath) / cosDistance;
  let latRadian = Math.atan2(evenMoreMath, moreMath);
  if (latRadian < -quarterRadian || latRadian > quarterRadian) {
    latRadian = lngSinHeading * sinToLat - lotsOfMath;
    latRadian = Math.atan2(evenMoreMath, latRadian / distByLng);
  }
  if (latRadian < -quarterRadian || latRadian > quarterRadian) return null;
  return new LatLng(
    toDegrees(latRadian),
    toDegrees(
      toLng - Math.atan2(
        latSinHeading,
        cosDistance * Math.cos(latRadian) - lngSinHeading * Math.sin(latRadian)
      )
    )
  );
}

// src/interpolate.js
function interpolate(from, to, fraction) {
  from = convert(from);
  to = convert(to);
  const radFromLat = toRadians(from.lat()), radFromLng = toRadians(from.lng()), radToLat = toRadians(to.lat()), radToLng = toRadians(to.lng()), cosFromLat = Math.cos(radFromLat), cosToLat = Math.cos(radToLat);
  const radDist = computeDistanceBetweenHelper(from, to);
  const sinRadDist = Math.sin(radDist);
  if (1e-6 > sinRadDist) return from;
  const a = Math.sin((1 - fraction) * radDist) / sinRadDist;
  const b = Math.sin(fraction * radDist) / sinRadDist;
  const c = a * cosFromLat * Math.cos(radFromLng) + b * cosToLat * Math.cos(radToLng);
  const d = a * cosFromLat * Math.sin(radFromLng) + b * cosToLat * Math.sin(radToLng);
  return new LatLng(
    toDegrees(
      Math.atan2(
        a * Math.sin(radFromLat) + b * Math.sin(radToLat),
        Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2))
      )
    ),
    toDegrees(Math.atan2(d, c))
  );
}

// src/latlng-bounds.js
var LatLngBounds = class _LatLngBounds {
  /**
   * @param {LatLngLike} [sw] southwest
   * @param {LatLngLike} [ne] northeast
   */
  constructor(sw, ne) {
    this.sw = convert(sw || [1, 180]);
    if (!ne) {
      ne = sw ? sw : [-1, -180];
    }
    this.ne = convert(ne);
  }
  /**
   * Check if point is within bounds.
   * @param {LatLngLike} latlng
   * @returns {boolean}
   */
  contains(latlng) {
    const [lng, lat] = convert(latlng);
    return this.sw.lat() <= lat && lat <= this.ne.lat() && this.sw.lng() <= lng && lng <= this.ne.lng();
  }
  /**
   * Check if two bounds are equal.
   * @param {LatLngBounds | LatLngBoundsLiteral} other
   * @returns {boolean}
   */
  equals(other) {
    if (!other) {
      return false;
    } else if (other instanceof _LatLngBounds) {
      return equals(this.sw, other.getSouthWest()) && equals(this.ne, other.getNorthEast());
    } else if ([other.north, other.south, other.east, other.west].every(
      (n) => typeof n === "number"
    )) {
      const literal = this.toJSON();
      return other.north === literal.north && other.south === literal.south && other.east === literal.east && other.west === literal.west;
    } else {
      return false;
    }
  }
  /**
   * Mutate the bounds to include the given point.
   * @param {LatLngLike} point
   * @returns {LatLngBounds}
   */
  extend(point) {
    point = convert(point);
    this.sw = new LatLng(
      Math.min(this.sw.lat(), point.lat()),
      Math.min(this.sw.lng(), point.lng())
    );
    this.ne = new LatLng(
      Math.max(this.ne.lat(), point.lat()),
      Math.max(this.ne.lng(), point.lng())
    );
    return this;
  }
  /**
   * Computes and returns the center point of the bounds.
   * @returns {LatLng}
   */
  getCenter() {
    return new LatLng(
      (this.sw.lat() + this.ne.lat()) / 2,
      (this.sw.lng() + this.ne.lng()) / 2
    );
  }
  /** @returns {LatLng} */
  getNorthEast() {
    return this.ne;
  }
  /** @returns {LatLng} */
  getSouthWest() {
    return this.sw;
  }
  /**
   * Check if two bounds intersect at all.
   * @param {LatLngBounds} other
   * @returns {boolean}
   */
  intersects(other) {
    return this.contains(other.getSouthWest()) || this.contains(other.getNorthEast());
  }
  /**
   * Return true if the southwest and northeast corners are equal.
   */
  isEmpty() {
    return equals(this.sw, this.ne);
  }
  /**
   * Convert into a LatLngBoundsLiteral.
   */
  toJSON() {
    return {
      east: this.ne.lng(),
      north: this.ne.lat(),
      south: this.sw.lat(),
      west: this.sw.lng()
    };
  }
  toSpan() {
    throw new Error("Unsupported");
  }
  toString() {
    return `(${this.sw}, ${this.ne})`;
  }
  /**
   * @param {number} [precision]
   * @returns
   */
  toUrlValue(precision) {
    return this.sw.toUrlValue(precision) + "," + this.ne.toUrlValue(precision);
  }
  /**
   * Mutate the bounds to include the other bounds.
   * @param {LatLngBounds} other
   * @returns {LatLngBounds}
   */
  union(other) {
    if (!(other instanceof _LatLngBounds)) {
      throw new TypeError(`${other} is not a LatLngBounds`);
    }
    return this.extend(other.getSouthWest()).extend(other.getNorthEast());
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EARTH_RADIUS,
  LatLng,
  LatLngBounds,
  computeArea,
  computeDistanceBetween,
  computeHeading,
  computeLength,
  computeOffset,
  computeOffsetOrigin,
  computeSignedArea,
  convertLatLng,
  convertLatLngLiteral,
  equalLatLngs,
  interpolate,
  toDegrees,
  toRadians
});
