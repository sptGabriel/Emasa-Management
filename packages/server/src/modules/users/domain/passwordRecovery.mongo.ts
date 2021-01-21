import { IModel } from '@shared/core/mongoModel';
import { Document, model, Model, Schema } from 'mongoose';

 const PasswordRecoverySchema = new Schema(
   {
     employee_id: {
       type: String,
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
     expire_at: { type: Date, default: Date.now, expires: 600 },
   },
   {
     timestamps: true,
   },
 );

 export interface IPasswordRecovery {
   employee_id: string;
   token: string;
   used: boolean;
   expire_at: Date;
 };

 type PasswordRecoveryDoc = Document & IPasswordRecovery;
 export interface PasswordRecoveryDocument extends PasswordRecoveryDoc {}
  // For model
 export interface PasswordRecoveryModel
   extends Model<PasswordRecoveryDocument> {}
  //model
 export const PasswordRecovery = model<PasswordRecoveryDocument>(
   'PasswordRecovery',
   PasswordRecoverySchema,
 );

