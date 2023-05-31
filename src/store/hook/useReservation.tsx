import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/useRTK';
import { BlockRoomsDataType, CheckAvailabilityDataType, ReservationDataType } from '../../models/Reservation';
import { setBlockRooms, setBlockRoomsReset } from '../slices/blockRooms';
import { setCheckAvailability, setCheckAvailabilityReset } from '../slices/checkAvailability';
import { setReservation, setReservationReset } from '../slices/reservation';
import { useNavigate } from 'react-router-dom';
import Api from '../../api/controller/Api';

const useReservation = () => {
  const { blockRooms, checkAvailability, reservation } = useAppSelector((state) => state);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const updateBlockRooms = (data?: string[], action?: 'reset') => {
    console.log('onBlockRooms', data);

    if (action === 'reset') {
      dispatch(setBlockRoomsReset());
      return;
    }

    if (!data) throw new Error('data is required');

    dispatch(setBlockRooms(data));
  };

  const updateCheckAvailability = (data?: CheckAvailabilityDataType, action?: 'reset') => {
    console.log('onCheckAvailability');

    if (action === 'reset') {
      dispatch(setCheckAvailabilityReset());
      return;
    }

    if (!data) throw new Error('data is required');

    dispatch(setCheckAvailability(data));
  };

  const updateReservation = (data?: Partial<ReservationDataType>, action?: 'reset') => {
    // console.log('onReservation', data);

    if (action === 'reset') {
      dispatch(setReservationReset());
      return;
    }

    if (!data) throw new Error('data is required');

    dispatch(setReservation(data));
  };

  const resetBreakReservation = async () => {
    return Api.unblockRooms(blockRooms.rooms)
      .then(() => {
        dispatch(setBlockRoomsReset());
        dispatch(setReservationReset());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetStore = () => {
    dispatch(setBlockRoomsReset());
    dispatch(setCheckAvailabilityReset());
    dispatch(setReservationReset());
  };

  useEffect(() => {
    if (!checkAvailability.startDate || !checkAvailability.endDate) {
      navigate('/');
    }
  }, [checkAvailability]);

  return {
    updateBlockRooms,
    updateCheckAvailability,
    updateReservation,
    resetStore,
    resetBreakReservation,
    blockRooms,
    checkAvailability,
    reservation,
  };
};

export default useReservation;
