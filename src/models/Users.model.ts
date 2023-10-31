import usersData from "../data/Users.json";
import { UserInterface } from "../interfaces/Users";

export const users = usersData as UserInterface[];

async function getAllUsers() {
  //logica futura en DB.
  const data = await users;
  if (data.length === 0) throw new Error("No existen reservas.");
  return data;
}

async function getOneUser(userId: string) {
  //logica futura en DB.
  const data = await users.filter(
    (user) => user.name.id === userId
  );
  if (data.length === 0) throw new Error("No hay ninguna reserva con ese id.");
  return data;
}

async function postNewUser(user: UserInterface) {
  //logica futura en DB.
  const initialLength = users.length;
  const data = await users.push(user);
  if(data === initialLength) throw new Error("Tu reserva no se añadio correctamente.")
  return data;
}

async function updateUser(
  userId: string,
  update: Partial<UserInterface>
) {
  //logica futura en DB.
  const userIndex = await users.findIndex(
    (user) => user.name.id === userId
  );

  if (userIndex === -1) throw new Error("No puedes modificar una reserva que no existe.")
  const data = [...users];
  Object.assign(data[userIndex], update);
  return data;

}

async function deleteUser(userId: string) {
  //logica futura en DB.

  const userIndex = await users.findIndex(
    (user) => user.name.id === userId
  );

  if (userIndex === -1) throw new Error("No hay ninguna reserva con ese id.");

  const data = users.splice(userIndex, 1);
  return data;
}

export const userService = {
  getAllUsers,
  getOneUser,
  postNewUser,
  updateUser,
  delete: deleteUser,
};
