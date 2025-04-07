import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFolder extends Document {
  title: string;
  description?: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema: Schema<IFolder> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Folder = mongoose.model<IFolder>('Folder', FolderSchema);
export {Folder};
