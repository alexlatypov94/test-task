import mongoose, { Schema, Document } from 'mongoose';
import { validateIsraeliID } from '../utils/israelIdValidator';

interface User extends Document {
  name: string;
  email: string;
  date: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  idNumber: {
    type: Number,
    unique: true,
    required: true,
    validate: {
      validator: validateIsraeliID,
      message: (props: any) =>
        `${props.value} is not a valid Israeli ID number`,
    },
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: null },
  ip: { type: String, default: null },
  country: { type: String, default: null },
  city: { type: String, default: null },
});

const UserModel = mongoose.model<User>('User', UserSchema, 'users');

export default UserModel;
