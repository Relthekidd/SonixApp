export type Track = {
  id: string;
  title: string;
  artist: string;
  audio: string;
  cover?: string;
  profiles?: {
    username?: string;
    avatar_url?: string;
  };
};
