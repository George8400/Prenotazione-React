import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchSidebar from '../../components/shared/search-sidebar/SearchSidebar';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/core/Button';
import clsx from 'clsx';
import WrapperCard from '../../components/core/WrapperCard';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

const Results = () => {
  const { t, i18n } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const onChangeEditing = useCallback((isEditing: boolean) => {
    setIsEditing(isEditing);
  }, []);

  return (
    <div className="py-10 relative">
      <div className="container flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 w-full sm:max-w-xs">
          {/* Sidebar */}
          <div className={clsx('w-full')}>
            {/* SEGNAPOSTO */}
            <div
              className={clsx('h-[344px]', {
                hidden: !isEditing,
              })}
            />

            <div
              className={clsx('transition-all duration-200', {
                relative: !isEditing,
                'absolute bg-dark/60 inset-0': isEditing,
              })}
            >
              <div
                className={clsx('', {
                  'container translate-y-10 ': isEditing,
                })}
              >
                {/* La tua ricerca */}
                <SearchSidebar onChangeEditing={onChangeEditing} className="sm:max-w-xs" />
              </div>
            </div>
          </div>

          {/* Prenota sul nostro sito Desktop */}
          <WrapperCard className={clsx('hidden', 'md:block')}>
            <h2 className="text-xl font-bold">{t('Prenota sul nostro sito')}</h2>

            {new Array(3).fill(1).map((_, index) => (
              <p key={index} className="flex items-start text-xs mt-5 font-open">
                <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2 mb-0.5" />
                {t('Prenota direttamente sul nostro sito')}
              </p>
            ))}
          </WrapperCard>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {/* RISULTATI */}
          <div
            className={clsx('flex flex-col items-center w-full rounded-md overflow-hidden shadow-full ', 'md:order-2')}
          >
            <div className={clsx('lg:gap-3 lg:flex lg:p-4')}>
              <img
                className=" object-cover lg:w-44 lg:h-44 lg:rounded-md"
                src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg"
                alt=""
              />

              <div className="p-3 lg:p-0">
                <h2 className="text-xl font-bold lg:text-2xl">Camera Matrimoniale</h2>
                <p className="text-gray-500 mt-1 text-xs">
                  Dotata di connessione Wi-Fi gratuita e aria condizionata, questa camera include una TV LCD con canali
                  satellitari e pay per view, e in alcuni casi presenta un balcone (in base alla disponibilità).{' '}
                </p>

                <span className="font-semibold mt-3 block">1 letto matrimoniale</span>
              </div>
            </div>
            {/* Tariffe */}
            {Array.from({
              length: 3,
            }).map((_, index) => {
              return (
                <div
                  key={index}
                  className={clsx('flex flex-col gap-2 w-full', {
                    'bg-stone-200': index % 2 === 0,
                  })}
                >
                  <div className="p-3 lg:flex gap-3 justify-between">
                    <div className="w-full">
                      <div className="flex justify-between ">
                        <h3 className="font-semibold">Trattamento B&B</h3>
                        <span className="text-dark text-2xl font-bold">80 €</span>
                      </div>

                      <div className="flex justify-between ">
                        <a href="/" className="flex text-xs items-center group hover:text-sky-600 hover:underline">
                          <InformationCircleIcon className="h-3.5 w-3.5 mr-1 mb-0.5 " />
                          {t('Maggiori informazioni')}
                        </a>
                        <span className="text-dark text-xs text-right">Prezzo per 2 notti - 2 adulti</span>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button border="full" size="small" className="w-fit">
                        {t('Seleziona')}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prenota sul nostro sito */}
          <WrapperCard className={clsx('', 'md:hidden')}>
            <h2 className="text-xl font-bold">{t('Prenota sul nostro sito')}</h2>

            {new Array(3).fill(1).map((_, index) => (
              <p key={index} className="flex items-start text-xs mt-5 font-open">
                <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2 mb-0.5" />
                {t('Prenota direttamente sul nostro sito')}
              </p>
            ))}
          </WrapperCard>

          {/* Serve aiuto */}
          <WrapperCard className={clsx('h-fit', 'md:order-1')}>
            <h2 className="text-xl font-bold">{t('Serve aiuto?')}</h2>

            <p className="flex items-start text-xs mt-5 font-open">
              {t(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ',
              )}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <a
                href="tel:+39 0981 948072"
                className="shadow-full whitespace-nowrap rounded-full text-xs inline-flex items-center pr-4"
              >
                <PhoneIcon className="h-7 w-7 text-white rounded-full p-2 bg-primary-500 mr-2" />
                +39 0981 948072
              </a>

              <a
                href="mailto:info@famigliabarbieri.net"
                className="shadow-full whitespace-nowrap rounded-full text-xs inline-flex items-center pr-4"
              >
                <EnvelopeIcon className="h-7 w-7 text-white rounded-full p-2 bg-primary-500 mr-2" />
                info@famigliabarbieri.net
              </a>
            </div>
          </WrapperCard>
        </div>
      </div>
    </div>
  );
};

export default Results;
