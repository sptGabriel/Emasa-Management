import mongoose, { Document, Schema, Model } from 'mongoose';

export type PasswordRecoveryAttributes = {
  employee_id: string;
  email: string;
  token: string;
  used: boolean;
  expiration: Date;
  expire_at: Date;
  latitude: string;
  longitude: string;
};

const PasswordRecoverySchema = new Schema(
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
    expire_at: { type: Date, default: Date.now, expires: 120 },
  },
  {
    timestamps: true,
  },
);
type PasswordRecoveryDoc = Document & PasswordRecoveryAttributes;
export interface PasswordRecoveryDocument extends PasswordRecoveryDoc {}
// For model
export interface PasswordRecoveryModel
  extends Model<PasswordRecoveryDocument> {}
export default mongoose.model<PasswordRecoveryDocument>(
  'PasswordRecovery',
  PasswordRecoverySchema,
);
