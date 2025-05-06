import { IMovieSearchResponse } from "../../apiResponses/IMovieSearchResponse";

export interface ISearchMovie {
    execute(title: string, userId: string): Promise<IMovieSearchResponse>;
}
