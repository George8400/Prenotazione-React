import { useTranslation } from 'react-i18next';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/core/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { ListaCategorie, ListaTariffaPrezzi } from '../../models/apiResponseData/CategoryRate';
import useReservation from '../../store/hook/useReservation';
import Badge from '../../components/core/Badge';
import { checkCategoryRate } from './utils/utils';
import { useAppSelector } from '../../hook/useRTK';
import InputSpinner from '../../components/core/InputSpinner';
import Divider from '../../components/core/Divider';
import useBreakPoint from '../../hook/useBreakPoint';
import Api from '../../api/controller/Api';
import moment from 'moment';
import Overlay from '../../components/shared/overlay/Overlay';
import useSearch from '../../hook/useSearch';
import ErrorDialog from '../../components/shared/dialog/ErrorDialog';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../assets/animations/not-found-animation.json';

const Results = () => {
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const { resultsCheckAvailability } = useAppSelector((state) => state);

  const { updateReservation, updateBlockRooms, reservation, checkAvailability } = useReservation();

  const { isLoading, refreshSearch } = useSearch();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { greaterThanMd } = useBreakPoint();

  const addCategoryRate = useCallback(
    (category: Omit<ListaCategorie, 'listaTariffaPrezzi'>, rate: ListaTariffaPrezzi, amount: number) => {
      const { categoryRates } = reservation;

      const { newCategoryRates, totalRooms, totalPrice } = checkCategoryRate(categoryRates, category, rate, amount);

      updateReservation({
        startDate: checkAvailability.startDate,
        endDate: checkAvailability.endDate,
        categoryRates: newCategoryRates,
        numAdults: checkAvailability.numAdults,
        numChildren: checkAvailability.numChildren,
        totalRooms: totalRooms,
        totalPrice: totalPrice,
        numNights: moment(checkAvailability.endDate).diff(moment(checkAvailability.startDate), 'days'),
      });
    },
    [reservation],
  );

  const nextStep = () => {
    if (!checkAvailability?.startDate || !checkAvailability?.endDate) throw new Error('data is required');

    let mapListIdCategory = new Map<string, { idCategory: string; amount: string }>();

    reservation.categoryRates.forEach((item) => {
      if (mapListIdCategory.has(item.idCategory)) return;

      mapListIdCategory.set(item.idCategory, {
        idCategory: item.idCategory,
        amount: reservation.categoryRates
          .filter((itemFiltered) => item.idCategory === itemFiltered.idCategory)
          .reduce((acc, curr) => acc + curr.amount, 0)
          .toString(),
      });
    });

    Api.blockRooms({
      startDate: checkAvailability?.startDate,
      endDate: checkAvailability?.endDate,
      listCategory: Array.from(mapListIdCategory.values()),
    })
      .then((res) => {
        const { categorieMancanti, idAlloggi } = res;

        if (categorieMancanti?.length <= 0 && idAlloggi?.length > 0) {
          updateBlockRooms(idAlloggi);

          updateReservation({
            confirmReservation: true,
            rooms: idAlloggi,
            timer: new Date(),
          });

          return navigate('/checkout');
        } else {
          // mostrare un alert con le categorie mancanti
          setErrorMessage({
            title: t('Camere non più disponibili'),
            message: t('Le camere selezionate non sono più disponibili. Seleziona nuove camere.'),
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
        setErrorMessage({
          title: t('Ooops!'),
          message: t('Qualcosa è andato storto. Riprova più tardi. :('),
        });
      });
  };

  useEffect(() => {
    if (reservation.confirmReservation) {
      updateReservation({
        confirmReservation: false,
      });
    }
  }, []);

  return (
    <div className="space-y-8 md:order-2">
      {resultsCheckAvailability?.listaCategorie.length > 0 ? (
        <>
          {resultsCheckAvailability?.listaCategorie.map((categoria, index) => {
            const categorySelected = reservation.categoryRates.some(
              (item) => item.idCategory === categoria.idCategoria,
            );

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
                <div className={clsx('flex w-full flex-col justify-between lg:flex-row')}>
                  <div className="w-full flex-grow lg:flex lg:gap-3 lg:p-4">
                    <img
                      loading="lazy"
                      className="object-cover lg:h-44 lg:w-44 lg:rounded-md"
                      src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg"
                      alt=""
                    />

                    <div className="w-full p-3 lg:p-0">
                      <h2 className="text-xl font-bold lg:text-2xl">{categoria?.categoria}</h2>
                      <p className="mt-1 text-xs text-gray-500">{categoria?.descrizione}</p>

                      <span className="mt-3 block font-semibold">1 letto matrimoniale ??</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 pt-0 lg:flex-col lg:p-4">
                    <p className="text-right first-letter:uppercase">{categoria.tipologia}</p>

                    <p className="whitespace-nowrap text-right text-xs text-stone-400">
                      {t('Disponibilità')} {categoria.quantitaDisponibile}
                    </p>
                  </div>
                </div>
                {/* Tariffe */}
                {categoria?.listaTariffaPrezzi?.map((tariffaPrezzi, index) => {
                  const rateSelected = reservation.categoryRates.find((item) => {
                    return item.idRate === tariffaPrezzi.idTariffa && item.idCategory === categoria.idCategoria;
                  });

                  const totalRoomsForCategory = reservation.categoryRates.reduce((acc, item) => {
                    if (item.idCategory === categoria.idCategoria) {
                      return acc + item.amount;
                    }
                    return acc;
                  }, 0);

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
                            <span className="text-xl font-bold text-dark">
                              {Number(tariffaPrezzi.prezzo).toFixed(0)} €
                            </span>
                          </div>

                          <div className="flex justify-between ">
                            <a href="/" className="group flex items-center text-xs hover:text-sky-600 hover:underline">
                              <InformationCircleIcon className="mb-0.5 mr-1 h-3.5 w-3.5 " />
                              {t('Maggiori informazioni')}
                            </a>
                            <span className="text-right text-xs text-dark">
                              {t('Prezzo per')}
                              <span> {reservation.numNights} </span>
                              {reservation.numNights > 1 ? t(' notti') : t(' notte')}
                            </span>
                          </div>
                        </div>

                        <Divider direction="vertical" className="mx-2 hidden !h-11 !bg-gray-300 lg:block" />

                        <div className="mt-4 flex items-center justify-end lg:mt-0 lg:justify-center">
                          <InputSpinner
                            value={rateSelected?.amount}
                            max={Math.min(checkAvailability.numRooms, Number(categoria.quantitaDisponibile))}
                            onChange={(value) => addCategoryRate(categoria, tariffaPrezzi, value)}
                            disabledIncrement={
                              reservation.totalRooms >= checkAvailability.numRooms ||
                              Number(totalRoomsForCategory) >= Number(categoria.quantitaDisponibile)
                            }
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
            <div className="container flex items-center justify-between gap-4">
              <p className="text-base md:text-xl [&>span]:text-free">
                {t('Hai selezionato')} <span className="font-semibold ">{reservation?.totalRooms}</span>{' '}
                {reservation?.totalRooms === 1 ? t('camera') : t('camere')} {t('di')}{' '}
                <span className="font-semibold ">{checkAvailability.numRooms}</span>
              </p>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-dark">{t('Totale')}</span>
                  <span className="text-xl font-semibold text-free">{reservation?.totalPrice} €</span>
                </div>
                <Button
                  border="default"
                  disabled={reservation?.totalRooms < checkAvailability.numRooms}
                  itemType="submit"
                  size={greaterThanMd ? 'large' : 'medium'}
                  className="w-fit"
                  onClick={nextStep}
                >
                  {t('Prosegui')}
                  {reservation?.totalRooms !== 0 ? (
                    <Badge className="absolute -right-2 -top-1/2 translate-y-1/2">{reservation.totalRooms}</Badge>
                  ) : null}
                </Button>
              </div>
            </div>
          </div>

          <ErrorDialog
            title={t(errorMessage?.title || 'Errore')}
            description={t(errorMessage?.message || 'Si è verificato un errore')}
            isOpen={Boolean(errorMessage)}
            onClose={() => {
              setErrorMessage(null);
              refreshSearch();
            }}
          />

          <Overlay isOpen={isLoading} />
        </>
      ) : null}

      {resultsCheckAvailability?.listaCategorie.length === 0 && !isLoading ? (
        <div className="flex h-full flex-col items-center justify-center py-10">
          <Lottie animationData={notFoundAnimation} className="h-full w-full max-w-xs" loop />

          <p className="text-center text-2xl font-semibold">{t('Nessun risultato trovato')}</p>
          <p className="text-center">{t('Prova a modificare i parametri di ricerca')}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Results;
