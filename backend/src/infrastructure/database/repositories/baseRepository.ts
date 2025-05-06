import { IBaseRepository } from "../../../domain/repositories/IBaseRepository";
import { Model, Document } from "mongoose";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected model: Model<T>) { }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).lean<T>().exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async create(item: Partial<T>): Promise<T> {
    const result = await this.model.create(item);
    return result.toObject() as T;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
