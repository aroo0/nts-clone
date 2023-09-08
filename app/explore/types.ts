import { Genre, Mood } from "@/types/shows";

export type drawerTypes = "Moods" | "Genres" | "Results";

export interface searchQueryInterface {
  moods?: string,
  genres: string[]
}


export interface ExtendedMood extends Mood {
  type?: "Mood";
}

export interface ExtendedGenre extends Genre {
  type?: "Genre";
}
