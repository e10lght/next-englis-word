import { createClient } from "@supabase/supabase-js";

// export default createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
console.log(process.env.NEXT_PUBLIC_SUPABASE_KEY);
export default createClient(supabaseUrl!, supabaseKey!);
