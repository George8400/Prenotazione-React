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
      <div className="flex justify-between items-end">
        <h2 className="text-xl font-bold lg:text-2xl">{t('La tua prenotazione')}</h2>
        {onEdit ? <EditButton onClick={() => onEdit()} /> : null}
      </div>

      <div className={clsx('lg:gap-3 lg:flex mt-5 justify-between items-end')}>
        <div className="flex gap-3">
          <img
            className=" object-cover lg:w-28 lg:h-28 lg:rounded"
            src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg"
            alt=""
          />

          <div className="p-3 lg:p-0 flex flex-col justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold lg:text-2xl">{typeRoomName}</h2>

              <div className="flex">
                <span className="text-sm font-semibold text-primary-500">{rateName}</span>
                <InformationCircleIcon className="w-4 h-4 text-dark ml-1" />
              </div>
            </div>

            <span className="text-sm text-dark mt-auto block">{rangeDate}</span>
          </div>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-dark text-2xl font-bold">{price}</span>
          <span className="text-dark text-xs text-right">{peopleString}</span>
        </div>
      </div>
    </WrapperCard>
  );
};

export default CategoryRateCard;
