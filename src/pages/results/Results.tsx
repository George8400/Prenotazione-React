import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SearchSidebar from '../../components/shared/search-sidebar/SearchSidebar';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/core/Button';
import clsx from 'clsx';

const Results = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {}, []);

  return (
    <div className="py-10">
      <div className="">
        {/* La tua ricerca */}
        <SearchSidebar />

        {/* RISULTATI */}
        <div className="flex flex-col items-center mt-8 rounded-md overflow-hidden shadow-full">
          <img src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg" alt="" />

          <div className="p-3">
            <h2 className="text-xl font-bold">Camera Matrimoniale</h2>
            <p className="text-gray-500 mt-1 text-xs">
              Dotata di connessione Wi-Fi gratuita e aria condizionata, questa camera include una TV LCD con canali
              satellitari e pay per view, e in alcuni casi presenta un balcone (in base alla disponibilità).{' '}
            </p>

            <span className="font-semibold mt-3 block">1 letto matrimoniale</span>
          </div>

          {/* Tariffe */}
          {Array.from({
            length: 3,
          }).map((_, index) => {
            const bgColor = index % 2 === 0 ? 'bg-stone-100' : 'bg-stone-200';

            return (
              <div
                className={clsx('flex flex-col gap-2 w-full', {
                  'bg-stone-200': index % 2 === 0,
                })}
              >
                <div className="p-3">
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

                  <div className="flex justify-end mt-4">
                    <Button border="full" className="w-fit">
                      {t('Seleziona')}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;
