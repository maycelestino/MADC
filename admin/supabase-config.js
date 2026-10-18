const SUPABASE_URL =
    "https://yefyokjiazldpzcycqhf.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_s9lhQHK6fTL17YLkGbu_ZA_qozjDi0H";

  const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);