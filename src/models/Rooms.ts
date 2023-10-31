import RoomsData from "../data/rooms.json";
import { RoomInterface } from "../interfaces/Rooms";

export const Rooms = RoomsData as RoomInterface[];

async function getAllrooms() {
  //logica futura en DB.
  const data = await Rooms;
  if (data.length === 0) throw new Error("No existen reservas.");
  return data;
}

async function getOneRoom(RoomId: string) {
  //logica futura en DB.
  const data = await Rooms.filter(
    (Room) => Room.room_name.id === RoomId
  );
  if (data.length === 0) throw new Error("No hay ninguna reserva con ese id.");
  return data;
}

async function postNewRoom(Room: RoomInterface) {
  //logica futura en DB.
  const initialLength = Rooms.length;
  const data = await Rooms.push(Room);
  if(data === initialLength) throw new Error("Tu reserva no se añadio correctamente.")
  return data;
}

async function updateRoom(
  RoomId: string,
  update: Partial<RoomInterface>
) {
  //logica futura en DB.
  const RoomIndex = await Rooms.findIndex(
    (Room) => Room.room_name.id === RoomId
  );

  if (RoomIndex === -1) throw new Error("No puedes modificar una reserva que no existe.")
  const data = [...Rooms];
  Object.assign(data[RoomIndex], update);
  return data;

}

async function deleteRoom(RoomId: string) {
  //logica futura en DB.

  const RoomIndex = await Rooms.findIndex(
    (Room) => Room.room_name.id === RoomId
  );

  if (RoomIndex === -1) throw new Error("No hay ninguna reserva con ese id.");

  const data = Rooms.splice(RoomIndex, 1);
  return data;
}

export const roomService = {
  getAllrooms,
  getOneRoom,
  postNewRoom,
  updateRoom,
  delete: deleteRoom,
};
