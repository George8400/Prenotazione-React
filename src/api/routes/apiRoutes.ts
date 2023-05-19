enum ApiType {
  VERIFICA_DISPONIBILITA_API = 'VERIFICA_DISPONIBILITA_API',
  PRENOTA_API = 'PRENOTA_API',
  CREA_ORDINE_API = 'CREA_ORDINE_API',
  PRENOTAZIONE_API = 'PRENOTAZIONE_API',
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('🚀 ~ file: apiEndpoints.ts:9 ~ API_BASE_URL:', API_BASE_URL);

const VERIFICA_DISPONIBILITA_API = API_BASE_URL + '/prenotazione/disponibilita/sito';
const PRENOTA_API = API_BASE_URL + '/prenotazione/sito/prenota';
const CREA_ORDINE_API = API_BASE_URL + '/prenotazione/sito/creaordine';
const PRENOTAZIONE_API = API_BASE_URL + '/prenotazione/capture/prenotazione';

const ApiRoutes: Record<ApiType, string> = {
  VERIFICA_DISPONIBILITA_API: VERIFICA_DISPONIBILITA_API,
  PRENOTA_API: PRENOTA_API,
  CREA_ORDINE_API: CREA_ORDINE_API,
  PRENOTAZIONE_API: PRENOTAZIONE_API,
};

export { ApiRoutes, ApiType };
