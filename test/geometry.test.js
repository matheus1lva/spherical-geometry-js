const {
    computeArea,
    computeDistanceBetween,
    computeHeading,
    computeLength,
    computeOffset,
    computeSignedArea,
    interpolate,
    equalLatLngs,
} = require('../');
const places = require('./data/places');
const googleMaps = require('./data/google-maps.json');

describe('Spherical geometry Google Maps', () => {
    test('computeArea', () => {
        expect(
            computeArea([places.london, places.donostia, places.newyork])
        ).toBeCloseTo(googleMaps['computeArea(london, donostia, newyork)']);

        expect(computeArea(places.path)).toBeCloseTo(
            googleMaps['computeArea(...path)']
        );
    });

    test('computeDistanceBetween', () => {
        expect(
            computeDistanceBetween(places.london, places.newyork)
        ).toBeCloseTo(googleMaps['computeDistanceBetween(london, newyork)']);
    });

    test('computeHeading', () => {
        expect(computeHeading(places.london, places.newyork)).toBeCloseTo(
            googleMaps['computeHeading(london, newyork)']
        );
    });

    test('computeLength', () => {
        expect(
            computeLength([
                places.london,
                places.newyork,
                places.moscow,
                places.sydney,
            ])
        ).toBeCloseTo(
            googleMaps['computeLength(london, newyork, moscow, sydney)']
        );
    });

    test('computeOffset', () => {
        expect(
            equalLatLngs(
                computeOffset(places.london, 5576353.232683, -71.669371),
                googleMaps['computeOffset(london, 5576353.232683, -71.669371)']
            )
        ).toBe(true);
    });

    test('computeSignedArea', () => {
        expect(
            computeSignedArea([places.london, places.donostia, places.newyork])
        ).toBeCloseTo(
            googleMaps['computeSignedArea(london, donostia, newyork)']
        );
    });

    test('interpolate', () => {
        expect(
            interpolate(places.newyork, places.sydney, 0.7).toJSON()
        ).toEqual(googleMaps['interpolate(newyork, sydney, 0.7)']);
    });
});
