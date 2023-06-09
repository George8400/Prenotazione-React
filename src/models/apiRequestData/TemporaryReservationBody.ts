export type TemporaryReservationBodyType = {
  nome: string;
  cognome: string;
  email: string;
  numeroDiTelefono: string;
  dataDiArrivo: string;
  dataDiPartenza: string;
  alloggi: string[]; // lista alloggi resituita da blockRooms
  categorieTariffe: TemporaryReservationCategoryRateType[];
  idEvento?: number;
  listaNote: string[];
  numeroAlloggi: string;
  numeroAdulti: string;
  numeroBambini: string;
  etaBambini: string;
  totale: string;
  coupon: string;
};

type TemporaryReservationCategoryRateType = {
  categoria: string;
  tariffa: string;
  // alloggio: string | null;
  numeroAdulti: string;
  numeroBambini: string;
  etaBambini: string;
  prezzo: string;
  quantita: string;
};
