import { CheckCircleIcon, PaperClipIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CategoryRateCard from '../../components/shared/cards/CategoryRateCard';
import Input from '../../components/core/Input';
import Button from '../../components/core/Button';
import Lottie from 'lottie-react';
import checkAnimation from '../../assets/animations/check-animation.json';

const CheckoutSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-16 max-w-3xl">
      <div className="flex flex-col items-center gap-16">
        <div className="flex items-center gap-6">
          {/* <CheckCircleIcon className="w-24 h-24 text-green-500" /> */}
          <Lottie animationData={checkAnimation} loop className="w-24 h-24" />
          <p className="text-4xl font-bold text-dark">{t('La tua prenotazione è stata effettuata correttamente')}</p>
        </div>

        <div className="space-y-20">
          {Array.from({
            length: 2,
          }).map((_, index) => (
            <div key={index}>
              <CategoryRateCard
                typeRoomName="Camera Matrimoniale"
                peopleString="Prezzo per 2 notti - 2 adulti"
                price="80 €"
                rangeDate="Dal 01/01/2021 al 03/01/2021"
                rateName="Trattamento B&B"
              />

              <div className="mt-9">
                <h2 className="font-bold text-2xl">{t('Smart Check-in')}</h2>
                <p className="text-xs font-open">
                  {t(
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                  )}
                </p>

                <div className="mt-8 flex gap-6">
                  <div className="flex flex-col gap-3 text-center w-fit">
                    <UserIcon className="w-14 h-14 p-3.5 bg-white shadow-full rounded-full text-dark" />
                    <span className="text-sm font-bold">{t('Ospite')}</span>
                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <Input
                      placeholder={t('Nome').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="firstName"
                      type="text"
                      id="firstName"
                    />

                    <Input
                      placeholder={t('Cognome').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="lastName"
                      type="text"
                      id="lastName"
                    />

                    <Input
                      placeholder={t('Luogo di nascita').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="place"
                      type="text"
                      id="place"
                    />

                    {/* DATA */}
                    <Input
                      placeholder={t('Data di nascita').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="bornDate"
                      type="text"
                      id="bornDate"
                    />

                    <Input
                      placeholder={t('Cittadinanza').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="citizenship"
                      type="text"
                      id="citizenship"
                    />

                    <Input
                      placeholder={t('Genere').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="gender"
                      type="text"
                      id="gender"
                    />

                    <Input
                      placeholder={t("Numero Carta d'Identità").toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="idCard"
                      type="text"
                      id="idCard"
                    />

                    <Input
                      placeholder={t('Rilasciata da').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="issuedBy"
                      type="text"
                      id="issuedBy"
                    />

                    <Input
                      placeholder={t('Scegli file').toString() + '*'}
                      classNameWrapper="col-span-3"
                      name="file"
                      type="file"
                      id="file"
                      Icon={PaperClipIcon}
                      itemType="file"
                    />

                    <Button variant="secondary" className="col-span-3">
                      {t('Prosegui')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
