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
    test.skip('computeArea', () => {
        expect(
            computeArea([places.london, places.donostia, places.newyork]),
        ).toBeCloseTo(googleMaps['computeArea(london, donostia, newyork)']);

        expect(computeArea(places.path)).toBeCloseTo(
            googleMaps['computeArea(...path)'],
        );
    });

    test('computeDistanceBetween', () => {
        expect(
            computeDistanceBetween(places.london, places.newyork),
        ).toBeCloseTo(googleMaps['computeDistanceBetween(london, newyork)']);
    });

    test.skip('computeHeading', () => {
        expect(computeHeading(places.london, places.newyork)).toBeCloseTo(
            googleMaps['computeArea(london, donostia, newyork)'],
        );
    });

    test.skip('computeLength', () => {
        expect(
            computeLength([
                places.london,
                places.newyork,
                places.moscow,
                places.sydney,
            ]),
        ).toBeCloseTo(googleMaps['computeArea(london, donostia, newyork)']);
    });

    test('computeOffset', () => {
        expect(
            equalLatLngs(
                computeOffset(places.london, 5576353.232683, -71.669371),
                googleMaps['computeOffset(london, 5576353.232683, -71.669371)'],
            ),
        ).toBe(true);
    });

    test.skip('computeSignedArea', () => {
        expect(
            computeSignedArea([places.london, places.donostia, places.newyork]),
        ).toBeCloseTo(
            googleMaps['computeSignedArea(london, donostia, newyork)'],
        );
    });

    test.skip('interpolate', () => {
        expect(
            equalLatLngs(
                interpolate(places.newyork, places.sydney, 0.7),
                googleMaps['interpolate(newyork, sydney, 0.7)'],
            ),
        ).toBe(true);
    });
});
