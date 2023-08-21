export interface Show {
  channel_name: string;
  now: Broadcast;
  next: Broadcast;
  next2: Broadcast;
  next3: Broadcast;
  next4: Broadcast;
  next5: Broadcast;
  next6: Broadcast;
  next7: Broadcast;
  next8: Broadcast;
  next9: Broadcast;
  next10: Broadcast;
  next11: Broadcast;
  next12: Broadcast;
  next13: Broadcast;
  next14: Broadcast;
  next15: Broadcast;
  next16: Broadcast;
  next17: Broadcast;
}

export interface Broadcast {
  broadcast_title: string;
  start_timestamp: string;
  end_timestamp: string;
  embeds: BroadcastDetails;
  links: Link[];
}

export interface BroadcastDetails {
  details: {
    status: string;
    updated: string;
    name: string;
    description: string;
    description_html: string;
    external_links: string[];
    moods: Mood[];
    genres: Genre[];
    location_short: string;
    location_long: string;
    intensity: any;
    media: Media;
    episode_alias: string;
    show_alias: string;
    broadcast: string;
    mixcloud: string | null;
    audio_sources: any[]; // You can define a more specific type here if needed
    brand: any; // You can define a more specific type here if needed
    embeds: any; // You can define a more specific type here if needed
    links: Link[];
  };
}

export interface Link {
  href: string;
  rel: string;
  type: string;
}

export interface Mood {
  id: string;
  value: string;
}

export interface Genre {
  id: string;
  value: string;
}

export interface Media {
  background_large: string;
  background_medium_large: string;
  background_medium: string;
  background_small: string;
  background_thumb: string;
  picture_large: string;
  picture_medium_large: string;
  picture_medium: string;
  picture_small: string;
  picture_thumb: string;
}
