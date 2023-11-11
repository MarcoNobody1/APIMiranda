import { RoomInterface } from "../interfaces/Rooms";
import { Rooms } from "../models/Rooms.model";

async function getAllRooms() {
  const rooms = await Rooms.find();
  if (rooms.length === 0) throw new Error("Error al obtener las habitaciones.");
  return rooms;
}

async function getOneRoom(roomId: string) {
  const room = await Rooms.findById(roomId);
  if (!room) throw new Error("No hay ninguna habitacion con ese id.");
  return room;
}

async function postNewRoom(room: RoomInterface) {
  const newRoom = await Rooms.create(room);
  if (!newRoom) throw new Error("Tu habitacion no se añadio correctamente.");
  return newRoom;
}

async function updateRoom(
  roomId: string,
  update: Partial<RoomInterface>
) {
  const updatedRoom = await Rooms.findByIdAndUpdate(roomId, update, {
    new: true,
  });

  if (!updatedRoom) {
    throw new Error("No puedes modificar una habitacion que no existe.");
  }

  return updatedRoom;
}

async function deleteRoom(roomId: string) {
  const deletedRoom = await Rooms.findByIdAndDelete(roomId);

  if (!deletedRoom) {
    throw new Error("No hay ninguna habitacion con ese id.");
  }

  return deletedRoom;
}

export const roomService = {
  getAllRooms,
  getOneRoom,
  postNewRoom,
  updateRoom,
  delete: deleteRoom,
};
