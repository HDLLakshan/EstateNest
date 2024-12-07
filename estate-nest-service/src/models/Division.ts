import { supabase } from '../utils/supabaseClient';

export interface Division {
  id?: string;
  name: string;
  code: string;
  size?: number;
  number_of_plants?: number;
  target_kilos?: number;
  status: string;
}

// Create a division
export const createDivision = async (division: Division): Promise<Division | null> => {
  const { data, error } = await supabase.from('divisions').insert([division]);
  if (error) throw error;
  return data;
};

// Get all divisions
export const getDivisions = async (): Promise<Division[] | null> => {
  const { data, error } = await supabase.from('divisions').select('*');
  if (error) throw error;
  return data;
};

// Get a single division by ID
export const getDivisionById = async (id: string): Promise<Division | null> => {
  const { data, error } = await supabase
    .from('divisions')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

// Update a division by ID
export const updateDivision = async (
  id: string,
  updates: Partial<Division>,
): Promise<Division | null> => {
  const { data, error } = await supabase.from('divisions').update(updates).eq('id', id);
  if (error) throw error;
  return data;
};

// Delete a division by ID
// export const deleteDivision = async (id: string) => {
//   const { data, error } = await supabase.from('divisions').delete().eq('id', id);
//   if (error) throw error;
//   return data;
// };

/*
CREATE TABLE divisions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  size NUMERIC, -- Optional: Division size
  number_of_plants INTEGER, -- Optional: Number of plants
  target_kilos NUMERIC, -- Optional: Target kilos
  status TEXT NOT NULL DEFAULT 'active', -- Status (e.g., active, inactive)
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
*/
