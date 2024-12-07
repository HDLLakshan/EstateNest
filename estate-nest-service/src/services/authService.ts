import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser, User, AuthResponse } from '../models/User';

const JWT_SECRET = 'your-secret-key'; // Replace with your actual secret key

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User | null> => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({ name, email, password: hashedPassword });
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return { token, user };
};
