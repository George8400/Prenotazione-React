import { CheckCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutlet } from 'react-router-dom';
import WrapperCard from '../components/core/WrapperCard';
import SearchSidebar from '../components/shared/search-sidebar/SearchSidebar';
import searchAnimation from '../assets/animations/search-animation.json';
import useReservation from '../store/hook/useReservation';
import Overlay from '../components/shared/overlay/Overlay';
import useSearch from '../hook/useSearch';
import Timer from '../components/shared/timer/Timer';
import ExpiredReservationDialog from '../components/shared/dialog/ExpiredReservationDialog';
import sadAnimation from '../assets/animations/sad-animation.json';
import clockAnimation from '../assets/animations/clock-animation.json';

/**
 * Funnel Step:
 * 1. index.tsx --> Check availability --> /risultati
 * 2. Block room (internal) --> /checkout
 * 3. Temporary Reservation
 * 4. Payment
 * 5. Smart Checkin
 */

const Reservation = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { t } = useTranslation();
  const outlet = useOutlet();
  const navigate = useNavigate();

  const { isLoading, onSearch } = useSearch();
  const { checkAvailability, reservation, updateReservation } = useReservation();

  const onChangeEditing = useCallback((isEditing: boolean) => {
    setIsEditing(isEditing);
  }, []);

  const expiredTimer = useCallback(() => {
    console.log('expiredTimer');
    updateReservation({ expired: true });
  }, []);

  const gotToReservation = useCallback(() => {
    if (reservation?.confirmReservation) {
      navigate('/checkout');
    } else {
      navigate('/risultati');
    }
  }, []);

  useLayoutEffect(() => {
    if (reservation.expired) {
      updateReservation(undefined, 'reset');
      onSearch(checkAvailability);
    }
  }, []);

  return (
    <div className="relative min-h-full py-10">
      <div className="container flex flex-col gap-6 pb-20 md:flex-row">
        <div className="flex w-full flex-col gap-6 md:max-w-xs xl:max-w-search-sidebar">
          {/* Sidebar */}
          <div className={clsx('w-full')}>
            {/* SEGNAPOSTO */}
            <div
              className={clsx('h-[344px]', {
                hidden: !isEditing,
              })}
            />

            <div
              className={clsx('inset-0 z-10 transition-all duration-200', {
                relative: !isEditing,
                'absolute bg-dark/60 ': isEditing,
              })}
            >
              <div
                className={clsx('', {
                  'container translate-y-10 ': isEditing,
                })}
              >
                {/* La tua ricerca */}
                <SearchSidebar
                  onSearch={onSearch}
                  onChangeEditing={onChangeEditing}
                  initialData={checkAvailability}
                  className="md:max-w-xs xl:max-w-search-sidebar"
                />
              </div>
            </div>
          </div>

          {/* Prenota sul nostro sito Desktop */}
          <WrapperCard className={clsx('hidden', 'md:block')}>
            <h2 className="text-xl font-bold">{t('Prenota sul nostro sito')}</h2>

            {new Array(3).fill(1).map((_, index) => (
              <p key={index} className="mt-5 flex items-start font-open text-xs">
                <CheckCircleIcon className="mb-0.5 mr-2 h-5 w-5 text-primary-500" />
                {t('Prenota direttamente sul nostro sito')}
              </p>
            ))}
          </WrapperCard>

          {/* Timer */}
          {reservation.timer && !reservation.paymentMade ? (
            <WrapperCard
              onClick={gotToReservation}
              className="border-transp cursor-pointer border hover:border-primary-400
            hover:shadow-xl"
            >
              <div className="flex h-16 flex-row-reverse items-center justify-between gap-4">
                <p>{t('La tua prenotazione è ancora valida')}</p>
                <div className="">
                  <Timer duration={60 * 15} initialRemainingTime={reservation.timer} onCompleted={expiredTimer} />
                </div>
              </div>
            </WrapperCard>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-6">
          {/* Prenota sul nostro sito */}
          <WrapperCard className={clsx('order-2', 'md:hidden')}>
            <h2 className="text-xl font-bold">{t('Prenota sul nostro sito')}</h2>

            {new Array(3).fill(1).map((_, index) => (
              <p key={index} className="mt-5 flex items-start font-open text-xs">
                <CheckCircleIcon className="mb-0.5 mr-2 h-5 w-5 text-primary-500" />
                {t('Prenota direttamente sul nostro sito')}
              </p>
            ))}
          </WrapperCard>

          {/* Serve aiuto */}
          <WrapperCard className={clsx('order-3 h-fit', 'md:order-1')}>
            <h2 className="text-xl font-bold">{t('Serve aiuto?')}</h2>

            <p className="mt-5 flex items-start font-open text-xs md:mt-1.5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 md:mt-3.5">
              <a
                href="tel:+39 0981 948072"
                className="inline-flex items-center whitespace-nowrap rounded-full pr-4 text-xs shadow-full"
              >
                <PhoneIcon className="mr-2 h-7 w-7 rounded-full bg-primary-500 p-2 text-white" />
                +39 0981 948072
              </a>

              <a
                href="mailto:info@famigliabarbieri.net"
                className="inline-flex items-center whitespace-nowrap rounded-full pr-4 text-xs shadow-full"
              >
                <EnvelopeIcon className="mr-2 h-7 w-7 rounded-full bg-primary-500 p-2 text-white" />
                info@famigliabarbieri.net
              </a>
            </div>
          </WrapperCard>

          {outlet || (
            <div className="order-1 flex h-80 w-full flex-col items-center justify-center md:order-2">
              <Lottie animationData={searchAnimation} className="h-32 w-32" loop />
              <span className="max-w-[150px] text-center text-sm text-stone-500">
                {t('Cerca la soluzione ideale per te!')}
              </span>
            </div>
          )}
        </div>
      </div>

      <Overlay isOpen={isLoading} />

      <ExpiredReservationDialog
        isOpen={reservation.expired}
        onClose={() => {
          updateReservation(undefined, 'reset');
          onSearch(checkAvailability);
        }}
        title={t('La tua prenotazione è scaduta')}
        description={t('La tua prenotazione è scaduta, riprova a fare una nuova ricerca')}
        buttonLabel="Nuova ricerca"
        jsonAnimation={sadAnimation}
      />
    </div>
  );
};

export default Reservation;
