import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../schema";

const supabaseClient = createPagesBrowserClient<Database>();

export default supabaseClient;

