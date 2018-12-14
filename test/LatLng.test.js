const { LatLng, equalLatLngs, convertLatLng } = require('../');
const places = require('./data/places');
const googleMaps = require('./data/google-maps.json');

describe('LatLng', () => {
    it('should construct a point', () => {
        expect(() => new LatLng(0, 0)).not.toThrow();
    });

    it('should wrap large coordinates if specified', () => {
        const point = new LatLng(300, 300, false);
        expect(point.lat()).toBeCloseTo(90);
        expect(point.lng()).toBeCloseTo(-60);
    });

    it('should not wrap large coordinates if not specified', () => {
        const point = new LatLng(300, 300, true);
        expect(point.lat()).toBeCloseTo(300);
        expect(point.lng()).toBeCloseTo(300);
    });

    it('should convert to string like Google Maps', () => {
        expect(places.sydney.toString()).toBe(googleMaps['toString()']);
        expect(String(places.sydney)).toBe(googleMaps['toString()']);
    });

    it('should convert to URL value like Google Maps', () => {
        expect(places.sydney.toUrlValue()).toBe(googleMaps['toUrlValue()']);
        expect(places.sydney.toUrlValue(3)).toBe(googleMaps['toUrlValue(3)']);
    });

    it('should be equal to itself', () => {
        expect(places.sydney.equals(places.sydney)).toBe(true);
        expect(places.sydney.equals(places.buenosaires)).toBe(false);
    });

    it('should be equal to LatLngLiteral version', () => {
        expect(places.sydney.equals(places.sydney.toJSON())).toBe(true);
        expect(places.sydney.equals(places.buenosaires.toJSON())).toBe(false);
    });

    const points = [
        places.donostia,
        places.london,
        places.newyork,
        places.sydney,
        places.moscow,
        places.buenosaires,
    ];

    it('should alias latitude', () => {
        for (const place of points) {
            expect(place.lat()).toBe(place.y);
            expect(place.lat()).toBe(place[1]);
        }
    });

    it('should alias longitude', () => {
        for (const place of points) {
            expect(place.lng()).toBe(place.x);
            expect(place.lng()).toBe(place[0]);
            expect(place.lng()).toBe(place.long);
        }
    });
});

describe('equalLatLngs', () => {
    it('should be equal to itself', () => {
        expect(equalLatLngs(places.sydney, places.sydney)).toBe(true);
        expect(equalLatLngs(places.sydney, places.buenosaires)).toBe(false);
    });

    it('should be equal to LatLngLiteral version', () => {
        expect(equalLatLngs(places.sydney, places.sydney.toJSON())).toBe(true);
        expect(equalLatLngs(places.sydney, places.buenosaires.toJSON())).toBe(
            false
        );
    });
});

describe('covertLatLng', () => {
    it('should clone LatLngs', () => {
        const copy = convertLatLng(places.sydney);
        expect(copy).not.toBe(places.sydney);
        expect(copy.equals(places.sydney)).toBe(true);
    });
});
