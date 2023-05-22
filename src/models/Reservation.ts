export type CheckAvailabilityDataType = {
  startDate: string;
  endDate: string;
  numAdults: number;
  numChildren: number;
  numRooms: number;
  coupon: string;
};

export type BlockRoomsDataType = {
  idCategory: number;
  numRooms: number;
  startDate: string;
  endDate: string;
}[];

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
};

export type CategoryRateDataType = {
  idCategory: string;
  rate: string;
  room: number;
  numAdults: number;
  numChildren: number;
  ageChildren: number; // media
  price: string;
  amount: number;
};
