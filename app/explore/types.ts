import { Genre, Mood } from "@/types/shows";

export type drawerTypes = "Moods" | "Genres" | "Results";

export interface searchQueryInterface {
  mood: Mood | null;
  genres: { [key: string]: Genre };
}

export interface ExtendedMood extends Mood {
  type?: "Mood";
}

export interface ExtendedGenre extends Genre {
  type?: "Genre";
}
