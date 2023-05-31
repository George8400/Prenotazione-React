import { UserIcon, PaperClipIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { t } from 'i18next';
import React, { useEffect, useMemo, useReducer } from 'react';
import Button from '../../core/Button';
import Input from '../../core/Input';
import CategoryRateCard from '../cards/CategoryRateCard';
import { DataActionReducer } from '../../../models/type';
import { useTranslation } from 'react-i18next';
import CustomListbox from '../../core/CustomListbox';
import CustomPopover from '../../core/CustomPopover';
import DatePicker, { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import CustomDatePicker from '../calendar/CustomDatePicker';
import { utilsDate } from '../search-sidebar/utils/utils';
import moment from 'moment';
import i18n from '../../../../i18n';

enum DataActionKind {
  SET_FIRST_NAME = 'SET_FIRST_NAME',
  SET_LAST_NAME = 'SET_LAST_NAME',
  SET_BORN_PLACE = 'SET_BORN_PLACE',
  SET_BORN_DATE = 'SET_BORN_DATE',
  SET_GENDER = 'SET_GENDER',
  SET_CITIZENSHIP = 'SET_CITIZENSHIP',
  SET_DOCUMENT_TYPE = 'SET_DOCUMENT_TYPE',
  SET_DOCUMENT_NUMBER = 'SET_DOCUMENT_NUMBER',
  SET_DOCUMENT_PLACE = 'SET_DOCUMENT_PLACE',
}

type DataStateType = {
  firstName: string;
  lastName: string;
  bornPlace: string;
  bornDate: string;
  gender: string;
  citizenship: string;
  documentType: string;
  documentNumber: string;
  documentPlace: string;
};

const initialDataState: DataStateType = {
  firstName: '',
  lastName: '',
  bornPlace: '',
  bornDate: '24/04/2023',
  gender: '',
  citizenship: '',
  documentType: '',
  documentNumber: '',
  documentPlace: '',
};

const dataReducer = (state: DataStateType, action: DataActionReducer<string | number>) => {
  const { payload, type } = action;

  switch (type) {
    case DataActionKind.SET_FIRST_NAME:
      return { ...state, firstName: payload as string };
    case DataActionKind.SET_LAST_NAME:
      return { ...state, lastName: payload as string };
    case DataActionKind.SET_BORN_PLACE:
      return { ...state, bornPlace: payload as string };
    case DataActionKind.SET_BORN_DATE:
      return { ...state, bornDate: payload as string };
    case DataActionKind.SET_GENDER:
      return { ...state, gender: payload as string };
    case DataActionKind.SET_CITIZENSHIP:
      return { ...state, citizenship: payload as string };
    case DataActionKind.SET_DOCUMENT_NUMBER:
      return { ...state, documentNumber: payload as string };
    case DataActionKind.SET_DOCUMENT_PLACE:
      return { ...state, documentPlace: payload as string };
    case DataActionKind.SET_DOCUMENT_TYPE:
      return { ...state, documentType: payload as string };

    default:
      return state;
  }
};

const SmartCheckinInput = () => {
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);

  const { t } = useTranslation();

  const documentType = useMemo(
    () => [
      { value: 'Carta d’identità', label: t('Carta d’identità') },
      { value: 'Patente', label: t('Patente') },
      { value: 'Passaporto', label: t('Passaporto') },
    ],
    [i18n.language],
  );

  return (
    <div>
      {/* <CategoryRateCard
        typeRoomName="Camera Matrimoniale"
        peopleString="Prezzo per 2 notti - 2 adulti"
        price="80 €"
        rangeDate="Dal 01/01/2021 al 03/01/2021"
        rateName="Trattamento B&B"
      /> */}

      <div className="mt-9">
        <h2 className="text-xl font-bold lg:text-2xl">{t('Smart Check-in')}</h2>
        <p className="font-open text-xs">
          {t(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
          )}
          {t(
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
          )}
        </p>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <div className="flex w-fit items-center gap-3 text-center lg:flex-col">
            <UserIcon className="h-14 w-14 rounded-full bg-white p-3.5 text-dark shadow-full" />
            <span className="text-xl font-bold sm:text-sm">{t('Ospite')}</span>
          </div>

          <div className="grid w-full grid-cols-6 gap-6">
            <Input
              placeholder={t('Nome').toString() + '*'}
              classNameWrapper="col-span-6 sm:col-span-3"
              name="firstName"
              type="text"
              id="firstName"
              onChange={(e) => {
                dataDispatch({
                  type: DataActionKind.SET_FIRST_NAME,
                  payload: e.target.value,
                });
              }}
            />

            <Input
              placeholder={t('Cognome').toString() + '*'}
              classNameWrapper="col-span-6 sm:col-span-3"
              name="lastName"
              type="text"
              id="lastName"
              onChange={(e) => {
                dataDispatch({
                  type: DataActionKind.SET_LAST_NAME,
                  payload: e.target.value,
                });
              }}
            />

            <Input
              placeholder={t('Luogo di nascita').toString() + '*'}
              classNameWrapper="col-span-6 sm:col-span-3"
              name="place"
              type="text"
              id="place"
              onChange={(e) => {
                dataDispatch({
                  type: DataActionKind.SET_BORN_PLACE,
                  payload: e.target.value,
                });
              }}
            />

            {/* DATA */}

            <CustomPopover
              TriggerButton={
                <Input
                  placeholder={t('Data di nascita').toString() + '*'}
                  classNameWrapper="col-span-6 sm:col-span-3"
                  name="bornDate"
                  type="text"
                  id="bornDate"
                  onChange={(e) => {
                    dataDispatch({
                      type: DataActionKind.SET_BORN_DATE,
                      payload: e.target.value,
                    });
                  }}
                  Icon={CalendarIcon}
                  value={dataState.bornDate}
                />
              }
              classNameWrapper="col-span-6 sm:col-span-3"
            >
              <CustomDatePicker
                value={utilsDate.formatDateToDayValue(moment(dataState.bornDate, 'DD/MM/YYYY').toDate())}
                locale="it"
                onChange={(date) => {
                  dataDispatch({
                    type: DataActionKind.SET_BORN_DATE,
                    payload: utilsDate.formatDayValueToString(date) as string,
                  });
                }}
              />
            </CustomPopover>

            <Input
              placeholder={t('Cittadinanza').toString() + '*'}
              classNameWrapper="col-span-6 sm:col-span-3"
              name="citizenship"
              type="text"
              id="citizenship"
              onChange={(e) => {
                dataDispatch({
                  type: DataActionKind.SET_CITIZENSHIP,
                  payload: e.target.value,
                });
              }}
            />

            <Input
              placeholder={t('Genere').toString() + '*'}
              classNameWrapper="col-span-6 sm:col-span-3"
              name="gender"
              type="text"
              id="gender"
              onChange={(e) => {
                dataDispatch({
                  type: DataActionKind.SET_GENDER,
                  payload: e.target.value,
                });
              }}
            />

            <CustomListbox
              items={documentType.map((item) => {
                return {
                  id: item.value,
                  label: item.label,
                  value: item,
                };
              })}
              defaultSelected={null}
              placeholder={t('Tipo di documento').toString() + '*'}
              onSelect={(item) => console.log(item)}
              classNameWrapper="col-span-6 sm:col-span-3"
            />

            <Input
              placeholder={t('Numero di documento').toString() + '*'}
              classNameWrapper="col-span-6 sm:col-span-3"
              name="idCard"
              type="text"
              id="idCard"
              onChange={(e) => {
                dataDispatch({
                  type: DataActionKind.SET_DOCUMENT_NUMBER,
                  payload: e.target.value,
                });
              }}
            />

            <Input
              placeholder={t('Rilasciata da').toString() + '*'}
              classNameWrapper="col-span-6 sm:col-span-3"
              name="issuedBy"
              type="text"
              id="issuedBy"
              onChange={(e) => {
                dataDispatch({
                  type: DataActionKind.SET_DOCUMENT_PLACE,
                  payload: e.target.value,
                });
              }}
            />

            <Button variant="secondary" className="col-span-6 sm:col-span-3">
              {t('Prosegui')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCheckinInput;
