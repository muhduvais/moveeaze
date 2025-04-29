import { injectable, inject } from "tsyringe";
import { IMovieDetails } from "../../../domain/entities/IMovie";
import { ISearchMovie } from "../../../domain/use-cases/search/ISearchMovie";
import { IMovieDataProvider } from "../../../domain/services/IMovieDataProvider";

@injectable()
export class SearchMovie implements ISearchMovie {
  constructor(
    @inject("IMovieDataProvider") private omdbService: IMovieDataProvider
  ) {}

  async execute(title: string): Promise<IMovieDetails | []> {
    return this.omdbService.fetchMovieDetails(title);
  }
}
