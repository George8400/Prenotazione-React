import { CheckCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutlet, useNavigate } from 'react-router-dom';
import WrapperCard from '../components/core/WrapperCard';
import SearchSidebar from '../components/shared/search-sidebar/SearchSidebar';
import searchAnimation from '../assets/animations/search-animation.json';

const Reservation = () => {
  const { t, i18n } = useTranslation();

  const outlet = useOutlet();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const onChangeEditing = useCallback((isEditing: boolean) => {
    setIsEditing(isEditing);
  }, []);

  const onSearch = useCallback((data: any) => {
    console.log(data);
    navigate('/risultati');
  }, []);

  return (
    <div className="py-10 relative min-h-full">
      <div className="container flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 w-full sm:max-w-xs xl:max-w-search-sidebar">
          {/* Sidebar */}
          <div className={clsx('w-full')}>
            {/* SEGNAPOSTO */}
            <div
              className={clsx('h-[344px]', {
                hidden: !isEditing,
              })}
            />

            <div
              className={clsx('transition-all duration-200 z-10 inset-0', {
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
                  className="sm:max-w-xs xl:max-w-search-sidebar"
                />
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

            <p className="flex items-start text-xs mt-5 md:mt-1.5 font-open">
              {t(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ',
              )}
            </p>

            <div className="mt-5 md:mt-3.5 flex items-center gap-4">
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

          {outlet || (
            <div className="flex w-full items-center flex-col justify-center h-80 md:order-2">
              <Lottie animationData={searchAnimation} className="w-20 h-20" loop />
              <span className="text-sm max-w-[150px] text-center text-stone-500">
                {t('Cerca la soluzione ideale per te!')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
