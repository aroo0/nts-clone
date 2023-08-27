export interface MixtapeCredits {
  name: string;
  path: string;
}

export interface MixtapeMedia {
  animation_large_landscape: string;
  animation_large_portrait: string;
  animation_thumb: string;
  icon_black: string;
  icon_white: string;
  picture_large: string;
  picture_medium: string;
  picture_medium_large: string;
  picture_small: string;
  picture_thumb: string;
}

export interface Mixtape {
  mixtape_alias: string;
  title: string;
  subtitle: string;
  description: string;
  description_html: string;
  audio_stream_endpoint: string;
  credits: MixtapeCredits[];
  media: MixtapeMedia;
  now_playing_topic: string;
  links: { rel: string; href: string; type: string }[];
}

export interface MixtapeList {
  metadata: {
    subtitle: string;
    credits: string;
    mq_host: string;
    animation_large_portrait: string;
  };
  results: Mixtape[];
  links: { rel: string; href: string; type: string }[];
}

