import { promises as fs } from 'fs';

/** @type {import('./google-maps.json')} */
export let googleMaps;

export async function loadGoogleMapsData() {
  const path = new URL('./google-maps.json', import.meta.url);
  googleMaps = JSON.parse(await fs.readFile(path, 'utf8'));
  return googleMaps;
}
