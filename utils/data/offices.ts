/**
 * Linkfields office locations (official addresses: content/careers/CareersPage.json → ourPresence).
 * Coordinates are the cities of those addresses, used to place markers on the globe/map.
 */
export type OfficeGeo = { country: string; city: string; lat: number; lon: number };

export const OFFICE_GEO: OfficeGeo[] = [
  { country: "South Africa", city: "Midrand, Gauteng", lat: -25.99, lon: 28.13 },
  { country: "India", city: "Hyderabad", lat: 17.44, lon: 78.38 },
  { country: "USA", city: "New York", lat: 40.72, lon: -74.0 },
  { country: "UAE", city: "Dubai", lat: 25.19, lon: 55.27 },
  { country: "Australia", city: "Melbourne", lat: -37.82, lon: 144.96 },
];

/** Arcs drawn between offices (South Africa, where Linkfields was established in 2008, to the rest). */
export const OFFICE_LINKS: Array<[string, string]> = [
  ["South Africa", "UAE"],
  ["South Africa", "India"],
  ["South Africa", "USA"],
  ["South Africa", "Australia"],
  ["UAE", "India"],
];
