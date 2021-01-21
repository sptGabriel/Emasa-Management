import { Document, model, Model, Schema } from 'mongoose';

const UserDeviceSchema = new Schema(
  {
    employee_id: {
      type: String,
      trim: true,
      required: true,
		},
		device: {
			type: String,
			enum: ['Chrome','Firefox','MSIE','Edge','Safari', 'Opera'],
			trim: true,
      required: true,
		},
		os: {
      type: String,
			trim: true,
			enum: ['Win','Mac','X11','Linux', 'Android', 'IOS'],
      required: true,
    },
    ip: {
      type: String,
      trim: true,
      required: true,
    },
    longitude: {
      type: String,
      trim: true,
      required: true,
    },
    latitude: {
      type: String,
      trim: true,
      required: true,
    },
    timezone: {
      type: String,
      trim: true,
      required: true,
    },
    online: {
      type: Boolean,
      trim: true,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserDeviceSchema.index(
  { employee_id: 1, ip: 1, device: 1, os: 1 },
  { unique: true },
);

export interface IUserDevice {
  employee_id: string;
  device: string;
  ip: string;
  os: string;
  longitude: string;
  latitude: string;
  timezone: string;
  online: boolean;
}

type UserDeviceDoc = Document & IUserDevice;
export interface UserDeviceDocument extends UserDeviceDoc {}
// For model
export interface UserDeviceModel extends Model<UserDeviceDocument> {}
//model
export const UserDevice = model<UserDeviceDocument>(
  'AuthorizedUserDevice',
  UserDeviceSchema,
);
