import { PencilSquareIcon, UserIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { t } from 'i18next';
import Input from '../../core/Input';
import CalendarButton from '../calendar/CalendarButton';
import Button from '../../core/Button';
import CustomDropDownMenu from '../../core/CustomPopover';
import CustomPopover from '../../core/CustomPopover';
import { Fragment, RefObject, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import CustomTransition from '../../core/CustomTransition';
import WrapperCard from '../../core/WrapperCard';
import { utilsDate } from './utils/utils';
import moment from 'moment';
import EditButton from '../../core/EditButton';
import { DataActionReducer } from '../../../models/type';

interface SearchSidebarProps {
  className?: string;
  onChangeEditing: (isEditing: boolean) => void;
  onSearch: (data: DataStateType) => void;
}

enum DataActionKind {
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE',
  SET_NUM_ADULTS = 'SET_NUM_ADULTS',
  SET_NUM_CHILDREN = 'SET_NUM_CHILDREN',
  SET_NUM_ROOMS = 'SET_NUM_ROOMS',
  SET_COUPON = 'SET_COUPON',
}

type DataStateType = {
  startDate: string;
  endDate: string;
  numAdults: number;
  numChildren: number;
  numRooms: number;
  coupon: string;
};

const initialDataState: DataStateType = {
  startDate: moment(new Date()).format('DD/MM/YYYY'),
  endDate: moment(new Date()).add(1, 'week').format('DD/MM/YYYY'),
  numAdults: 0,
  numChildren: 0,
  numRooms: 0,
  coupon: '',
};

const dataReducer = (state: DataStateType, action: DataActionReducer<string | number>) => {
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
    case DataActionKind.SET_NUM_ROOMS:
      return { ...state, numRooms: payload as number };
    case DataActionKind.SET_COUPON:
      return { ...state, coupon: payload as string };

    default:
      return state;
  }
};

const SearchSidebar = ({ onChangeEditing, onSearch, className }: SearchSidebarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [height, setHeight] = useState(0);
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);

  const ref = useRef<HTMLDivElement>(null);

  const handleChangeEditing = useCallback((value: boolean) => {
    setIsEditing(value);
    onChangeEditing(value);
  }, []);

  const handleSearch = useCallback(() => {
    onSearch(dataState);
    handleChangeEditing(false);
  }, [dataState]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  return (
    <WrapperCard ref={ref} className={className}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t('La tua ricerca')}</h3>
        <button className="text-sm text-dark" onClick={() => handleChangeEditing(!isEditing)}>
          <CustomTransition show={isEditing}>
            <span className="flex items-center gap-1.5 ">
              {t('Chiudi')}
              <XMarkIcon className="mb-0.5 h-4 w-4 text-primary-500" />
            </span>
          </CustomTransition>

          <EditButton show={!isEditing} />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mt-4 flex w-full flex-col justify-center gap-6">
          <CalendarButton
            value={utilsDate.formatStringToDayValue(dataState.startDate)}
            label={t('Arrivo').toString()}
            placeholder={t('Seleziona data di arrivo').toString()}
            locale="it"
            onChange={(value) => {
              dataDispatch({
                type: DataActionKind.SET_START_DATE,
                payload: utilsDate.formatDayValueToString(value) ?? '',
              });
            }}
            minimumDate={utilsDate.formatDateToDayValue(new Date()) ?? undefined}
          />

          <CalendarButton
            value={utilsDate.formatStringToDayValue(dataState.endDate)}
            label={t('Partenza').toString()}
            placeholder={t('Seleziona data di partenza').toString()}
            locale="it"
            onChange={(value) => {
              dataDispatch({
                type: DataActionKind.SET_END_DATE,
                payload: utilsDate.formatDayValueToString(value) ?? '',
              });
            }}
            minimumDate={utilsDate.formatDateToDayValue(new Date()) ?? undefined}
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
            defaultValue={dataState.numAdults}
          />

          <CustomTransition show={isEditing}>
            <Input
              label={t('Bambini').toString()}
              placeholder={t('0').toString()}
              Icon={ChevronUpDownIcon}
              type="number"
              onChange={(e) => {
                dataDispatch({ type: DataActionKind.SET_NUM_CHILDREN, payload: e.target.value });
              }}
              defaultValue={dataState.numChildren}
            />
          </CustomTransition>

          <CustomTransition show={isEditing}>
            <Input
              label={t('N° Camere').toString()}
              placeholder={t('0').toString()}
              Icon={ChevronUpDownIcon}
              type="number"
              onChange={(e) => {
                dataDispatch({ type: DataActionKind.SET_NUM_ROOMS, payload: e.target.value });
              }}
              defaultValue={dataState.numRooms}
            />
          </CustomTransition>

          <CustomTransition show={isEditing}>
            <Input
              label={t('Coupon').toString()}
              placeholder={t('').toString()}
              onChange={(e) => {
                dataDispatch({ type: DataActionKind.SET_COUPON, payload: e.target.value });
              }}
              defaultValue={dataState.coupon}
            />
          </CustomTransition>

          <CustomTransition show={isEditing}>
            <Button itemType="submit" size="large" onClick={() => handleSearch()}>
              <span className="text-base">{t('Verifica disponibiltà')}</span>
            </Button>
          </CustomTransition>
        </div>
      </form>
    </WrapperCard>
  );
};

export type { DataStateType as SearchSidebarDataStateType };

export default SearchSidebar;
