export interface BookingInterface {
  name: string;
  surname: string;
  order_date: string;
  check_in: string;
  check_out: string;
  special_request: string;
  room_id: any;
  room_type: string;
  room_number: string;
  room_amenities: string[];
  room_description: string;
  price: number;
  status: string;
}
