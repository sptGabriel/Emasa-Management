// import mongoose, { Document, Schema, Model } from 'mongoose';

import { IModel } from '@shared/core/mongoModel';
import { model, Schema, Document } from 'mongoose';

// enum PasswordChangeType {
//   default = 'default',
//   resetPwd = 'reset-password'
// }

// export type PasswordLogsAttributes = {
//   employee_id: string;
//   old_password: string;
//   new_password: string;
//   type: PasswordChangeType;
//   ip: string;
//   latitude: string;
//   longitude: string;
//   os: string;
//   device: string;
// };

// const PasswordLogsSchema = new Schema(
//   {
//     employee_id: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     old_password: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     new_password: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     type: {
//       type: String,
//       trim: true,
//       default: 'default',
//       enum: ['default','reset-password'],
//       required: true,
//     },
//     ip: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     device: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     os: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     latitude: {
//       type: String,
//       trim: true,
//       required: false,
//     },
//     longitude: {
//       type: String,
//       trim: true,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );
// type PasswordLogsDoc = Document & PasswordLogsAttributes;
// export interface PasswordLogsDocument extends PasswordLogsDoc {}
// // For model
// export interface PasswordLogsModel extends Model<PasswordLogsDocument> {}
// export default mongoose.model<PasswordLogsDocument>(
//   'password_exchange_logs',
//   PasswordLogsSchema,
// );

interface IPasswordLogs extends Document {
  employee_id: string;
  old_password: string;
  new_password: string;
  type: string;
  ip: string;
  latitude: string;
  longitude: string;
  os: string;
  device: string;
}

export class PasswordLogs extends IModel<IPasswordLogs> {
  constructor() {
    super();
    const schema = new Schema(
      {
        employee_id: { type: String, trim: true, required: true },
        old_password: {
          type: String,
          trim: true,
          required: true,
        },
        new_password: {
          type: String,
          trim: true,
          required: true,
        },
        type: {
          type: String,
          trim: true,
          default: 'default',
          enum: ['default', 'reset-password'],
          required: true,
        },
        ip: {
          type: String,
          trim: true,
          required: true,
        },
        device: {
          type: String,
          trim: true,
          required: true,
        },
        os: {
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
      { timestamps: true },
    );
    this._model = model<IPasswordLogs>('password_exchange_logs', schema);
  }
}
