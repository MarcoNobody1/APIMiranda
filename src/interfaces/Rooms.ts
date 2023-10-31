export interface RoomInterface {
  room_name: {
    id: string;
    room_photo: string;
    room_number: number;
    room_description: string;
  };
  room_type: string;
  amenities: string[];
  price: number;
  offer_price: {
    isOffer: boolean;
    discount: number;
  };
  availability: string;
}