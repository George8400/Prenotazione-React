// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface TemporaryReservationResponse {
  codicePrenotazione: string;
  dataDiArrivo: string;
  dataDiPartenza: string;
  nomeGruppo: null;
  numeroAlloggi: number;
  numeroAdulti: number;
  numeroBambini: number;
  etaBambini: number;
  totale: number;
  totalePagato: boolean;
  prenotazioneDiGruppo: boolean;
  evento: null;
  ospiti: null;
  intestatario: Intestatario;
  configurazionePrenotazione: null;
  alloggi: Alloggi[];
  coupon: null;
  id: number;
}

export interface ListaImmagini {
  nome: string;
  path: string;
  categoria: Categoria;
  id: number;
}

export interface Categoria {
  idChannelManager: null;
  shortName: string;
  nome: string;
  numeroPosti: number;
  numeroLetti: number;
  disponibilitaTot: number;
  descrizione: string;
  prezzoDefault: number;
  sincronizzaSuOTA: boolean;
  tipologia: string;
  listaImmagini?: ListaImmagini[];
  id: number;
  listaAlloggi?: Alloggi[];
}

export interface Alloggi {
  nomeAlloggio: string;
  accessibilita: boolean;
  attiva: boolean;
  numeroLettiMatrimoniali: number;
  numeroLettiSingoli: number;
  categoria?: Categoria;
  id: number;
}

export interface Intestatario {
  nome: string;
  cognome: string;
  statoDiNascita: null;
  luogoDiNascita: null;
  dataDiNascita: null;
  cittadinanza: null;
  genere: null;
  tipoDiDocumento: null;
  numeroDocumento: null;
  luogoDocumento: null;
  tipoDiAlloggiato: null;
  email: string;
  numeroDiTelefono: string;
  ospiteOTA: boolean;
  id: number;
}