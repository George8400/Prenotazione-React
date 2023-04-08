import React, { useReducer } from 'react';
import WrapperCard from '../../components/core/WrapperCard';
import { useTranslation } from 'react-i18next';
import EditButton from '../../components/core/EditButton';
import clsx from 'clsx';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Input from '../../components/core/Input';
import { DataActionReducer } from '../../models/type';
import paymentsImage from '../../assets/images/payments.svg';
import Button from '../../components/core/Button';
import { useNavigate } from 'react-router-dom';
import CategoryRateCard from '../../components/shared/cards/CategoryRateCard';

enum DataActionKind {
  SET_FIRST_NAME = 'SET_FIRST_NAME',
  SET_LAST_NAME = 'SET_LAST_NAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_CONFIRM_EMAIL = 'SET_CONFIRM_EMAIL',
  SET_PHONE = 'SET_PHONE',
}

type DataStateType = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
};

const initialDataState: DataStateType = {
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  phone: '',
};

const dataReducer = (state: DataStateType, action: DataActionReducer<string | number>) => {
  const { payload, type } = action;

  switch (type) {
    case DataActionKind.SET_FIRST_NAME:
      return { ...state, firstName: payload as string };
    case DataActionKind.SET_LAST_NAME:
      return { ...state, lastName: payload as string };
    case DataActionKind.SET_EMAIL:
      return { ...state, email: payload as string };
    case DataActionKind.SET_CONFIRM_EMAIL:
      return { ...state, confirmEmail: payload as string };
    case DataActionKind.SET_PHONE:
      return { ...state, phone: payload as string };

    default:
      return state;
  }
};

const Checkout = () => {
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log('Checkout');
    navigate('/checkout/success');
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <CategoryRateCard
        typeRoomName="Camera Matrimoniale"
        peopleString="Prezzo per 2 notti - 2 adulti"
        price="80 €"
        rangeDate="Dal 01/01/2021 al 03/01/2021"
        rateName="Trattamento B&B"
        onEdit={() => navigate('/risultati')}
      />

      <WrapperCard>
        <h2 className="text-xl font-bold lg:text-2xl">{t('Hai quasi terminato, inserisci i dati richiesti:')}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid grid-cols-6 gap-4 mt-4">
            <Input
              placeholder={t('Nome').toString() + '*'}
              classNameWrapper="col-span-3 md:col-span-3 2xl:col-span-2"
              name="name"
              type="text"
              required
              defaultValue={dataState.firstName}
              onChange={(e) => dataDispatch({ type: DataActionKind.SET_FIRST_NAME, payload: e.target.value })}
            />

            <Input
              placeholder={t('Cognome').toString() + '*'}
              classNameWrapper="col-span-3 md:col-span-3 2xl:col-span-2"
              name="surname"
              type="text"
              required
              defaultValue={dataState.lastName}
              onChange={(e) => dataDispatch({ type: DataActionKind.SET_LAST_NAME, payload: e.target.value })}
            />

            <Input
              placeholder={t('Email').toString() + '*'}
              classNameWrapper="col-span-3 md:col-span-3 2xl:col-span-2"
              name="email"
              type="email"
              required
              defaultValue={dataState.email}
              onChange={(e) => dataDispatch({ type: DataActionKind.SET_EMAIL, payload: e.target.value })}
            />

            <Input
              placeholder={t('Conferma email').toString() + '*'}
              classNameWrapper="col-span-3 md:col-span-3 2xl:col-span-2"
              name="confirmEmail"
              type="email"
              required
              defaultValue={dataState.confirmEmail}
              onChange={(e) => dataDispatch({ type: DataActionKind.SET_CONFIRM_EMAIL, payload: e.target.value })}
            />

            <Input
              placeholder={t('Telefono').toString() + '*'}
              classNameWrapper="col-span-3 md:col-span-3 2xl:col-span-2"
              name="phone"
              type="tel"
              required
              defaultValue={dataState.phone}
              onChange={(e) => dataDispatch({ type: DataActionKind.SET_PHONE, payload: e.target.value })}
            />
          </div>

          {/* Checkbox */}
          <div className="mt-8 px-1 space-y-2">
            <div className="flex items-start mr-4 ">
              <input
                id="primary-checkbox"
                type="checkbox"
                value=""
                className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded-md "
              />
              <label htmlFor="primary-checkbox" className="ml-2 text-xs font-open text-gray-900 dark:text-gray-300">
                {t(
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                )}
              </label>
            </div>

            <div className="flex items-start mr-4 ">
              <input
                id="secondary-checkbox"
                type="checkbox"
                value=""
                className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded-md "
              />
              <label htmlFor="secondary-checkbox" className="ml-2 text-xs font-open text-gray-900 dark:text-gray-300">
                {t(
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                )}
              </label>
            </div>
          </div>

          <div className="flex mt-8 justify-end gap-4">
            <img src={paymentsImage} alt="" />

            <Button className="w-fit" itemType="submit" onClick={() => handleCheckout()}>
              <span className="text-sm font-bold">{t('Procedi al pagamento')}</span>
            </Button>
          </div>
        </form>
      </WrapperCard>
    </div>
  );
};

export default Checkout;
