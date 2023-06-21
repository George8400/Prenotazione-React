import { useCallback, useEffect, useState } from 'react';
import Api from '../api/controller/Api';
import { CheckAvailabilityDataType } from '../models/Reservation';
import { setResultsCheckAvailability } from '../store/slices/resultsCheckAvailability';
import useReservation from '../store/hook/useReservation';
import { useAppDispatch } from './useRTK';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { updateCheckAvailability, updateReservation, reservation, checkAvailability } = useReservation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onFetchCategoryRate = async (data: CheckAvailabilityDataType) => {
    setIsLoading(true);

    updateCheckAvailability(data);

    const res = await Api.searchCategoryRate(data);

    if (res) {
      dispatch(setResultsCheckAvailability(res));
      return Promise.resolve(res);
    } else {
      return Promise.reject('error');
    }
  };

  const onSearch = useCallback(
    (data: CheckAvailabilityDataType) => {
      setIsLoading(true);
      updateCheckAvailability({
        ...data,
        numNights: moment(data?.endDate).diff(moment(data?.startDate), 'days') ?? 0,
      });

      Api.searchCategoryRate(data)
        .then((res) => {
          updateReservation(undefined, 'reset');

          dispatch(setResultsCheckAvailability(res));

          navigate('/risultati');
        })
        .catch((err) => {
          console.log('err', err);
          alert('errore nel caricamento delle risorse');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [checkAvailability],
  );

  const refreshSearch = () => {
    if (!checkAvailability.startDate || !checkAvailability.endDate) return;

    onSearch(checkAvailability);
  };

  // TODO: gestire il caso: se l'utente non ha cliccato su prosegui la prenotazione viene svuotata
  useEffect(() => {
    if (!checkAvailability.startDate || !checkAvailability.endDate) return;
    if (!reservation?.confirmReservation) onSearch(checkAvailability);
  }, []);

  return { onSearch, refreshSearch, isLoading };
};

export default useSearch;
