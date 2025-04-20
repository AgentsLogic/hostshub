import { useEffect, useState } from "react";
import { Guest } from "@/lib/types";
import { supabase } from "@/lib/supabase";

/**
 * Fetches guests list from Supabase profiles table
 */
export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGuests() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        const mapped = (data ?? []).map((profile: any) => ({
          id: profile.id,
          full_name: profile.full_name,
          email: profile.email,
          phone: profile.phone_number ?? undefined,
          profile_image_url: profile.avatar_url ?? undefined,
          created_at: profile.created_at,
          last_active_at: profile.updated_at,
          total_bookings: 0, // Placeholder, fetch count separately if needed
          notes: "", // Placeholder, extend schema if needed
        })) as Guest[];
        setGuests(mapped);
      }
      setLoading(false);
    }

    fetchGuests();
  }, []);

  return { guests, loading, error };
}
