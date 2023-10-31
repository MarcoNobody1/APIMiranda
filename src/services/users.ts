import { UserInterface } from "../interfaces/Users";
import { Users } from "../models/Users.model";

async function getAllUsers() {
  const users = await Users.find();
  if (users.length === 0) throw new Error("Error al obtener los usuarios.");
  return users;
}

async function getOneUser(userId: string) {
  const user = await Users.findById(userId);
  if (!user) throw new Error("No hay ningun usuario con ese id.");
  return user;
}

async function postNewUser(User: UserInterface) {
  const newUser = await Users.create(User);
  if (!newUser) throw new Error("Tu usuario no se añadio correctamente.");
  return newUser;
}

async function updateUser(
  userId: string,
  update: Partial<UserInterface>
) {
  const updatedUser = await Users.findByIdAndUpdate(userId, update, {
    new: true,
  });

  if (!updatedUser) {
    throw new Error("No puedes modificar un usuario que no existe.");
  }

  return updatedUser;
}

async function deleteUser(userId: string) {
  const deletedUser = await Users.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new Error("No hay ningun usuario con ese id.");
  }

  return deletedUser;
}


export const userService = {
  getAllUsers,
  getOneUser,
  postNewUser,
  updateUser,
  delete: deleteUser,
};
