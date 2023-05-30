export type CheckAvailabilityDataType = {
  startDate: Date | null;
  endDate: Date | null;
  numAdults: number;
  numChildren: number;
  numRooms: number;
  coupon: string;
};

export type BlockRoomsDataType = {
  startDate: Date | null;
  endDate: Date | null;
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
  rooms: string[]; // roomsBlocked
  categoryRates: CategoryRateDataType[];
  idEvent: number;
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
  paymentMade: boolean;
  timer: Date | null;
  expired: boolean;
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
  typology: string;
};
