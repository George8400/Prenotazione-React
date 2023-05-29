import { useEffect, useLayoutEffect, useState } from 'react';
import WrapperCard from '../../components/core/WrapperCard';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useReservation from '../../store/hook/useReservation';
import UserForm, { UserFormType } from '../../components/features/Checkout/UserForm';
import CategoryRateCard from '../../components/shared/cards/CategoryRateCard';
import Api from '../../api/controller/Api';

const Checkout = () => {
  const [isLoadingCapture, setIsLoadingCapture] = useState(false);

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
        window.open(res.approvalLink, '_blank');
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
      })
      .catch((err) => {
        console.log('captureReservation', err);
      })
      .finally(() => {
        setIsLoadingCapture(false);
      });
  };

  useLayoutEffect(() => {
    if (!reservation.confirmReservation) navigate('/risultati');
  }, []);

  useEffect(() => {
    onCapture();
  }, []);

  return (
    <div className="animate-fadeIn space-y-6">
      <CategoryRateCard reservation={reservation} onEdit={() => navigate('/risultati')} />

      <WrapperCard>
        <h2 className="text-xl font-bold lg:text-2xl">{t('Hai quasi terminato, inserisci i dati richiesti:')}</h2>

        <UserForm
          onSubmit={handleCheckout}
          initialState={{
            firstName: reservation.firstName,
            lastName: reservation.lastName,
            email: reservation.email,
            phone: reservation.phone,
            confirmEmail: reservation.email,
          }}
        />
      </WrapperCard>
    </div>
  );
};

export default Checkout;
