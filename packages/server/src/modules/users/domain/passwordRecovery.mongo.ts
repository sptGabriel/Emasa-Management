// import mongoose, { Document, Schema, Model } from 'mongoose';

import { IModel } from '@shared/core/mongoModel';
import { Document, model, Model, Schema } from 'mongoose';

// export type PasswordRecoveryAttributes = {
//   employee_id: string;
//   email: string;
//   token: string;
//   used: boolean;
//   expire_at: Date;
// };

// const PasswordRecoverySchema = new Schema(
//   {
//     employee_id: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     email: {
//       type: String,
//       lowercase: true,
//       trim: true,
//       required: true,
//     },
//     token: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     used: {
//       type: Boolean,
//       trim: true,
//       default: false,
//       required: true,
//     },
//     expire_at: { type: Date, default: Date.now, expires: 600 },
//   },
//   {
//     timestamps: true,
//   },
// );
// type PasswordRecoveryDoc = Document & PasswordRecoveryAttributes;
// export interface PasswordRecoveryDocument extends PasswordRecoveryDoc {}
// // For model
// export interface PasswordRecoveryModel
//   extends Model<PasswordRecoveryDocument> {}
// export default mongoose.model<PasswordRecoveryDocument>(
//   'PasswordRecovery',
//   PasswordRecoverySchema,
// );

interface IPasswordRecovery extends Document {
  employee_id: string;
  email: string;
  token: string;
  used: boolean;
  expire_at: Date;
}

export class PasswordRecovery extends IModel<IPasswordRecovery> {
  constructor() {
    super();
    const schema = new Schema(
      {
        employee_id: { type: String, required: true, trim: true },
        token: { type: String, required: true, trim: true },
        used: { type: Boolean, trim: true, default: false, required: true },
        expire_at: { type: Date, default: Date.now, expires: 600 },
      },
      { timestamps: true },
    );
    this._model = model<IPasswordRecovery>('PasswordRecovery', schema);
  }
}
