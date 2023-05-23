import { CategoryRateDataType } from '../../../models/Reservation';
import { ListaCategorie, ListaTariffaPrezzi } from '../../../models/apiResponseData/CategoryRate';

export const checkCategoryRate = (
  categoryRates: CategoryRateDataType[],
  category: Omit<ListaCategorie, 'listaTariffaPrezzi'>,
  rate: ListaTariffaPrezzi,
  amount: number,
) => {
  let newCategoryRates: CategoryRateDataType[] = [];
  let newCategoryRate: CategoryRateDataType = {
    idCategory: category.idCategoria,
    ageChildren: 9999,
    amount: amount,
    numAdults: 1,
    numChildren: 0,
    price: rate.prezzo,
    idRate: rate.idTariffa,
    room: 1,
  };

  // se la categoria con la relativa tariffa è già presente, aggiorno l'amount
  const categoryRateIndex = categoryRates.findIndex(
    (item) => item.idCategory === newCategoryRate.idCategory && item.idRate === newCategoryRate.idRate,
  );

  if (categoryRateIndex !== -1) {
    // se l'amount è 0, rimuovo la categoria con la relativa tariffa
    if (amount === 0) {
      newCategoryRates = categoryRates.filter((item, index) => categoryRateIndex !== index);
    } else {
      newCategoryRates = categoryRates.map((item, index) => {
        if (categoryRateIndex === index) {
          return {
            ...item,
            amount: amount,
          };
        } else {
          return item;
        }
      });
    }
  } else {
    newCategoryRates = [...categoryRates, newCategoryRate];
  }

  const totalRooms = newCategoryRates.reduce((acc, item) => acc + item.amount, 0);
  const totalPrice = newCategoryRates.reduce((acc, item) => acc + item.amount * Number(item.price), 0);

  return { newCategoryRates, totalRooms, totalPrice };
};
