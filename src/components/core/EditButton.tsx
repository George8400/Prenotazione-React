import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import CustomTransition from './CustomTransition';

interface EditButtonProps {
  show?: boolean;
  onClick?: () => void;
}

const EditButton = ({ show = true, onClick }: EditButtonProps) => {
  return useMemo(
    () => (
      <CustomTransition show={show}>
        <span role="button" className="flex items-center gap-1.5 text-sm" onClick={onClick}>
          {t('Modifica')}
          <PencilSquareIcon className="text-primary-500 w-3.5 h-3.5 mb-0.5" />
        </span>
      </CustomTransition>
    ),
    [show, onClick],
  );
};

export default EditButton;
