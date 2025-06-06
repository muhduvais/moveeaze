export interface IRating {
    Source: string;
    Value: string;
}

export interface IMovie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: IRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface IMovieApiResponse {
    movieDetails: IMovie;
    isFavorite: boolean;
}

export interface IFavoritesResponse {
    favorites: IMovie[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
}