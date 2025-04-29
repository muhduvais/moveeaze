export interface IAddFavoriteMovie {
    execute(userId: string, imdbID: string): Promise<void>;
}
