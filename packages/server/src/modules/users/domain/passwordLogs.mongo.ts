import mongoose, { Document, Schema, Model } from 'mongoose';

export type PasswordLogsAttributes = {
  employee_id: string;
  email: string;
  token: string;
  used: boolean;
  expiration: Date;
  latitude: string;
  longitude: string;
};

const PasswordLogsSchema = new Schema(
  {
    employee_id: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    token: {
      type: String,
      trim: true,
      required: true,
    },
    used: {
      type: Boolean,
      trim: true,
      default: false,
      required: true,
    },
    expiration: {
      type: Date,
    },
    ip: {
      type: String,
      trim: true,
      required: true,
    },
    latitude: {
      type: String,
      trim: true,
      required: false,
    },
    longitude: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
type PasswordLogsDoc = Document & PasswordLogsAttributes;
export interface PasswordLogsDocument extends PasswordLogsDoc {}
// For model
export interface PasswordLogsModel extends Model<PasswordLogsDocument> {}
export default mongoose.model<PasswordLogsDocument>(
  'password_exchange_logs',
  PasswordLogsSchema,
);
