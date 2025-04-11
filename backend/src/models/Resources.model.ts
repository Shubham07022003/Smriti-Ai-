import mongoose, { Schema, Document, Types } from 'mongoose';
export interface IQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface IResource extends Document {
  type: 'pdf' | 'youtube' | 'article';
  title: string;
  url: string;
  folderId: Types.ObjectId;
  questions?: IQuestion[];
  userId: Types.ObjectId;
  summary?: string;
  mermaid_syntax?: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true }
});

const ResourceSchema: Schema<IResource> = new Schema(
  {
    type: {
      type: String,
      enum: ['pdf', 'youtube'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: 'folder',
      required: true,
    },
    summary:{ String},
    mermaid_syntax: {  // Add new field
      type: String
    },
    questions: [QuestionSchema], // Array of questions
    
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
export {Resource} ;
