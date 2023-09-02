export type VideoData = {
  birth_year: number | null;
  casts: CastsType
  created_at: string;
  creator_id: string | null;
  description: string | null;
  id: string;
  is_uploaded: boolean | null;
  running_time: number | null;
  staffs: StaffsType
  thumbnail_url: string | null;
  title: string | null;
  vimeo_uri: string | null;
};

export type StaffsType = {
  directors: string[];
  writers: string[];
  cinematographers: string[];
  sound_designers: string[];
  lighting_designers: string[];
  sound_recordists: string[];
  music_directors: string[];
  art_directors: string[];
  editors: string[];
  producers: string[];
};

export type CastsType = {
  no_name: string[];
}
