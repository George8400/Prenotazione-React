import Lottie from 'lottie-react';
import { CustomDialog } from '../../core/CustomDialog';
import { useTranslation } from 'react-i18next';
import alertAnimation from '../../../assets/animations/alert-animation.json';

interface ConfirmDialogProps {
  isOpen: boolean;
  onAction: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({ isOpen, onAction, onClose }: ConfirmDialogProps) => {
  const { t } = useTranslation();

  return (
    <CustomDialog isOpen={isOpen} onClose={() => onClose()} className="">
      <div className="flex flex-col items-start gap-4 p-4">
        <div className="flex items-center gap-2">
          <Lottie animationData={alertAnimation} className="h-12 w-12" loop />
          <h2 className="mt-0.5 text-2xl font-medium leading-6 text-gray-900">{t('Modifica prenotazione?')}</h2>
        </div>

        <div className="mt-2">
          <p className="text-left text-base text-gray-500">
            {t('Se modifichi la prenotazione non possiamo garantire che gli alloggi selezionati rimangano liberi')}.
          </p>
          <p className="mt-4 text-left text-base font-semibold text-gray-700">
            {t('Continuare con la modifica della prenotazione?')}
          </p>
        </div>

        <div className="mt-4 flex w-full  gap-2 text-center">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-stone-600 px-4 py-1.5 text-sm font-medium text-white drop-shadow-lg hover:bg-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={() => onClose()}
          >
            {t('Annulla')}
          </button>

          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-1.5 text-sm font-medium text-white drop-shadow-lg hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={() => onAction()}
          >
            {t('Modifica Prenotazione')}
          </button>
        </div>
      </div>
    </CustomDialog>
  );
};

export default ConfirmDialog;
