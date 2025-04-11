import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  age?: number;
  mobile?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: false,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      //required: true,
    },
    age: {
      type: Number, 
      required: true
  },
    mobile: {
      type: String,
      required: true,           

    },
    },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', UserSchema);
export {User}
