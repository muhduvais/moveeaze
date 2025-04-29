import { IBaseRepository } from "../../../domain/repositories/IBaseRepository";
import { Model } from "mongoose";

export class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private model: Model<any>) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async create(item: T): Promise<T> {
    return this.model.create(item);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
