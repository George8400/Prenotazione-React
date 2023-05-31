import { ReservationDataType } from '../../models/Reservation';
import { BlockRoomsDataType, CheckAvailabilityDataType } from '../../models/Reservation';
import { CheckAvailabilityResponseType } from '../../models/apiResponseData/CategoryRate';
import { ApiRoutes } from '../routes/apiRoutes';
import { fetcher } from '../utils/fetcher';
import { TemporaryReservationBodyType } from '../../models/apiRequestData/TemporaryReservationBody';
import moment from 'moment';
import { isArray } from 'util';

class Api {
  static searchCategoryRate = async (data: CheckAvailabilityDataType) => {
    const body: {
      dataDiArrivo: string;
      dataDiPartenza: string;
      numeroAdulti: number;
      numeroBambini: number;
      numeroCamere: number;
      coupon: string;
    } = {
      dataDiArrivo: moment(data.startDate).format('DD/MM/YYYY').toString(),
      dataDiPartenza: moment(data.endDate).format('DD/MM/YYYY').toString(),
      numeroAdulti: data.numAdults,
      numeroBambini: data.numChildren,
      numeroCamere: data.numRooms,
      coupon: data.coupon,
    };

    const res: CheckAvailabilityResponseType = await fetcher(ApiRoutes.VERIFICA_DISPONIBILITA_API, {
      method: 'POST',
      body: JSON.stringify(body),
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
      dataDiArrivo: moment(data.startDate).format('DD/MM/YYYY').toString(),
      dataDiPartenza: moment(data.endDate).format('DD/MM/YYYY').toString(),
      richiesteCategoria:
        data?.listCategory?.map((item) => {
          return {
            idCategoria: item.idCategory || '',
            quantita: item.amount?.toString() || '',
          };
        }) || [],
    };

    const res = await fetcher(ApiRoutes.BLOCCA_STANZE_API, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return res as {
      idAlloggi: string[];
      categorieMancanti: {
        idCategoria: string;
        nome: string;
        quantitaMancante: string;
      }[];
    };
  };

  static unblockRooms = async (idRooms: string[]) => {
    const res = await fetcher(ApiRoutes.SBLOCCA_STANZE_API, {
      method: 'POST',
      body: JSON.stringify(idRooms),
    });

    return res as {};
  };

  static temporaryReservation = async (data: ReservationDataType) => {
    // il tipo corrisponde a ReservationDataType
    const body: TemporaryReservationBodyType & Record<string, any> = {
      nome: data.firstName,
      cognome: data.lastName,
      email: data.email,
      numeroDiTelefono: data.phone,
      dataDiArrivo: moment(data.startDate).format('DD/MM/YYYY').toString(),
      dataDiPartenza: moment(data.endDate).format('DD/MM/YYYY').toString(),
      alloggi: data.rooms.map((item) => item.toString()),
      categorieTariffe: data.categoryRates.map((item) => {
        return {
          categoria: item.idCategory,
          tariffa: item.idRate,
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
      totale: data.totalPrice.toString(),
      coupon: data.coupon,
    };

    Object.keys(body).forEach((key) => !body[key] && delete body[key]);

    console.log(body);

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
