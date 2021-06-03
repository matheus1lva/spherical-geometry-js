import { readFile } from 'fs/promises';

/** @type {import('./google-maps.json')} */
export let googleMaps;

export async function loadGoogleMapsData() {
  const path = new URL('./google-maps.json', import.meta.url);
  googleMaps = JSON.parse(await readFile(path, 'utf8'));
  return googleMaps;
}
