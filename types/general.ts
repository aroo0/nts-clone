import { AudioSource } from "./shows";

export interface toggleRadioParams {
  stationName: string;
  type: "radio" | "mixtape" | "episode" | undefined;
  source?: string;
  sourceType?: string;
  info?: activePlayerInfo;
}

export interface activePlayerInfo {
  name?: string,
  date?: string,
  image?: string,
  animation?: string,
  subtitle?: string,
  tracklist?: string,
  source?: AudioSource[]
  
}

