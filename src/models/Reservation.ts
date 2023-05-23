export type CheckAvailabilityDataType = {
  startDate: string;
  endDate: string;
  numAdults: number;
  numChildren: number;
  numRooms: number;
  coupon: string;
};

export type BlockRoomsDataType = {
  startDate: string;
  endDate: string;
  listCategory: {
    idCategory: string;
    amount: string;
  }[];
};

export type ReservationDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  rooms: number[]; // roomsBlocked
  categoryRates: CategoryRateDataType[];
  idEvent: string;
  notes: string[];
  numRooms: number;
  numAdults: number;
  numChildren: number;
  ageChildren: number;
  advancePayment: number;
  totalRooms: number;
  totalPrice: number;
  coupon: string;
};

export type CategoryRateDataType = {
  idCategory: string;
  idRate: string;
  room: number | null;
  numAdults: number;
  numChildren: number;
  ageChildren: number; // media
  price: string;
  amount: number;
};
