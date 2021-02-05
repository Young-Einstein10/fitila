import Geocode from "react-geocode";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(GOOGLE_API_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("ng");

// Enable or disable logs. Its optional.
// Geocode.enableDebug();

export { Geocode };
