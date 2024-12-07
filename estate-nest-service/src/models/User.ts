import { supabase } from '../utils/supabaseClient';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Store hashed passwords
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>; // Return user data without the password
}

// Create a new user
export const createUser = async (user: Omit<User, 'id'>): Promise<User | null> => {
  const { data, error } = await supabase.from('users').insert([user]);

  if (error) throw error;
  return data;
};

// Find a user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) throw error;
  return data;
};

// `
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name TEXT NOT NULL,
//       email TEXT UNIQUE NOT NULL,
//       password TEXT NOT NULL,
//       created_at TIMESTAMP DEFAULT NOW()
//     );
//   `
