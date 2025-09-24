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

// 플레이리스트 트랙 관련 타입
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
    images: Image[];
  };
  duration_ms: number;
  explicit: boolean;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylistTrack {
  added_at: string;
  added_by: {
    id: string;
  };
  is_local: boolean;
  track: SpotifyTrack;
}

export interface SpotifyPlaylistTracksResponse {
  items: SpotifyPlaylistTrack[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

// 플레이리스트 상세 정보 (트랙 포함)
export interface SpotifyPlaylistDetail extends SpotifyPlaylist {
  tracks: SpotifyPlaylistTracksResponse;
  followers: {
    total: number;
  };
  public: boolean;
  collaborative: boolean;
}