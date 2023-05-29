import Lottie from 'lottie-react';
import React from 'react';
import { CustomDialog, CustomDialogProps } from '../../core/CustomDialog';
import errorAnimation from '../../../assets/animations/error-animation.json';
import { useTranslation } from 'react-i18next';

interface ErrorDialogProps extends CustomDialogProps {
  title: string;
  description: string;
}

const ErrorDialog = ({ isOpen, onClose, className, description, title }: ErrorDialogProps) => {
  const { t } = useTranslation();

  return (
    <CustomDialog isOpen={isOpen} onClose={() => onClose()} className="!pt-0">
      <div className="flex flex-col items-center gap-4">
        <Lottie animationData={errorAnimation} className="h-full w-full" loop />

        <h2 className=" mt-4 text-3xl font-medium leading-6 text-gray-900">{title}</h2>

        <div className="mt-2">
          <p className="text-center text-base text-gray-500">{description}</p>
        </div>

        <div className="mt-4 w-full text-center">
          <button
            type="button"
            className="inline-flex w-1/2 justify-center rounded-md border border-transparent bg-red-400 px-4 py-1.5 text-sm font-medium text-white drop-shadow-lg hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={() => onClose()}
          >
            {t('Riprova')}
          </button>
        </div>
      </div>
    </CustomDialog>
  );
};

export default ErrorDialog;
