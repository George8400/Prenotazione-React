export type TemporaryReservationBodyType = {
  nome: string;
  cognome: string;
  email: string;
  numeroDiTelefono: string;
  dataDiArrivo: string;
  dataDiPartenza: string;
  alloggi: string[]; // lista alloggi resituita da blockRooms
  categorieTariffe: {
    categoria: string;
    tariffa: string;
    alloggio: string | null;
    numeroAdulti: string;
    numeroBambini: string;
    etaBambini: string;
    prezzo: string;
    quantita: string;
  }[];
  idEvento: string;
  listaNote: string[];
  numeroAlloggi: string;
  numeroAdulti: string;
  numeroBambini: string;
  etaBambini: string;
  acconto: string;
  totale: string;
  coupon: string;
};
