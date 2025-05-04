import axios from "axios";
import { IMovieDataProvider } from "../../domain/services/IMovieDataProvider";
import { injectable } from "tsyringe";
import { IMovieDetails } from "../../domain/entities/IMovie";

@injectable()
export class OmdbApiService implements IMovieDataProvider {
  
  async fetchMovieDetails(title: string): Promise<IMovieDetails> {
    const { data } = await axios.get(process.env.OMDB_API_URL, {
      params: { t: title, apikey: process.env.OMDB_API_KEY },
    });
    return data || [];
  }

  async fetchMovieByImdbID(imdbID: string): Promise<IMovieDetails | null> {
    const { data } = await axios.get(process.env.OMDB_API_URL, {
      params: { i: imdbID, apikey: process.env.OMDB_API_KEY },
    });
    return data;
  }
}
