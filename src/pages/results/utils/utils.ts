import { CategoryRateDataType } from '../../../models/Reservation';
import { ListaCategorie, ListaTariffaPrezzi } from '../../../models/apiData/CategoryRate';

export const checkCategoryRate = (
  categoryRates: CategoryRateDataType[],
  category: Omit<ListaCategorie, 'listaTariffaPrezzi'>,
  rate: ListaTariffaPrezzi,
) => {
  let newCategoryRates: CategoryRateDataType[] = [];
  let newCategoryRate: CategoryRateDataType = {
    idCategory: category.idCategoria,
    ageChildren: 9999,
    amount: 1,
    numAdults: 1,
    numChildren: 0,
    price: rate.prezzo,
    idRate: rate.idTariffa,
    room: 1,
  };

  if (categoryRates.some((item) => item.idCategory === newCategoryRate.idCategory)) {
    let precIdRate = categoryRates.find((item) => item.idCategory === newCategoryRate.idCategory)?.idRate;

    if (precIdRate === newCategoryRate.idRate) {
      newCategoryRates = categoryRates.map((item) => {
        if (item.idCategory === newCategoryRate.idCategory) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        } else {
          return item;
        }
      });
    } else {
      newCategoryRates = [...categoryRates, newCategoryRate];
    }
  } else {
    newCategoryRates = [...categoryRates, newCategoryRate];
  }

  return newCategoryRates;
};
