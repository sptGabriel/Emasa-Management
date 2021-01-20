import { Model, Document } from "mongoose";

export abstract class IModel<T extends Document<any>> {
  protected _model: Model<T>;
  constructor() {
  }
  public get model(): Model<T> {
    return this._model
  }
}