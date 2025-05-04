import { IOMDbService } from "../services/IOMDbService";
import { IMovieDetails } from "../models/IMovieDetails";

export class SearchMovie {
  constructor(private omdbService: IOMDbService) {}

  async execute(title: string): Promise<IMovieDetails | null> {
    return this.omdbService.fetchMovie(title);
  }
}
