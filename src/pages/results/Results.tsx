import { useTranslation } from 'react-i18next';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/core/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { CheckAvailabilityResponseType } from '../../models/apiData/CategoryRate';
import { ApiRoutes } from '../../api/routes/apiRoutes';
import { fetcher } from '../../api/utils/fetcher';
import { CheckAvailabilityDataType } from '../../models/Reservation';
import useReservation from '../../store/hook/useReservation';
import { useAppSelector } from '../../hook/useRTK';

interface CategoryRateDataType {
  idCategorie: number[];
  idTariffe: number;
}

const Results = () => {
  const [data, setData] = useState<CheckAvailabilityResponseType>();

  const { checkAvailability } = useAppSelector((state) => state);

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const { updateCheckAvailability } = useReservation();

  const handleSelect = (selected: any) => {
    console.log(selected);
    navigate('/checkout');
  };

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

  useEffect(() => {
    onSearch(checkAvailability);
  }, []);

  useEffect(() => {
    if (data) {
      console.log('data', data);
    }
  }, [data]);

  return (
    <div className="space-y-8 md:order-2">
      {data?.listaCategorie.map((categoria, index) => (
        <div
          key={categoria.idCategoria}
          className={clsx('flex w-full animate-fadeIn flex-col items-start overflow-hidden rounded-md shadow-full')}
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
            return (
              <div
                key={index}
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
                    <Button border="full" size="small" className="w-fit" onClick={handleSelect}>
                      {t('Seleziona')}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* <div className="container sticky bottom-0 flex items-end justify-end bg-white ">
        <Button border="full" size="small" className="w-fit" onClick={handleSelect}>
          {t('Seleziona')}
        </Button>
      </div> */}
    </div>
  );
};

export default Results;
