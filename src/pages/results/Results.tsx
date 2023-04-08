import { useTranslation } from 'react-i18next';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/core/Button';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handleSelect = (selected: any) => {
    console.log(selected);
    navigate('/checkout');
  };

  return (
    <div
      className={clsx(
        'flex flex-col items-center w-full animate-fadeIn rounded-md overflow-hidden shadow-full',
        'md:order-2',
      )}
    >
      <div className={clsx('lg:gap-3 lg:flex lg:p-4')}>
        <img
          className=" object-cover lg:w-44 lg:h-44 lg:rounded-md"
          src="https://generatorfun.com/code/uploads/Random-Hotel-image-10.jpg"
          alt=""
        />

        <div className="p-3 lg:p-0">
          <h2 className="text-xl font-bold lg:text-2xl">Camera Matrimoniale</h2>
          <p className="text-gray-500 mt-1 text-xs">
            Dotata di connessione Wi-Fi gratuita e aria condizionata, questa camera include una TV LCD con canali
            satellitari e pay per view, e in alcuni casi presenta un balcone (in base alla disponibilità).{' '}
          </p>

          <span className="font-semibold mt-3 block">1 letto matrimoniale</span>
        </div>
      </div>
      {/* Tariffe */}
      {Array.from({
        length: 3,
      }).map((_, index) => {
        return (
          <div
            key={index}
            className={clsx('flex flex-col gap-2 w-full', {
              'bg-stone-200': index % 2 === 0,
            })}
          >
            <div className="p-3 lg:flex gap-3 justify-between">
              <div className="w-full">
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
              </div>

              <div className="flex justify-end mt-4">
                <Button border="full" size="small" className="w-fit" onClick={handleSelect}>
                  {t('Seleziona')}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
