import { ReservationDataType } from '../../models/Reservation';
import { BlockRoomsDataType, CheckAvailabilityDataType } from '../../models/Reservation';
import { CheckAvailabilityResponseType } from '../../models/apiData/CategoryRate';
import { ApiRoutes } from '../routes/apiRoutes';
import { fetcher } from '../utils/fetcher';

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
    // const res = await fetcher(ApiRoutes.BLOCCA_CAMERE_API, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     dataDiArrivo: data.startDate,
    //     dataDiPartenza: data.endDate,
    //     numeroAdulti: data.numAdults,
    //     numeroBambini: data.numChildren,
    //     numeroCamere: data.numRooms,
    //     coupon: data.coupon,
    //     idTariffa: data.idRate,
    //     idCategoria: data.idCategory,
    //   }),
    // });
    // return res;
  };

  static checkoutReservation = async (data: ReservationDataType) => {};
}

export default Api;
