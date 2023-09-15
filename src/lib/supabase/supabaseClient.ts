import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "type/supabase";

// supabase/auth-helperの設定
const supabaseClient = createPagesBrowserClient<Database>();

export default supabaseClient;
