import { useAppDispatch, useAppSelector } from '../../hook/useRTK';
import { BlockRoomsDataType, CheckAvailabilityDataType, ReservationDataType } from '../../models/Reservation';
import { setBlockRooms, setBlockRoomsReset } from '../slices/blockRooms';
import { setCheckAvailability, setCheckAvailabilityReset } from '../slices/checkAvailability';
import { setReservation, setReservationReset } from '../slices/reservation';

const useReservation = () => {
  const { blockRooms, checkAvailability, reservation } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const updateBlockRooms = (data: BlockRoomsDataType, action?: 'reset') => {
    console.log('onBlockRooms', data);

    if (action === 'reset') {
      dispatch(setBlockRoomsReset());
      return;
    }

    dispatch(setBlockRooms(data));
  };

  const updateCheckAvailability = (data: CheckAvailabilityDataType, action?: 'reset') => {
    console.log('onCheckAvailability');

    if (action === 'reset') {
      dispatch(setCheckAvailabilityReset());
      return;
    }

    dispatch(setCheckAvailability(data));
  };

  const updateReservation = (data: Partial<ReservationDataType>, action?: 'reset') => {
    console.log('onReservation', data);

    if (action === 'reset') {
      dispatch(setReservationReset());
      return;
    }

    dispatch(setReservation(data));
  };

  return { updateBlockRooms, updateCheckAvailability, updateReservation, blockRooms, checkAvailability, reservation };
};

export default useReservation;
