export interface Metadata {
  resultset: {
    count: number;
    offset: number;
    limit: number;
  };
}

export interface Subgenre {
  id: string;
  name: string;
}

export interface Genre {
  id: string;
  name: string;
  subgenres?: Subgenre[];
}

export interface EpisodeGenre {
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

export interface AudioSource {
  url: string;
  source: string;
}

export interface Link {
  rel: string;
  href: string;
  type: string;
}

export interface Track {
  artist: string;
  title: string;
  uid: string;
  offset: number | null;
  duration: number | null;
}

export interface Episode {
  status: string;
  updated: string;
  name: string;
  description: string;
  description_html: string;
  external_links: string[];
  moods: Mood[];
  genres: EpisodeGenre[];
  location_short: string;
  location_long: string;
  intensity: number | null;
  media: Media;
  episode_alias: string;
  show_alias: string;
  broadcast: string;
  mixcloud: string;
  audio_sources: AudioSource[];
  brand: any;
  embeds: {
    tracklist: {
      metadata: {
        resultset: {
          count: number;
          offset: number;
          limit: number;
        };
      };
      results: Track[];
      links: Link[];
    };
  };
  links: Link[];
}

export interface Collection {
  metadata: Metadata;
  results: Episode[];
  links: Link[];
}

export interface Broadcast {
  broadcast_title: string;
  start_timestamp: string;
  end_timestamp: string;
  embeds: {
    details: Episode;
  };
  links: Link[];
}

export interface ChannelStation {
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

export interface Show {
  status: string;
  updated: string;
  name: string;
  description: string;
  description_html: string;
  external_links: string[];
  moods: string[];
  genres: string[];
  location_short: string | null;
  location_long: string;
  intensity: string;
  media: {
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
  };
  show_alias: string;
  timeslot: string;
  frequency: string;
  brand: object;
  type: string;
  embeds: {
    episodes: {
      metadata: {
        resultset: {
          count: number;
          offset: number;
          limit: number;
        };
      };
      results: Episode[];
    };
  };
  links: {
    rel: string;
    href: string;
    type: string;
  }[];
}


export interface Mood {
  id: string;
  name: string;
  image?: Image;
  description?: string;
}

export interface GenreList {
  results: Genre[];
}


// Results

export interface Artist
  {
    name: string,
    role: string
  }


export interface Article {
  path: string;
  title: string
}


export interface Image {
  large: string;
  medium_large: string;
  medium: string;
  small: string;
  thumb: string;
}

interface Description {
  highlight_html: string;
  highlight_plain: string;
}



export interface ExploreEpisode {
  title: string;
  article_type: string;
  artists: Artist[];
  article: Article;
  audio_sources?: AudioSource[];
  description?: Description;
  image?: Image;
  related_episode: any
  local_date: string;
  location: string;
  genres?: Genre[];
  track_uid: null | string;
  brand: any
}

export interface ExploreColection {
  metadata: Metadata;
  results: ExploreEpisode[];
  links: Link[];
}

interface SearchMetaData {
  popular_terms: string[];
  resultset: {
    count: number;
    offset: number;
    limit: number;
  };
}

export interface SearchResult {
  metadata: SearchMetaData;
  results: ExploreEpisode[];
  links: Link[];
}