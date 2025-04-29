import { IMovieDetails } from "../../entities/IMovie";

export interface ISearchMovie {
    execute(title: string): Promise<IMovieDetails | []>;
}
