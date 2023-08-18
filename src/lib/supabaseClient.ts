import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../schema";

// supabase/auth-helperの設定
const supabaseClient = createPagesBrowserClient<Database>();

export default supabaseClient;

