import { Connection, FilterQuery, Model, Schema } from 'mongoose';

//TODO: MAPPER ?!
export abstract class BaseRepository<T> {
    public _model: Model<T>;

    constructor(db: Connection, modelName: string, schema: Schema<T>) {
        if (db.modelNames().includes(modelName)) {
            this._model = db.model(modelName) as Model<T>;
        } else {
            this._model = db.model<T>(modelName, schema);
        }
    }

    async create(item: T): Promise<T> {
        const resItem = await this._model.create(item);
        return resItem;
    }

    async getOneByIdentifier(identifierQuery: FilterQuery<T>): Promise<T | null> {
        let raw: T = await this._model.findOne(identifierQuery).lean();
        return raw;
    }

    async getOneByField(query: FilterQuery<T>): Promise<T | null> {
        let raw: T = await this._model.findOne(query).lean();
        return raw;
    }

    async update(identifier: string, item: Partial<T>): Promise<T | null> {
        const updatedRes = await this._model.findByIdAndUpdate(identifier, { $set: item });
        return updatedRes;
    }

    async deleteByIdentifier(identifierQuery: FilterQuery<T>): Promise<T | null> {
        const resDelete = await this._model.findOneAndDelete(identifierQuery);
        return resDelete;
    }

    // get all items with optional pagination
    async getAll(pagination?: any): Promise<T[]> {
        let items: T[] = await this._model.find({}, null, pagination).lean();
        return items;
    }

    async getMany(query: FilterQuery<T>): Promise<T[]> {
        let items: T[] = await this._model.find(query).lean();
        return items;
    }
}
