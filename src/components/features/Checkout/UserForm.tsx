import { t } from 'i18next';
import React, { useReducer } from 'react';
import Button from '../../core/Button';
import Input from '../../core/Input';
import paymentsImage from '../../../assets/images/payments.svg';
import { DataActionReducer } from '../../../models/type';

interface UserFormProps {
  initialState?: UserFormType;
  onSubmit: (data: UserFormType) => void;
}

enum UserFormActionKind {
  SET_FIRST_NAME = 'SET_FIRST_NAME',
  SET_LAST_NAME = 'SET_LAST_NAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_CONFIRM_EMAIL = 'SET_CONFIRM_EMAIL',
  SET_PHONE = 'SET_PHONE',
}

export type UserFormType = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
};

const initialDataState: UserFormType = {
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  phone: '',
};

const dataReducer = (state: UserFormType, action: DataActionReducer<string | number>) => {
  const { payload, type } = action;

  switch (type) {
    case UserFormActionKind.SET_FIRST_NAME:
      return { ...state, firstName: payload as string };
    case UserFormActionKind.SET_LAST_NAME:
      return { ...state, lastName: payload as string };
    case UserFormActionKind.SET_EMAIL:
      return { ...state, email: payload as string };
    case UserFormActionKind.SET_CONFIRM_EMAIL:
      return { ...state, confirmEmail: payload as string };
    case UserFormActionKind.SET_PHONE:
      return { ...state, phone: payload as string };

    default:
      return state;
  }
};

const UserForm = ({ initialState, onSubmit }: UserFormProps) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, initialState ?? initialDataState);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(dataState);
      }}
    >
      <div className="mt-4 grid grid-cols-6 gap-4">
        <Input
          placeholder={t('Nome').toString() + '*'}
          classNameWrapper="col-span-6 lg:col-span-3 2xl:col-span-2"
          name="name"
          type="text"
          required
          defaultValue={dataState.firstName}
          onChange={(e) => dataDispatch({ type: UserFormActionKind.SET_FIRST_NAME, payload: e.target.value })}
        />

        <Input
          placeholder={t('Cognome').toString() + '*'}
          classNameWrapper="col-span-6 lg:col-span-3 2xl:col-span-2"
          name="surname"
          type="text"
          required
          defaultValue={dataState.lastName}
          onChange={(e) => dataDispatch({ type: UserFormActionKind.SET_LAST_NAME, payload: e.target.value })}
        />

        <Input
          placeholder={t('Email').toString() + '*'}
          classNameWrapper="col-span-6 lg:col-span-3 2xl:col-span-2"
          name="email"
          type="email"
          required
          defaultValue={dataState.email}
          onChange={(e) => dataDispatch({ type: UserFormActionKind.SET_EMAIL, payload: e.target.value })}
        />

        <Input
          placeholder={t('Conferma email').toString() + '*'}
          classNameWrapper="col-span-6 lg:col-span-3 2xl:col-span-2"
          name="confirmEmail"
          type="email"
          required
          defaultValue={dataState.confirmEmail}
          onChange={(e) => dataDispatch({ type: UserFormActionKind.SET_CONFIRM_EMAIL, payload: e.target.value })}
        />

        <Input
          placeholder={t('Telefono').toString() + '*'}
          classNameWrapper="col-span-6 lg:col-span-3 2xl:col-span-2"
          name="phone"
          type="tel"
          required
          defaultValue={dataState.phone}
          onChange={(e) => dataDispatch({ type: UserFormActionKind.SET_PHONE, payload: e.target.value })}
        />
      </div>

      {/* Checkbox */}
      <div className="mt-8 space-y-2 px-1">
        <div className="mr-4 flex items-start ">
          <input
            id="primary-checkbox"
            required
            type="checkbox"
            value=""
            className="h-5 w-5 rounded-md border-gray-300 bg-gray-100 text-primary-600 "
          />
          <label htmlFor="primary-checkbox" className="ml-2 font-open text-xs text-dark">
            {t(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            )}
          </label>
        </div>

        <div className="mr-4 flex items-start ">
          <input
            id="secondary-checkbox"
            required
            type="checkbox"
            value=""
            className="h-5 w-5 rounded-md border-gray-300 bg-gray-100 text-primary-600 "
          />
          <label htmlFor="secondary-checkbox" className="ml-2 font-open text-xs text-dark">
            {t(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            )}
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-end gap-4 sm:flex-row">
        <img src={paymentsImage} alt="" className="max-w-[200px]" />

        <Button className="sm:w-fit" itemType="submit">
          <span className="text-sm font-bold">{t('Procedi al pagamento')}</span>
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
