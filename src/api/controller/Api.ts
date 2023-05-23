import { ReservationDataType } from '../../models/Reservation';
import { BlockRoomsDataType, CheckAvailabilityDataType } from '../../models/Reservation';
import { CheckAvailabilityResponseType } from '../../models/apiResponseData/CategoryRate';
import { ApiRoutes } from '../routes/apiRoutes';
import { fetcher } from '../utils/fetcher';
import { TemporaryReservationBodyType } from '../../models/apiRequestData/TemporaryReservationBody';

class Api {
  static searchCategoryRate = async (data: CheckAvailabilityDataType) => {
    const res: CheckAvailabilityResponseType = await fetcher(ApiRoutes.VERIFICA_DISPONIBILITA_API, {
      method: 'POST',
      body: JSON.stringify({
        dataDiArrivo: data.startDate,
        dataDiPartenza: data.endDate,
        numeroAdulti: data.numAdults,
        numeroBambini: data.numChildren,
        numeroCamere: data.numRooms,
        coupon: data.coupon,
      }),
    });

    return res;
  };

  static blockRooms = async (data: BlockRoomsDataType) => {
    const body: {
      dataDiArrivo: string;
      dataDiPartenza: string;
      richiesteCategoria: {
        idCategoria: string;
        quantita: string;
      }[];
    } = {
      dataDiArrivo: data.startDate,
      dataDiPartenza: data.endDate,
      richiesteCategoria: data.listCategory.map((item) => {
        return {
          idCategoria: item.idCategory,
          quantita: item.amount,
        };
      }),
    };

    const res = await fetcher(ApiRoutes.BLOCCA_STANZE_API, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return res;
  };

  static temporaryReservation = async (data: ReservationDataType) => {
    // il tipo corrisponde a ReservationDataType
    const body: TemporaryReservationBodyType = {
      nome: data.firstName,
      cognome: data.lastName,
      email: data.email,
      numeroDiTelefono: data.phone,
      dataDiArrivo: data.startDate,
      dataDiPartenza: data.endDate,
      alloggi: data.rooms.map((item) => item.toString()),
      categorieTariffe: data.categoryRates.map((item) => {
        return {
          categoria: item.idCategory,
          tariffa: item.idRate,
          alloggio: null,
          numeroAdulti: item.numAdults.toString(),
          numeroBambini: item.numChildren.toString(),
          etaBambini: item.ageChildren.toString(),
          prezzo: item.price,
          quantita: item.amount.toString(),
        };
      }),
      idEvento: data.idEvent,
      listaNote: data.notes,
      numeroAlloggi: data.numRooms.toString(),
      numeroAdulti: data.numAdults.toString(),
      numeroBambini: data.numChildren.toString(),
      etaBambini: data.ageChildren.toString(),
      acconto: data.advancePayment.toString(),
      totale: data.totalPrice.toString(),
      coupon: data.coupon,
    };

    const res = await fetcher(ApiRoutes.PRENOTA_API, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return res;
  };

  static createOrder = async (idPrenotazione: string) => {
    const res = await fetcher(ApiRoutes.CREA_ORDINE_API + `/${idPrenotazione}`);
    return res;
  };

  static captureReservation = async (tokenPaypal: string) => {
    const res = await fetcher(ApiRoutes.PRENOTAZIONE_API + `?token=${tokenPaypal}`);
    return res;
  };
}

export default Api;
