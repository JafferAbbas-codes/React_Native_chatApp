import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
      },
    ],
    messages: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId, ref: 'Auth',
        },
        text: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true },
);

export interface Chat {
  users: [];
  messages: [];
}
