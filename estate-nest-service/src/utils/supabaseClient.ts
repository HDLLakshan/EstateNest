import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.SUPABASE_URL || 'https://whdldykholeipbviqjxm.supabase.co'; // Replace with your Supabase URL
const supabaseKey =
  process.env.SUPABASE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZGxkeWtob2xlaXBidmlxanhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1ODA0OTksImV4cCI6MjA0OTE1NjQ5OX0.65vM-JyPRj8hipimyZ_ZlmY0qjgvja7jcT5qFuG-RaM'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
