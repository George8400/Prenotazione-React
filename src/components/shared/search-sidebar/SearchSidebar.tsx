import { PencilSquareIcon, UserIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { t } from 'i18next';
import Input from '../../core/Input';
import CalendarButton from '../calendar/CalendarButton';
import Button from '../../core/Button';
import CustomDropDownMenu from '../../core/CustomPopover';
import CustomPopover from '../../core/CustomPopover';
import { useReducer, useState } from 'react';
import CustomTransition from '../../core/CustomTransition';
import { formatDate } from './utils/utils';

interface SearchSidebarProps {}

enum DataActionKind {
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE',
  SET_NUM_ADULTS = 'SET_NUM_ADULTS',
  SET_NUM_CHILDREN = 'SET_NUM_CHILDREN',
  SET_NUM_BABIES = 'SET_NUM_BABIES',
  SET_COUPON = 'SET_COUPON',
}

type DataAction = {
  type: DataActionKind;
  payload: string | number;
};

type DataStateType = {
  startDate?: string;
  endDate?: string;
  numAdults?: number;
  numChildren?: number;
  numBabies?: number;
  coupon?: string;
};

const initialDataState: DataStateType = {
  startDate: '',
  endDate: '',
  numAdults: 0,
  numChildren: 0,
  numBabies: 0,
  coupon: '',
};

const dataReducer = (state: DataStateType, action: DataAction) => {
  const { payload, type } = action;

  switch (type) {
    case DataActionKind.SET_START_DATE:
      return { ...state, startDate: payload as string };
    case DataActionKind.SET_END_DATE:
      return { ...state, endDate: payload as string };
    case DataActionKind.SET_NUM_ADULTS:
      return { ...state, numAdults: payload as number };
    case DataActionKind.SET_NUM_CHILDREN:
      return { ...state, numChildren: payload as number };
    case DataActionKind.SET_NUM_BABIES:
      return { ...state, numBabies: payload as number };
    case DataActionKind.SET_COUPON:
      return { ...state, coupon: payload as string };

    default:
      return state;
  }
};

const SearchSidebar = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);

  return (
    <div className={'bg-white rounded-md shadow-full px-3 py-6  ease-in-out duration-300 h-auto'}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl">{t('La tua ricerca')}</h3>
        <button className="flex items-center gap-1.5 text-sm text-dark" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? (
            <>
              {t('Chiudi')}
              <XMarkIcon className="text-primary-500 w-4 h-4 mb-0.5" />
            </>
          ) : (
            <>
              {t('Modifica')}
              <PencilSquareIcon className="text-primary-500 w-3.5 h-3.5 mb-0.5" />
            </>
          )}
        </button>
      </div>

      <div className="w-full mt-4 flex flex-col gap-6 justify-center">
        <CalendarButton
          value={{ day: 2, month: 4, year: 2023 }}
          label={t('Arrivo').toString()}
          placeholder={t('Seleziona data di arrivo').toString()}
          locale="it"
          onChange={(value) => {
            dataDispatch({ type: DataActionKind.SET_START_DATE, payload: formatDate(value) ?? '' });
          }}
        />

        <CalendarButton
          value={{ day: 2, month: 4, year: 2023 }}
          label={t('Partenza').toString()}
          placeholder={t('Seleziona data di partenza').toString()}
          locale="it"
          onChange={(value) => {
            dataDispatch({ type: DataActionKind.SET_END_DATE, payload: formatDate(value) ?? '' });
          }}
        />

        <Input
          label={t('Adulti').toString()}
          placeholder={t('Numero di adulti').toString()}
          Icon={UserIcon}
          type="number"
          className=""
          onChange={(e) => {
            dataDispatch({ type: DataActionKind.SET_NUM_ADULTS, payload: e.target.value });
          }}
        />

        <CustomTransition show={isEditing}>
          <Input
            label={t('Neonati').toString()}
            placeholder={t('0').toString()}
            Icon={ChevronUpDownIcon}
            type="number"
            onChange={(e) => {
              dataDispatch({ type: DataActionKind.SET_NUM_BABIES, payload: e.target.value });
            }}
          />
        </CustomTransition>

        <CustomTransition show={isEditing}>
          <Input
            label={t('Bambini').toString()}
            placeholder={t('0').toString()}
            Icon={ChevronUpDownIcon}
            type="number"
            onChange={(e) => {
              dataDispatch({ type: DataActionKind.SET_NUM_CHILDREN, payload: e.target.value });
            }}
          />
        </CustomTransition>

        <CustomTransition show={isEditing}>
          <Input
            label={t('Coupon').toString()}
            placeholder={t('').toString()}
            onChange={(e) => {
              dataDispatch({ type: DataActionKind.SET_COUPON, payload: e.target.value });
            }}
          />
        </CustomTransition>

        <CustomTransition show={isEditing}>
          <Button size="large" onClick={() => console.log('Verifica', dataState)}>
            <span className="text-base">{t('Verifica disponibiltà')}</span>
          </Button>
        </CustomTransition>
      </div>
    </div>
  );
};

export default SearchSidebar;
