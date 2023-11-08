export interface BookingInterface {
  nombre: string;
  apellido: string;
  order_date: Date;
  check_in: Date;
  check_out: Date;
  special_request: string;
  room_id: number;
  price: string;
  status: string;
}