import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import checkAnimation from '../../assets/animations/check-animation.json';
import SmartCheckinInput from '../../components/shared/smart-checkin/SmartCheckinInput';
import useReservation from '../../store/hook/useReservation';
import CategoryRateCard from '../../components/shared/cards/CategoryRateCard';
import { useLayoutEffect } from 'react';
import WrapperCard from '../../components/core/WrapperCard';
import { UserIcon } from '@heroicons/react/24/outline';

const CheckoutSuccess = () => {
  const { reservation } = useReservation();

  const { firstName, lastName, email, phone } = reservation;

  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (!reservation.confirmReservation || !reservation.paymentMade) {
      window.location.href = '/';
    }
  }, [reservation]);

  return (
    <div className="container max-w-3xl animate-fadeIn py-16">
      <div className="flex flex-col items-center gap-16">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* <CheckCircleIcon className="w-24 h-24 text-green-500" /> */}
          <Lottie animationData={checkAnimation} loop className="h-24 w-24 min-w-[60px]" />
          <p className=" text-3xl font-bold text-dark lg:text-4xl">
            {t('La tua prenotazione è stata effettuata correttamente')}
          </p>
        </div>

        <div className="w-full space-y-4">
          <CategoryRateCard reservation={reservation} />

          <WrapperCard className="w-full">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-end gap-2">
                <UserIcon className="h-8 w-8 text-dark" />
                <h2 className="translate-y-1 text-xl font-bold lg:text-2xl">{t('Intestatario')}</h2>
              </div>
              <div className="flex flex-col items-start gap-4">
                <p className="w-fit text-lg text-dark  lg:text-lg">
                  {t('Nome')}: <strong>{`${firstName} ${lastName}`}</strong>
                </p>
                <p className="w-fit text-lg text-dark lg:text-lg">
                  {t('Email')}: <strong>{email}</strong>
                </p>
                <p className="w-fit text-lg text-dark lg:text-lg">
                  {t('Telefono')}: <strong>{phone}</strong>
                </p>
              </div>
            </div>
          </WrapperCard>
        </div>

        <div className="space-y-20">
          {Array.from({
            length: 2,
          }).map((_, index) => (
            <SmartCheckinInput key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
