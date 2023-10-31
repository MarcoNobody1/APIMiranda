export interface BookingInterface {
  guest: {
    nombre: string;
    apellidos: string;
    id_reserva: string;
  };
  order_date: string;
  check_in: string;
  check_out: string;
  special_request: string;
  room: {
    id: string,
    room_type: string;
    room_number: string;
    price: number;
    amenities: string[];
    room_description: string;
  };
  status: string;
}