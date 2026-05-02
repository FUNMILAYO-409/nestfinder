import { supabase } from "./supabaseClient";

export async function fetchSavedPropertyIds(userId) {
  if (!supabase || !userId) return [];

  const { data, error } = await supabase
    .from("saved_properties")
    .select("property_id")
    .eq("user_id", userId);

  if (error) throw error;
  return (data || []).map((row) => row.property_id);
}

export async function addSavedProperty(userId, propertyId) {
  if (!supabase || !userId) return;

  const { error } = await supabase
    .from("saved_properties")
    .upsert(
      {
        user_id: userId,
        property_id: propertyId,
      },
      { onConflict: "user_id,property_id" }
    );

  if (error) throw error;
}

export async function removeSavedProperty(userId, propertyId) {
  if (!supabase || !userId) return;

  const { error } = await supabase
    .from("saved_properties")
    .delete()
    .eq("user_id", userId)
    .eq("property_id", propertyId);

  if (error) throw error;
}
