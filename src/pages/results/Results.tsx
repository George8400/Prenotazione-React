import { useTranslation } from 'react-i18next';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/core/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { CheckAvailabilityResponseType, ListaCategorie, ListaTariffaPrezzi } from '../../models/apiData/CategoryRate';
import { ApiRoutes } from '../../api/routes/apiRoutes';
import { fetcher } from '../../api/utils/fetcher';
import { CategoryRateDataType, CheckAvailabilityDataType } from '../../models/Reservation';
import useReservation from '../../store/hook/useReservation';
import { useAppSelector } from '../../hook/useRTK';
import Badge from '../../components/core/Badge';

const Results = () => {
  const [data, setData] = useState<CheckAvailabilityResponseType>();
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { updateCheckAvailability, updateReservation, reservation, checkAvailability } = useReservation();

  const onSearch = useCallback(async (data: CheckAvailabilityDataType) => {
    updateCheckAvailability(data);
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

    setData(res);
  }, []);

  const handleSelectCategoryRate = (selected: any) => {
    console.log(selected);
    navigate('/checkout');
  };

  const addCategoryRate = useCallback(
    (category: Omit<ListaCategorie, 'listaTariffaPrezzi'>, rate: ListaTariffaPrezzi) => {
      const { categoryRates } = reservation;

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

      if (categoryRates.some((item) => item.idCategory === category.idCategoria)) {
        let precIdRate = categoryRates.find((item) => item.idCategory === category.idCategoria)?.idRate;

        newCategoryRates = categoryRates.filter((item) => {
          return item.idCategory !== category.idCategoria;
        });

        if (precIdRate !== rate.idTariffa) {
          newCategoryRates.push(newCategoryRate);
        }
      } else {
        newCategoryRates = [...categoryRates, newCategoryRate];
      }

      updateReservation({
        ...reservation,
        categoryRates: newCategoryRates,
      });
    },
    [checkAvailability, reservation],
  );

  useEffect(() => {
    onSearch(checkAvailability);

    return () => {
      console.log('reset reservation from results');
      setData(undefined);
      updateReservation(undefined, 'reset');
    };
  }, []);

  useEffect(() => {
    if (data) {
      console.log('data', data);
    }
  }, [data]);

  return (
    <div className="space-y-8 pb-20 md:order-2">
      {data?.listaCategorie.map((categoria, index) => {
        const categorySelected = reservation.categoryRates.some((item) => item.idCategory === categoria.idCategoria);

        return (
          <div
            key={categoria.idCategoria}
            className={clsx(
              'flex w-full animate-fadeIn flex-col items-start overflow-hidden rounded-md shadow-full transition-all duration-300',
              {
                '': categorySelected,
              },
            )}
          >
            <div className={clsx('lg:flex lg:gap-3 lg:p-4')}>
              <img
                className=" object-cover lg:h-44 lg:w-44 lg:rounded-md"
                src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg"
                alt=""
              />

              <div className="p-3 lg:p-0">
                <h2 className="text-xl font-bold lg:text-2xl">{categoria?.categoria}</h2>
                <p className="mt-1 text-xs text-gray-500">{categoria?.descrizione}</p>

                <span className="mt-3 block font-semibold">1 letto matrimoniale ??</span>
              </div>
            </div>
            {/* Tariffe */}
            {categoria?.listaTariffaPrezzi?.map((tariffaPrezzi, index) => {
              const rateSelected = reservation.categoryRates.some((item) => {
                return item.idRate === tariffaPrezzi.idTariffa && item.idCategory === categoria.idCategoria;
              });

              return (
                <div
                  key={tariffaPrezzi.idTariffa + rateSelected}
                  className={clsx('flex w-full flex-col gap-2', {
                    'bg-stone-200': index % 2 === 0,
                  })}
                >
                  <div className="justify-between gap-3 p-3 lg:flex">
                    <div className="w-full">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{tariffaPrezzi.tariffa}</h3>
                        <span className="text-2xl font-bold text-dark">{tariffaPrezzi.prezzo} €</span>
                      </div>

                      <div className="flex justify-between ">
                        <a href="/" className="group flex items-center text-xs hover:text-sky-600 hover:underline">
                          <InformationCircleIcon className="mb-0.5 mr-1 h-3.5 w-3.5 " />
                          {t('Maggiori informazioni')}
                        </a>
                        <span className="text-right text-xs text-dark">Prezzo per 2 notti - 2 adulti</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        variant={categorySelected && rateSelected ? 'primary' : 'outline'}
                        border="full"
                        size="small"
                        className="w-fit"
                        onClick={() => addCategoryRate(categoria, tariffaPrezzi)}
                      >
                        {t('Seleziona')}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <div className="fixed inset-x-0 bottom-0 border-t bg-white/60 py-5 backdrop-blur-md">
        <div className="container flex items-end justify-end">
          <Button
            border="default"
            disabled={reservation?.categoryRates?.length === 0}
            itemType="submit"
            size="medium"
            className="w-fit"
            onClick={handleSelectCategoryRate}
          >
            {t('Prosegui')}
            {reservation?.categoryRates?.length !== 0 ? (
              <Badge className="absolute -right-2 -top-1/2 translate-y-1/2">{reservation.categoryRates.length}</Badge>
            ) : null}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
