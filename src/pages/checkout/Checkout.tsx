import { useEffect, useLayoutEffect, useState } from 'react';
import WrapperCard from '../../components/core/WrapperCard';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useReservation from '../../store/hook/useReservation';
import UserForm, { UserFormType } from '../../components/features/Checkout/UserForm';
import CategoryRateCard from '../../components/shared/cards/CategoryRateCard';
import Api from '../../api/controller/Api';
import ErrorDialog from '../../components/shared/dialog/ErrorDialog';
import ReservationSuccessDialog from '../../components/shared/dialog/ReservationSuccessDialog';

const Checkout = () => {
  const [isLoadingCapture, setIsLoadingCapture] = useState(false);
  const [showSuccessCapture, setShowSuccessCapture] = useState(false);
  const [showErrorCapture, setShowErrorCapture] = useState(false);

  const { updateReservation, reservation } = useReservation();
  const params = useSearchParams();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCheckout = (data: UserFormType) => {
    console.log('Checkout', data);

    updateReservation({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });

    Api.temporaryReservation({
      ...reservation,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    })
      .then((res) => {
        console.log('temporaryReservation', res);
        window.open(res.approvalLink, '_self');
      })
      .catch((err) => {
        console.log('temporaryReservation', err);
      });

    // navigate('/checkout/success');
  };

  const onCapture = () => {
    if (!reservation.confirmReservation) return;

    const payerId = params[0].get('PayerID');
    const token = params[0].get('token');

    if (!payerId || !token) return;

    setIsLoadingCapture(true);

    Api.captureReservation(token)
      .then((res) => {
        console.log('captureReservation', res);
        setShowSuccessCapture(true);
        updateReservation({ paymentMade: true });
      })
      .catch((err) => {
        console.log('captureReservationError', err);
        setShowErrorCapture(true);
      })
      .finally(() => {
        setIsLoadingCapture(false);
      });
  };

  const onCloseSuccessCapture = () => {
    setShowSuccessCapture(false);
    navigate('/checkout/success');
  };

  useLayoutEffect(() => {
    if (!reservation.confirmReservation || reservation.paymentMade) {
      updateReservation(undefined, 'reset');
      navigate('/risultati');
    } else {
      onCapture();
    }
  }, []);

  return (
    <div className="animate-fadeIn space-y-6">
      <CategoryRateCard reservation={reservation} onEdit={() => navigate('/risultati')} />

      <WrapperCard>
        <h2 className="text-xl font-bold lg:text-2xl">{t('Hai quasi terminato, inserisci i dati richiesti:')}</h2>

        <UserForm
          onSubmit={handleCheckout}
          paymentMade={reservation.paymentMade}
          initialState={{
            firstName: reservation.firstName,
            lastName: reservation.lastName,
            email: reservation.email,
            phone: reservation.phone,
            confirmEmail: reservation.email,
          }}
        />
      </WrapperCard>

      <ErrorDialog
        title={t('Ooops!')}
        description={t('Si è verificato un errore durante la prenotazione. Riprova più tardi.')}
        isOpen={showErrorCapture}
        onClose={() => setShowErrorCapture(false)}
      />

      <ReservationSuccessDialog isOpen={showSuccessCapture} onClose={onCloseSuccessCapture} />
    </div>
  );
};

export default Checkout;
