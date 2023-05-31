enum ApiType {
  VERIFICA_DISPONIBILITA_API = 'VERIFICA_DISPONIBILITA_API',
  PRENOTA_API = 'PRENOTA_API',
  BLOCCA_STANZE_API = 'BLOCCA_STANZE_API',
  CREA_ORDINE_API = 'CREA_ORDINE_API',
  PRENOTAZIONE_API = 'PRENOTAZIONE_API',
  SBLOCCA_STANZE_API = 'SBLOCCA_STANZE_API',
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ApiRoutes: Record<ApiType, string> = {
  VERIFICA_DISPONIBILITA_API: API_BASE_URL + '/prenotazione/disponibilita/sito',
  BLOCCA_STANZE_API: API_BASE_URL + '/alloggi/timer',
  PRENOTA_API: API_BASE_URL + '/prenotazione/sito/prenota',
  CREA_ORDINE_API: API_BASE_URL + '/prenotazione/sito/creaordine',
  PRENOTAZIONE_API: API_BASE_URL + '/prenotazione/capture/prenotazione',
  SBLOCCA_STANZE_API: API_BASE_URL + '/alloggi/alloggireset',
};

export { ApiRoutes, ApiType };
