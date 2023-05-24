import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { t } from 'i18next';
import React from 'react';
import EditButton from '../../core/EditButton';
import WrapperCard from '../../core/WrapperCard';
import { ReservationDataType } from '../../../models/Reservation';
import moment from 'moment';
import Divider from '../../core/Divider';
import { CalendarDaysIcon, CalendarIcon } from '@heroicons/react/24/solid';

interface CategoryRateCardProps {
  reservation?: ReservationDataType;
  onEdit?: () => void;
}

const CategoryRateCard = ({ reservation, onEdit }: CategoryRateCardProps) => {
  return (
    <WrapperCard className="!p-5">
      <div className="mb-8 flex items-start justify-between sm:items-center">
        <h2 className="text-xl font-bold lg:text-2xl">{t('La tua prenotazione')}</h2>
        {onEdit ? <EditButton className="flex" onClick={() => onEdit()} /> : null}
      </div>

      {reservation?.categoryRates?.map((categoryRate, index) => {
        return (
          <div key={categoryRate.idCategory + categoryRate.idRate}>
            <div className="mt-5 h-fit justify-between lg:mt-0 lg:flex lg:gap-3">
              {/* Left side */}
              <div className="flex gap-3">
                <img
                  className={clsx('h-20 w-20 rounded object-cover', 'lg:h-28 lg:w-28')}
                  src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg"
                  alt=""
                />

                <div className="flex flex-col justify-between lg:p-0">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold lg:text-2xl">{categoryRate?.categoryName}</h3>

                    <div className="flex">
                      <span className="text-sm font-semibold text-primary-500">{categoryRate?.rateName}</span>
                      <InformationCircleIcon className="ml-1 h-4 w-4 text-dark" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-full">
                      {t('Quantità')}: {''} {categoryRate?.amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="mt-2 flex w-full items-center justify-between lg:w-fit lg:flex-col lg:items-end lg:text-right">
                <span className="first-letter:uppercase">{categoryRate.typology}</span>

                <span className=" text-2xl font-bold text-dark">
                  {Number(categoryRate?.price) * categoryRate?.amount}€
                </span>
                {/* <span className="text-xs text-dark">{peopleString}</span> */}
              </div>
              {/* {onEdit ? <EditButton className="flex lg:hidden" onClick={() => onEdit()} /> : null} */}
            </div>

            <Divider className="my-2 lg:my-4" />
          </div>
        );
      })}

      <div className="mt-4 flex items-start justify-between gap-4 lg:items-center">
        <div className="flex items-start gap-1 text-base text-dark">
          <CalendarDaysIcon className="mr-1 inline-block h-6 min-w-[20px] text-dark" />
          <span className="mt-0.5">
            {t('Dal')} <span className="font-semibold"> {moment(reservation?.startDate).format('DD/MM/YYYY')}</span>{' '}
            {t('al')} <span className="font-semibold"> {moment(reservation?.endDate).format('DD/MM/YYYY')} </span>
          </span>
        </div>
        <span className=" block text-right text-xl font-bold">
          Totale: <span className="text-2xl text-free"> {reservation?.totalPrice}€ </span>
        </span>
      </div>
    </WrapperCard>
  );
};

export default CategoryRateCard;
