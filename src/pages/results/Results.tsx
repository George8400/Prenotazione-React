import { useTranslation } from 'react-i18next';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/core/Button';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { CheckAvailabilityResponseType, ListaCategorie, ListaTariffaPrezzi } from '../../models/apiData/CategoryRate';
import { ApiRoutes } from '../../api/routes/apiRoutes';
import { fetcher } from '../../api/utils/fetcher';
import { CategoryRateDataType, CheckAvailabilityDataType, ReservationDataType } from '../../models/Reservation';
import useReservation from '../../store/hook/useReservation';
import Badge from '../../components/core/Badge';
import { checkCategoryRate } from './utils/utils';
import Api from '../../api/controller/Api';
import { useAppSelector } from '../../hook/useRTK';
import InputSpinner from '../../components/core/InputSpinner';

const Results = () => {
  const { resultsCheckAvailability } = useAppSelector((state) => state);

  const { updateReservation, reservation } = useReservation();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const nextStep = () => {
    navigate('/checkout');
  };

  const addCategoryRate = useCallback(
    (category: Omit<ListaCategorie, 'listaTariffaPrezzi'>, rate: ListaTariffaPrezzi, amount: number) => {
      const { categoryRates } = reservation;

      const newCategoryRates = checkCategoryRate(categoryRates, category, rate);

      updateReservation({
        ...reservation,
        categoryRates: newCategoryRates,
      });
    },
    [reservation],
  );

  return (
    <div className="space-y-8 pb-20 md:order-2">
      {resultsCheckAvailability?.listaCategorie.map((categoria, index) => {
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
                loading="lazy"
                className="object-cover lg:h-44 lg:w-44 lg:rounded-md"
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
              const rateSelected = reservation.categoryRates.find((item) => {
                return item.idRate === tariffaPrezzi.idTariffa && item.idCategory === categoria.idCategoria;
              });

              return (
                <div
                  key={tariffaPrezzi.idTariffa + rateSelected}
                  className={clsx('flex w-full flex-col gap-2', {
                    'bg-stone-200': index % 2 === 0,
                  })}
                >
                  <div className="items-center justify-between gap-3 p-3 lg:flex">
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

                    <div className="mt-4 flex items-center justify-end lg:mt-0 lg:justify-center">
                      <InputSpinner
                        value={rateSelected?.amount}
                        max={3}
                        onChange={(value) => addCategoryRate(categoria, tariffaPrezzi, value)}
                      />
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
            onClick={nextStep}
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
