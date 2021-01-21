import { Document, model, Model, Schema } from 'mongoose';

const LastAccessSchema = new Schema(
  {
    device: {
			type: Schema.Types.ObjectId,
			ref: 'AuthorizedUserDevice',
			required: true,
		},
		access_at: {
      type: Date,
      trim: true,
      required: true,
		},
  },
  {
    timestamps: true,
  },
);
export interface ILastAccess{
  device: string;
	access_at: Date;
}

type LastAccessDoc = Document & ILastAccess;
export interface LastAccessDocument extends LastAccessDoc {}
// For model
export interface LastAccessModel extends Model<LastAccessDocument> {}
//model
export const LastUserAccess = model<LastAccessDocument>(
  'LastUserAccess',
  LastAccessSchema,
);
