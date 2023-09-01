export interface toggleRadioParams {
  stationName: string;
  type: "radio" | "mixtape" | "episode" | undefined;
  source?: string;
  info?: activePlayerInfo;
}

export interface activePlayerInfo {
  image: string,
  animation: string,
  subtitle: string
}