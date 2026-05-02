import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const toAppUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
  };
};
