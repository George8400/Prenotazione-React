// Interfaccce definite con open quicktype

export interface CheckAvailabilityResponseType {
  coupon: Coupon;
  listaCategorie: ListaCategorie[];
}

export interface Coupon {
  valoreCoupon: string;
  message: string;
}

export interface ListaCategorie {
  idCategoria: string;
  categoria: string;
  descrizione: string;
  quantitaDisponibile: string;
  listaTariffaPrezzi: ListaTariffaPrezzi[];
}

export interface ListaTariffaPrezzi {
  idTariffa: string;
  tariffa: string;
  prezzo: string;
}
