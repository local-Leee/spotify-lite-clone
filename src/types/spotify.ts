export interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Image[];
  owner: {
    display_name: string;
    id: string;
  };
  tracks: {
    total: number;
  };
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylistsResponse {
  items: SpotifyPlaylist[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  images: Image[];
  total_tracks: number;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyAlbumsResponse {
  items: {
    added_at: string;
    album: SpotifyAlbum;
  }[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: Image[];
  followers: {
    total: number;
  };
  genres: string[];
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyArtistsResponse {
  artists: {
    items: SpotifyArtist[];
    total: number;
    limit: number;
    offset: number;
  };
}

export interface SpotifyFollowedArtistsResponse {
  artists: {
    items: SpotifyArtist[];
    next: string | null;
    total: number;
    limit: number;
    offset: number;
    href: string;
    cursors: {
      after: string;
    };
  };
}