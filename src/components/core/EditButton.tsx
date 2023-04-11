import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import CustomTransition from './CustomTransition';

interface EditButtonProps {
  show?: boolean;
  className?: string;
  onClick?: () => void;
}

const EditButton = ({ show = true, className = '', onClick }: EditButtonProps) => {
  return useMemo(
    () => (
      <CustomTransition show={show}>
        <span role="button" className={'flex items-center gap-1.5 text-xs md:text-sm ' + className} onClick={onClick}>
          {t('Modifica')}
          <PencilSquareIcon className="mb-0.5 h-3 w-3 text-primary-500 md:h-3.5 md:w-3.5" />
        </span>
      </CustomTransition>
    ),
    [show, onClick],
  );
};

export default EditButton;
