import { InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { t } from 'i18next';
import React from 'react';
import EditButton from '../../core/EditButton';
import WrapperCard from '../../core/WrapperCard';

interface CategoryRateCardProps {
  typeRoomName: string;
  rateName: string;
  rangeDate: string;
  price: string;
  peopleString: string;
  onEdit?: () => void;
}

const CategoryRateCard = ({
  peopleString,
  price,
  rangeDate,
  rateName,
  typeRoomName,
  onEdit,
}: CategoryRateCardProps) => {
  return (
    <WrapperCard className="!p-5">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-bold lg:text-2xl">{t('La tua prenotazione')}</h2>
        {onEdit ? <EditButton className="hidden lg:flex" onClick={() => onEdit()} /> : null}
      </div>

      <div className="mt-5 items-end justify-between lg:flex lg:gap-3">
        <div className="flex gap-3">
          <img
            className={clsx('h-20 w-20 rounded object-cover', 'lg:h-28 lg:w-28')}
            src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg"
            alt=""
          />

          <div className="flex flex-col justify-between lg:p-0">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold lg:text-2xl">{typeRoomName}</h2>

              <div className="flex">
                <span className="text-sm font-semibold text-primary-500">{rateName}</span>
                <InformationCircleIcon className="ml-1 h-4 w-4 text-dark" />
              </div>
            </div>

            <span className="mt-auto block text-sm text-dark">{rangeDate}</span>
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between lg:mt-0">
          <div className="flex flex-col lg:justify-end lg:text-right">
            <span className="text-2xl font-bold text-dark">{price}</span>
            <span className="text-xs text-dark">{peopleString}</span>
          </div>
          {onEdit ? <EditButton className="flex lg:hidden" onClick={() => onEdit()} /> : null}
        </div>
      </div>
    </WrapperCard>
  );
};

export default CategoryRateCard;
