import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET;

if (!supabaseUrl || !supabaseKey) {
  console.log(supabaseUrl, supabaseKey);
  throw new Error(
    "Supabase URL or Secret Key is not set in environment variables."
  );
}

const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
