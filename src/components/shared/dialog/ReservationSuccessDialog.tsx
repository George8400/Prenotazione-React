import Lottie from 'lottie-react';
import { CustomDialog, CustomDialogProps } from '../../core/CustomDialog';
import seccessBgAnimation from '../../../assets/animations/success-bg-animation.json';
import checkAnimation from '../../../assets/animations/check-animation.json';
import { useTranslation } from 'react-i18next';

const ReservationSuccessDialog = ({ isOpen, onClose }: CustomDialogProps) => {
  const { t } = useTranslation();

  return (
    <CustomDialog isOpen={isOpen} onClose={() => onClose()} className="!p-0">
      <div className="relative flex h-full w-full flex-col items-center gap-4 p-8">
        <Lottie animationData={seccessBgAnimation} className="absolute inset-0 h-full w-full" loop />
        <Lottie animationData={checkAnimation} className="h-1/2 w-1/2" loop />

        <h2 className=" mt-4 text-3xl font-medium leading-6 text-gray-900">{t('Prenotazione effettuata')}!</h2>

        <div className="mt-2">
          <p className="text-center text-base text-gray-500">
            {t('La tua prenotazione è stata effettuata con successo. Troverai maggiori informazioni nella tua email.')}

            <br />
            <br />

            <strong> {t('Ti aspettiamo!')} </strong>
          </p>
        </div>

        <div className="relative z-10 mt-4 w-full text-center">
          <button
            type="button"
            className="inline-flex w-1/2 justify-center rounded-md border border-transparent bg-green-400 px-4 py-1.5 text-sm font-medium text-white drop-shadow-lg hover:bg-green-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            onClick={() => onClose()}
          >
            {t('Chiudi')}
          </button>
        </div>
      </div>
    </CustomDialog>
  );
};

export default ReservationSuccessDialog;
