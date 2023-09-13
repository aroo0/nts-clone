import { Database as DB } from "@/types/supabase";

export type EpisodeLike = DB["public"]["Tables"]["episodeLikes"]["Row"];
type Episodes = DB["public"]["Tables"]["episode"]["Row"];


type ShowLike = DB["public"]["Tables"]["showLikes"]["Row"];
type Shows = DB["public"]["Tables"]["shows"]["Row"];


declare global {
  type Database = DB;
  type ShowLikeWithShow = ShowLike & {
    shows: Shows;
  };
  type EpisodeLikeWithEpisode = EpisodeLike & {
    episodes: Episodes;
  };
}
