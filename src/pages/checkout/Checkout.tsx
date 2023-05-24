import { useLayoutEffect } from 'react';
import WrapperCard from '../../components/core/WrapperCard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useReservation from '../../store/hook/useReservation';
import UserForm, { UserFormType } from '../../components/features/Checkout/UserForm';
import CategoryRateCard from '../../components/shared/cards/CategoryRateCard';

const Checkout = () => {
  const { updateReservation, reservation } = useReservation();

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

    // navigate('/checkout/success');
  };

  useLayoutEffect(() => {
    if (!reservation.confirmReservation) navigate('/risultati');
  }, []);

  return (
    <div className="animate-fadeIn space-y-6">
      <CategoryRateCard reservation={reservation} onEdit={() => navigate('/risultati')} />

      <WrapperCard>
        <h2 className="text-xl font-bold lg:text-2xl">{t('Hai quasi terminato, inserisci i dati richiesti:')}</h2>

        <UserForm onSubmit={handleCheckout} />
      </WrapperCard>
    </div>
  );
};

export default Checkout;
