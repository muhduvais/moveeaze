export interface IRemoveFavoriteMovie {
    execute(userId: string, movieId: string): Promise<void>;
}
