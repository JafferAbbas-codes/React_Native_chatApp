import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    name: {
      type: String,
      required:true
    },
    avatar: {type:String,default:'https://placeimg.com/140/140/any'},

    isAdmin: {
      type: Boolean,
      default: 'false',
    },
  },
  { timestamps: true },
);

export interface Auth {
  email: string;
  hash: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}