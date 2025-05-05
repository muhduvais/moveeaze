export interface IMovieService {
    searchMovie(title: string): Promise<any>;
    getFavourites(page: number): Promise<any>;
    addFavourite(imdbID: string): Promise<any>;
    removeFavourite(imdbID: string): Promise<any>;
}