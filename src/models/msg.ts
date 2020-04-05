import { model, Schema, Document } from 'mongoose';

const msgSchema = new Schema(
  {
    msg: { type: String, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('msg', msgSchema);

export interface IMsg extends Document {
  msg: string;
  user: string;
}
