import { RoomInterface } from "../interfaces/Rooms";
import { QueryHandler } from "../util/connection";

async function getAllRooms() {
  const query = "SELECT * FROM room";

  const rooms = await QueryHandler(query);

  return rooms;
}

async function getOneRoom(roomId: string) {
  const query = "SELECT * FROM room WHERE id = ?";

  const fields = [roomId];

  const room = await QueryHandler(query, fields);

  return room;
}

async function postNewRoom(room: RoomInterface) {
  const query =
  "INSERT INTO room (number, type, description, price, discount, availability) VALUES (?,?,?,?,?,?)";

const fields = [
  room.number,
  room.type,
  room.description,
  room.price,
  room.discount,
  room.availability,
];

const newRoom = await QueryHandler(query, fields);

return newRoom;
}

async function updateRoom(
  roomId: string,
  update: Partial<RoomInterface>
) {
  const query =
  "UPDATE room SET(number = ?, type = ?, description = ?, price = ?, discount = ?, availability = ?) WHERE id = ?";

const fields = [
  update.number,
  update.type,
  update.description,
  update.price,
  update.discount,
  update.availability,
  roomId,
];

const updatedRoom = await QueryHandler(query, fields);

return updatedRoom;
}

async function deleteRoom(roomId: string) {
  const query = "DELETE room WHERE id = ?";

  const fields = [roomId];

  const deletedRoom = await QueryHandler(query, fields);

  return deletedRoom;
}

export const roomService = {
  getAllRooms,
  getOneRoom,
  postNewRoom,
  updateRoom,
  delete: deleteRoom,
};