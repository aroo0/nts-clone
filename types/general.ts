export interface toggleRadioParams {
  stationName: string;
  type: "radio" | "mixtape" | "episode" | undefined;
  source?: string;
  info?: object;
}