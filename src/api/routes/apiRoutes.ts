enum ApiType {
  VERIFICA_DISPONIBILITA_API = 'VERIFICA_DISPONIBILITA_API',
  PRENOTA_API = 'PRENOTA_API',
  CREA_ORDINE_API = 'CREA_ORDINE_API',
  PRENOTAZIONE_API = 'PRENOTAZIONE_API',
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('🚀 ~ file: apiEndpoints.ts:9 ~ API_BASE_URL:', API_BASE_URL);

const VERIFICA_DISPONIBILITA_API = new URL('/prenotazione/disponibilita/sito', API_BASE_URL);
const PRENOTA_API = new URL('/prenotazione/sito/prenota', API_BASE_URL).toString();
const CREA_ORDINE_API = new URL('/prenotazione/sito/creaordine', API_BASE_URL).toString();
const PRENOTAZIONE_API = new URL('prenotazione/capture/prenotazione', API_BASE_URL).toString();

const ApiRoutes: Record<ApiType, string> = {
  VERIFICA_DISPONIBILITA_API: VERIFICA_DISPONIBILITA_API.toString(),
  PRENOTA_API: PRENOTA_API,
  CREA_ORDINE_API: CREA_ORDINE_API,
  PRENOTAZIONE_API: PRENOTAZIONE_API,
};

export { ApiRoutes, ApiType };
