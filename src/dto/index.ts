export interface ListMoviesParams {
  language?: string; // Defaults to en-US
  page?: number; // Defaults to 1
  region?: number;
  genre_id?: number;
}

export interface SearchMoviesParams {
  query: string;
  include_adult?: boolean; // Defaults to false
  language?: string; // Defaults to en-US
  page?: number; // Defaults to 1
  region?: number;
  year?: number;
}
