import { Database as DB } from "@/types/supabase"

export type EpisodeLike = DB["public"]["Tables"]["episodeLikes"]["Row"];


declare global {
  type Database = DB;
}