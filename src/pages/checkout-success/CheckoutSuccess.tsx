import { CheckCircleIcon, PaperClipIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CategoryRateCard from '../../components/shared/cards/CategoryRateCard';
import Input from '../../components/core/Input';
import Button from '../../components/core/Button';
import Lottie from 'lottie-react';
import checkAnimation from '../../assets/animations/check-animation.json';
import SmartCheckinInput from '../../components/shared/smart-checkin/SmartCheckinInput';

const CheckoutSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="container max-w-3xl py-16">
      <div className="flex flex-col items-center gap-16">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* <CheckCircleIcon className="w-24 h-24 text-green-500" /> */}
          <Lottie animationData={checkAnimation} loop className="h-24 w-24 min-w-[60px]" />
          <p className=" text-3xl font-bold text-dark lg:text-4xl">
            {t('La tua prenotazione è stata effettuata correttamente')}
          </p>
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
