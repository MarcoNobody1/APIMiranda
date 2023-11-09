import { RoomInterface } from "../interfaces/Rooms";
import { QueryHandler } from "../util/connection";

async function getAllRooms() {
  const query = `SELECT r.*,
    GROUP_CONCAT(DISTINCT p.photo_url) as photo,
    GROUP_CONCAT(a.amenity) as amenity
    FROM room r
    LEFT JOIN photos p ON r.id = p.room_id
    LEFT JOIN room_amenities ra ON r.id = ra.room_id
    LEFT JOIN amenity a ON ra.amenity_id = a.id
    GROUP BY r.id`;

  const rooms = await QueryHandler(query);

  return rooms;
}

async function getOneRoom(roomId: string) {
  const query = `SELECT r.*,
  GROUP_CONCAT(DISTINCT p.photo_url) as photo,
  GROUP_CONCAT(a.amenity)
  FROM room r
  LEFT JOIN photos p ON r.id = p.room_id
  LEFT JOIN room_amenities ra ON r.id = ra.room_id
  LEFT JOIN amenity a ON ra.amenity_id = a.id
  WHERE r.id = ?
  GROUP BY r.id`;

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

  const newRoom: any = await QueryHandler(query, fields);

  const roomId = newRoom.insertId;

  const query2 = "INSERT INTO photos (photo_url, room_id) VALUES (?, ?)";

  const fields2 = ["https://tinyurl.com/PhotoRoomSample", roomId];

  await QueryHandler(query2, fields2);

  const query3 = `INSERT INTO room_amenities (room_id, amenity_id) VALUES (${roomId},1), (${roomId},2), (${roomId},3), (${roomId},4), (${roomId},5), (${roomId},6)`;

  await QueryHandler(query3);

  return newRoom;
}

async function updateRoom(roomId: string, update: Partial<RoomInterface>) {
  const query =
    "UPDATE room SET number = ?, type = ?, description = ?, price = ?, discount = ?, availability = ? WHERE id = ?";

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
  const query = "DELETE FROM room WHERE id = ?";

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
