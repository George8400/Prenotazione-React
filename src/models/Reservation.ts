export type CheckAvailabilityDataType = {
  startDate: Date | null;
  endDate: Date | null;
  numAdults: number;
  numChildren: number;
  numRooms: number;
  coupon: string;
};

export type BlockRoomsDataType = {
  startDate: Date;
  endDate: Date;
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
  startDate: Date | null;
  endDate: Date | null;
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
  numNights: number;
  confirmReservation: boolean; // true quando si va avanti con il tasto prosegui; altrimenti i dati inseriti non sono validi per lo step successivo
};

export type CategoryRateDataType = {
  idCategory: string;
  categoryName: string;
  rateName: string;
  idRate: string;
  room: number | null;
  numAdults: number;
  numChildren: number;
  ageChildren: number; // media
  price: string;
  amount: number;
};
