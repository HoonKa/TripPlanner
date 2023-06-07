import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function allUserData(): Promise<User[]> {
  const allUsers = await userRepository.find();

  return allUsers;
}

async function addUser(email: string, passwordHash: string): Promise<User> {
  // Create the new user object
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;

  await userRepository.save(newUser);

  return newUser;
}

async function getAllUsers(): Promise<User[]> {
  return userRepository.find();
}

async function getUserByEmail(email: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { email }, relations: ['transactions'] });

  return user;
}

async function getUserByID(userId: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId }, relations: ['transactions'] });

  return user;
}

export { allUserData, addUser, getUserByEmail, getAllUsers, getUserByID };
